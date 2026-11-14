"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Search, User, ShoppingCart, Menu, X } from "lucide-react";
import { useCart } from "@/components/CartProvider";
import Logo from "@/components/Logo";
import SearchModal from "@/components/SearchModal";
import { lockBodyScroll, unlockBodyScroll } from "@/lib/scrollLock";

interface NavLinkItem {
  readonly name: string;
  readonly href: string;
}

const NAV_LINKS: readonly NavLinkItem[] = [
  { name: "New Arrivals'", href: "/new-arrivals" },
  { name: "Categories", href: "/categories" },
  { name: "Preorder", href: "/preorder" },
  { name: "Sale", href: "/sale" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
] as const;

interface HeaderProps {
  cartCount?: number;
}

export default function Header({ cartCount: explicitCartCount }: HeaderProps) {
  let contextCount: number | undefined;
  try {
    const cart = useCart();
    contextCount = cart.cartCount;
  } catch {
    // Fallback if tested outside CartProvider
  }
  const cartCount = explicitCartCount ?? contextCount ?? 1;

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isBadgeBouncing, setIsBadgeBouncing] = useState(false);
  const prevCountRef = useRef(cartCount);

  // Animate cart badge on count change
  useEffect(() => {
    if (prevCountRef.current !== cartCount) {
      prevCountRef.current = cartCount;
      setIsBadgeBouncing(true);
      const timer = setTimeout(() => setIsBadgeBouncing(false), 500);
      return () => clearTimeout(timer);
    }
  }, [cartCount]);

  // Lock body scroll and handle Android back button when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      lockBodyScroll();

      window.history.pushState({ drawer: "menu" }, "");
      const handlePopState = () => {
        setIsMobileMenuOpen(false);
      };
      window.addEventListener("popstate", handlePopState);

      return () => {
        unlockBodyScroll();
        window.removeEventListener("popstate", handlePopState);
      };
    }
  }, [isMobileMenuOpen]);

  // Handle Escape key to close open overlays
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMobileMenuOpen(false);
        setIsSearchOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-brand-black text-white pt-safe pl-safe pr-safe">
      {/* Accessible Skip to Content Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-md focus:bg-white focus:px-4 focus:py-2.5 focus:text-xs focus:font-bold focus:uppercase focus:tracking-wide focus:text-navy focus:shadow-xl focus:ring-2 focus:ring-navy focus:outline-none"
      >
        Skip to main content
      </a>

      {/* Main Bar: 72px */}
      <div className="mx-auto flex h-[72px] max-w-content items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* LEFT: Logo Lockup */}
        <Logo />

        {/* CENTER: Desktop Navigation */}
        <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-7 xl:gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="group relative py-1 text-[14px] font-medium text-white transition-colors duration-200 hover:text-white/80 rounded-xs focus-visible:ring-2 focus-visible:ring-white/70 focus:outline-none"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-white transition-all duration-200 ease-out group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* RIGHT: Actions & Icons with >= 44x44px Touch Targets */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Search Button (Triggers Live Search Modal) */}
          <button
            type="button"
            onClick={() => setIsSearchOpen(true)}
            aria-label="Search menswear collection"
            className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full text-white transition-colors duration-200 hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white/70 focus:outline-none"
          >
            <Search className="h-5 w-5" aria-hidden="true" />
          </button>

          {/* User Account Icon Link */}
          <Link
            href="/account"
            aria-label="My Account"
            className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full text-white transition-colors duration-200 hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white/70 focus:outline-none"
          >
            <User className="h-5 w-5" aria-hidden="true" />
          </Link>

          {/* Shopping Cart Link with Counter Badge */}
          <Link
            href="/cart"
            aria-label={`Shopping cart containing ${cartCount} item${cartCount === 1 ? "" : "s"}`}
            className="relative flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full text-white transition-colors duration-200 hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white/70 focus:outline-none"
          >
            <ShoppingCart className="h-5 w-5" aria-hidden="true" />
            {cartCount > 0 && (
              <span
                aria-hidden="true"
                className={`absolute top-1 right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-white px-1 text-[10px] font-bold text-brand-black shadow-xs transition-transform duration-300 ${
                  isBadgeBouncing ? "scale-125 animate-pop-check" : "scale-100"
                }`}
              >
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </Link>

          {/* Mobile Hamburger Menu Toggle */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open navigation menu"
            className="flex lg:hidden min-h-[44px] min-w-[44px] items-center justify-center rounded-full text-white transition-colors duration-200 hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white/70 focus:outline-none"
          >
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {isMobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation drawer"
          className="fixed inset-0 z-50 lg:hidden flex"
        >
          {/* Backdrop */}
          <div
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-200"
            aria-hidden="true"
          />

          {/* Drawer Content with Safe-Area Padding */}
          <div className="relative ml-auto flex h-screen max-h-[100dvh] w-[290px] max-w-[85vw] flex-col bg-brand-black p-6 text-white shadow-2xl transition-transform duration-300 pt-safe pb-safe pl-safe pr-safe overscroll-contain">
            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-5 border-b border-white/10">
              <span className="text-xs uppercase tracking-widest text-zinc-400 font-semibold">
                Menu
              </span>
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close menu"
                className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full text-white hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white/70 focus:outline-none"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            {/* Mobile Navigation Links */}
            <nav className="flex flex-col gap-1 py-4 overflow-y-auto">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex min-h-[44px] items-center text-base font-semibold text-white/90 hover:text-white transition-colors px-2 rounded-lg hover:bg-white/5"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Drawer Footer Links */}
            <div className="mt-auto border-t border-white/10 pt-4 flex flex-col gap-1">
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsSearchOpen(true);
                }}
                className="flex min-h-[44px] items-center gap-3 text-sm text-zinc-300 hover:text-white transition-colors px-2 rounded-lg hover:bg-white/5 text-left"
              >
                <Search className="h-4 w-4" aria-hidden="true" />
                <span>Search Products</span>
              </button>
              <Link
                href="/account"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex min-h-[44px] items-center gap-3 text-sm text-zinc-300 hover:text-white transition-colors px-2 rounded-lg hover:bg-white/5"
              >
                <User className="h-4 w-4" aria-hidden="true" />
                <span>My Account</span>
              </Link>
              <Link
                href="/cart"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex min-h-[44px] items-center gap-3 text-sm text-zinc-300 hover:text-white transition-colors px-2 rounded-lg hover:bg-white/5"
              >
                <ShoppingCart className="h-4 w-4" aria-hidden="true" />
                <span>Cart ({cartCount})</span>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Live Interactive Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </header>
  );
}
