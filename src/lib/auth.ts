import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export interface OwnerUser {
  id: string;
  email: string;
}

/**
 * Re-verifies user server-side using supabase.auth.getUser() (NEVER getSession())
 * and confirms the user matches the configured OWNER_EMAIL.
 */
export async function getOwnerUser(): Promise<OwnerUser | null> {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user || !user.email) {
      return null;
    }

    const ownerEmail = (process.env.OWNER_EMAIL || "").trim().toLowerCase();
    if (!ownerEmail || user.email.trim().toLowerCase() !== ownerEmail) {
      return null;
    }

    return {
      id: user.id,
      email: user.email,
    };
  } catch {
    return null;
  }
}

/**
 * Enforces owner-only access on Server Components, Server Actions, and Route Handlers.
 * Redirects to /admin/login if not authenticated or not owner.
 */
export async function requireOwner(): Promise<OwnerUser> {
  const owner = await getOwnerUser();
  if (!owner) {
    redirect("/admin/login");
  }
  return owner;
}
