import { NextResponse } from "next/server";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { success: false, message: "Email is required." },
        { status: 400 }
      );
    }

    const trimmedEmail = email.trim().toLowerCase();

    if (!EMAIL_REGEX.test(trimmedEmail)) {
      return NextResponse.json(
        { success: false, message: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    // Dispatches subscriber registration event (e.g., Supabase / Webhook / Mailchimp)
    console.log(`[Newsletter Subscription] New subscriber: ${trimmedEmail}`);

    return NextResponse.json(
      {
        success: true,
        message: "You're in! Check your inbox for your 10% code.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[Newsletter Subscription Error]:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An unexpected error occurred. Please try again later.",
      },
      { status: 500 }
    );
  }
}
