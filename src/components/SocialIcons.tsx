import React from "react";

export function InstagramIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" strokeWidth="2.5" />
    </svg>
  );
}

export function FacebookIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

export function TikTokIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-2.887 2.887 2.896 2.896 0 0 1-2.887-2.887 2.896 2.896 0 0 1 2.887-2.887c.287 0 .56.046.816.126V9.45a6.34 6.34 0 0 0-.816-.053 6.341 6.341 0 0 0-6.341 6.341 6.341 6.341 0 0 0 6.341 6.341 6.341 6.341 0 0 0 6.341-6.341V8.891a8.163 8.163 0 0 0 4.756 1.517V6.963a4.814 4.814 0 0 1-.995-.277z" />
    </svg>
  );
}

export interface SocialLinksProps {
  className?: string;
  iconClassName?: string;
  buttonClassName?: string;
}

export const SOCIAL_LINKS = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/sheikh_trading_enterprise?mdxt=anZ1OWllcm1meGI3&utm_source=qr",
    ariaLabel: "Follow Sheikh's Shop on Instagram",
    icon: InstagramIcon,
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com",
    ariaLabel: "Follow Sheikh's Shop on Facebook",
    icon: FacebookIcon,
  },
  {
    name: "TikTok",
    href: "https://www.tiktok.com",
    ariaLabel: "Follow Sheikh's Shop on TikTok",
    icon: TikTokIcon,
  },
] as const;

export default function SocialLinks({
  className = "flex items-center gap-3",
  iconClassName = "h-5 w-5",
  buttonClassName = "flex h-11 w-11 min-h-[44px] min-w-[44px] items-center justify-center rounded-full bg-white/5 text-zinc-300 transition-all duration-200 hover:bg-white/15 hover:text-white hover:scale-105 focus-visible:ring-2 focus-visible:ring-white/70 focus:outline-none",
}: SocialLinksProps) {
  return (
    <div className={className} role="list" aria-label="Social media channels">
      {SOCIAL_LINKS.map((item) => {
        const IconComponent = item.icon;
        return (
          <a
            key={item.name}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={item.ariaLabel}
            className={buttonClassName}
          >
            <IconComponent className={iconClassName} />
          </a>
        );
      })}
    </div>
  );
}
