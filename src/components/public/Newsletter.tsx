"use client";

import React, { useState } from "react";
import { Loader2, CheckCircle2 } from "lucide-react";
import { useInView } from "@/lib/useInView";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const { ref, isInView } = useInView<HTMLDivElement>({
    threshold: 0.15,
    triggerOnce: true,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      setError("Please enter your email address.");
      return;
    }

    if (!EMAIL_REGEX.test(trimmedEmail)) {
      setError("Please enter a valid email address (e.g. name@example.com).");
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: trimmedEmail }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(
          data.message || "Failed to subscribe. Please try again later."
        );
        return;
      }

      setIsSuccess(true);
      setEmail("");
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      aria-label="Newsletter sign-up"
      className="w-full bg-navy py-12 text-white md:py-16"
    >
      <div
        ref={ref}
        className={`mx-auto max-w-content px-4 sm:px-6 lg:px-8 transition-all duration-700 ease-out ${
          isInView
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-8 motion-reduce:opacity-100 motion-reduce:translate-y-0"
        }`}
      >
        {/* Heading */}
        <h2 className="text-center font-sans text-[26px] sm:text-[32px] font-extrabold uppercase tracking-tight text-white">
          Join the List
        </h2>

        {/* Sub-text */}
        <p className="mx-auto mt-3 max-w-xl text-center text-[16px] sm:text-[18px] font-medium leading-relaxed text-white/90">
          Subscribe for 10% off your first order and early access to new
          arrivals, sales, and style tips.
        </p>

        {/* Success State */}
        {isSuccess ? (
          <div
            role="status"
            className="mx-auto mt-8 flex max-w-md items-center justify-center gap-3 rounded-xl bg-white/10 px-6 py-4 text-center backdrop-blur-xs animate-pop-check"
          >
            <CheckCircle2
              className="h-6 w-6 shrink-0 text-emerald-400"
              aria-hidden="true"
            />
            <p className="text-base font-semibold text-white">
              You&apos;re in! Check your inbox for your 10% code.
            </p>
          </div>
        ) : (
          /* Subscription Form */
          <form
            onSubmit={handleSubmit}
            aria-label="Newsletter subscription"
            noValidate
            className="mx-auto mt-8 max-w-2xl"
          >
            <div className="flex flex-col gap-3 sm:gap-4 sm:flex-row">
              <div className="relative flex-1">
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  inputMode="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError(null);
                  }}
                  placeholder="Enter your email address"
                  autoComplete="email"
                  aria-invalid={Boolean(error)}
                  aria-describedby={error ? "newsletter-error" : undefined}
                  className="w-full min-h-[48px] rounded-xl bg-white px-4 py-3 text-base sm:text-sm text-neutral-900 placeholder:text-neutral-500 shadow-xs transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/80 focus:shadow-md"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex min-h-[48px] items-center justify-center rounded-xl bg-navy-dark px-8 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-xs transition-all duration-300 hover:bg-[#141F38]/90 hover:brightness-110 hover:-translate-y-0.5 hover:shadow-lg active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-75 focus-visible:ring-2 focus-visible:ring-white/70 focus:outline-none cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <Loader2
                      className="mr-2 h-4 w-4 animate-spin"
                      aria-hidden="true"
                    />
                    <span>Subscribing...</span>
                  </>
                ) : (
                  "Subscribe"
                )}
              </button>
            </div>

            {/* Inline Error Message */}
            {error && (
              <p
                id="newsletter-error"
                role="alert"
                aria-live="assertive"
                className="mt-2.5 text-center text-sm font-medium text-red-300 animate-pop-check"
              >
                {error}
              </p>
            )}
          </form>
        )}
      </div>
    </section>
  );
}
