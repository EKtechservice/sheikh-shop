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

export function WhatsAppIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
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
    href: "https://web.facebook.com/SheikhTradingEnterprise",
    ariaLabel: "Follow Sheikh's Shop on Facebook",
    icon: FacebookIcon,
  },
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@sheikh_tradingenterprise?lang=en-GB",
    ariaLabel: "Follow Sheikh's Shop on TikTok",
    icon: TikTokIcon,
  },
  {
    name: "WhatsApp",
    href: "https://wa.me/message/PSFB74E34YBZJ1",
    ariaLabel: "Chat with Sheikh's Shop on WhatsApp",
    icon: WhatsAppIcon,
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
