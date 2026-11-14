"use client";

/**
 * Universal Mobile Body Scroll Lock Helper
 * 
 * Accurately prevents background momentum scrolling on iOS Safari,
 * Chrome Mobile, Samsung Internet, and in-app webviews (Instagram, WhatsApp)
 * while preserving the user's exact scroll position when modals/drawers open and close.
 */

let lockCount = 0;
let previousScrollY = 0;

export function lockBodyScroll(): void {
  if (typeof document === "undefined") return;

  lockCount++;
  if (lockCount === 1) {
    previousScrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;
    const body = document.body;
    body.style.position = "fixed";
    body.style.top = `-${previousScrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";
    body.style.overflow = "hidden";
  }
}

export function unlockBodyScroll(): void {
  if (typeof document === "undefined") return;

  lockCount = Math.max(0, lockCount - 1);
  if (lockCount === 0) {
    const body = document.body;
    body.style.position = "";
    body.style.top = "";
    body.style.left = "";
    body.style.right = "";
    body.style.width = "";
    body.style.overflow = "";
    window.scrollTo(0, previousScrollY);
  }
}
