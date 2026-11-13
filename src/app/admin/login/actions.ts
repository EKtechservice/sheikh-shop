"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().trim().email("Please enter a valid email address."),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

// In-memory rate limiting against brute-force attacks (keyed by email / client attempt)
const attemptTracker = new Map<string, { count: number; lockedUntil: number }>();

export interface LoginActionResult {
  success?: boolean;
  error?: string;
}

export async function loginAction(
  prevState: LoginActionResult | null,
  formData: FormData
): Promise<LoginActionResult> {
  const emailInput = formData.get("email");
  const passwordInput = formData.get("password");

  const parseResult = loginSchema.safeParse({
    email: emailInput,
    password: passwordInput,
  });

  if (!parseResult.success) {
    return {
      error: parseResult.error.issues[0]?.message || "Invalid input.",
    };
  }

  const { email, password } = parseResult.data;
  const ownerEmail = (process.env.OWNER_EMAIL || "").trim().toLowerCase();

  // Rate-limiting check using performance timer to avoid Next.js prerender date warnings
  const now = Math.floor(performance.now());
  const trackingKey = email.toLowerCase();
  const record = attemptTracker.get(trackingKey) || { count: 0, lockedUntil: 0 };

  if (record.lockedUntil > now) {
    const secondsLeft = Math.ceil((record.lockedUntil - now) / 1000);
    return {
      error: `Too many failed attempts. Please wait ${secondsLeft} seconds before trying again.`,
    };
  }

  // Pre-check: only the owner account is allowed to log into the admin portal
  if (!ownerEmail || email.toLowerCase() !== ownerEmail) {
    record.count += 1;
    if (record.count >= 5) {
      record.lockedUntil = now + 15 * 60 * 1000; // 15-minute lockout
    }
    attemptTracker.set(trackingKey, record);
    return {
      error: "Access denied. Only the store owner account can access the admin dashboard.",
    };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error || !data.user) {
    record.count += 1;
    if (record.count >= 5) {
      record.lockedUntil = now + 15 * 60 * 1000; // 15-minute lockout
    }
    attemptTracker.set(trackingKey, record);
    return {
      error: error?.message || "Invalid email or password.",
    };
  }

  // Clear failed attempt record on successful login
  attemptTracker.delete(trackingKey);

  redirect("/admin");
}
