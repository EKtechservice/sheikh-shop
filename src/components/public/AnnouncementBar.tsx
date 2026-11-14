"use client";

import React from "react";
import Link from "next/link";

export default function AnnouncementBar() {
  const announcements = [
    {
      id: "pickup",
      content: (
        <span className="inline-flex items-center gap-2">
          <span className="font-semibold text-white">Free Store Pickup Available</span>
          <span className="text-white/40 font-normal">|</span>
          <span className="text-white/90 font-medium">Order Online, Pick Up Today</span>
        </span>
      ),
      href: "/preorder",
    },
    {
      id: "nationwide",
      content: (
        <span className="inline-flex items-center gap-2">
          <span className="font-semibold text-white">Nationwide Delivery Available Across Ghana</span>
          <span className="text-white/40 font-normal">•</span>
          <span className="text-white/90 font-medium">Fast &amp; Reliable Shipping</span>
        </span>
      ),
      href: "/preorder",
    },
    {
      id: "gadgets",
      content: (
        <span className="inline-flex items-center gap-2">
          <span className="font-bold tracking-wider uppercase text-white">
            Preorder Your Electronic Gadgets Now
          </span>
          <span className="text-white/80 font-bold" aria-hidden="true">&rarr;</span>
          <span className="font-semibold uppercase text-white/95">
            Phones, Laptops &amp; More
          </span>
          <span className="text-white/40 font-normal">•</span>
          <span className="rounded-full bg-white/20 px-2 py-0.5 text-[11px] font-bold text-white tracking-wide">
            24-48HR DELIVERY
          </span>
        </span>
      ),
      href: "/preorder",
    },
  ];

  return (
    <aside
      aria-label="Store announcements ticker"
      suppressHydrationWarning
      className="relative w-full bg-[#1B2A4A] text-white overflow-hidden py-2.5 sm:py-3 border-b border-white/10 select-none"
    >
      <div className="flex w-full overflow-hidden">
        {/* Infinite Leftward Marquee (2 identical sets moving seamless 0% -> -50%) */}
        <div className="flex shrink-0 items-center whitespace-nowrap animate-marquee">
          {[1, 2].map((setNum) => (
            <div
              key={setNum}
              className="flex items-center gap-10 sm:gap-14 pr-10 sm:pr-14 shrink-0"
            >
              {announcements.map((item) => (
                <React.Fragment key={`${setNum}-${item.id}`}>
                  <Link
                    href={item.href}
                    className="inline-flex items-center text-[12px] sm:text-[13px] md:text-[14px] text-white transition-opacity duration-200 hover:opacity-80 focus-visible:ring-2 focus-visible:ring-white/70 focus:outline-none"
                  >
                    {item.content}
                  </Link>

                  {/* Bullet Divider */}
                  <span
                    className="text-white/40 select-none text-[12px]"
                    aria-hidden="true"
                  >
                    •
                  </span>
                </React.Fragment>
              ))}
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
