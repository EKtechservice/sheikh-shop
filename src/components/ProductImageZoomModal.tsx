"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import {
  X,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Move,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { lockBodyScroll, unlockBodyScroll } from "@/lib/scrollLock";

export interface ProductImageZoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  categoryName?: string;
  frontImage: string;
  backImage?: string;
  initialSide?: "front" | "back";
}

const MIN_ZOOM = 1;
const MAX_ZOOM = 4;
const ZOOM_STEP = 0.5;

export default function ProductImageZoomModal({
  isOpen,
  onClose,
  productName,
  categoryName,
  frontImage,
  backImage,
  initialSide = "front",
}: ProductImageZoomModalProps) {
  const [activeSide, setActiveSide] = useState<"front" | "back">(initialSide);
  const [zoom, setZoom] = useState<number>(1);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const dragStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const panStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const pinchStartDistRef = useRef<number | null>(null);
  const pinchStartZoomRef = useRef<number>(1);

  // Sync initialSide when opened
  useEffect(() => {
    if (isOpen) {
      setActiveSide(initialSide);
      setZoom(1);
      setPan({ x: 0, y: 0 });
      lockBodyScroll();
    } else {
      unlockBodyScroll();
    }
    return () => {
      unlockBodyScroll();
    };
  }, [isOpen, initialSide]);

  // Reset zoom & pan when switching sides (front / back)
  const handleSwitchSide = (side: "front" | "back") => {
    setActiveSide(side);
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  // Close on ESC key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "+" || e.key === "=") {
        handleZoomIn();
      } else if (e.key === "-" || e.key === "_") {
        handleZoomOut();
      } else if (e.key === "0") {
        handleResetZoom();
      } else if (e.key.toLowerCase() === "f" && backImage) {
        setActiveSide((prev) => (prev === "front" ? "back" : "front"));
        setZoom(1);
        setPan({ x: 0, y: 0 });
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, backImage]);

  // Compute maximum allowed pan offsets to keep image within view
  const getMaxPan = useCallback(
    (currentZoom: number) => {
      if (!containerRef.current || currentZoom <= 1) {
        return { maxX: 0, maxY: 0 };
      }
      const rect = containerRef.current.getBoundingClientRect();
      const maxX = ((currentZoom - 1) * rect.width) / 2;
      const maxY = ((currentZoom - 1) * rect.height) / 2;
      return { maxX, maxY };
    },
    []
  );

  const clampPan = useCallback(
    (newX: number, newY: number, currentZoom: number) => {
      const { maxX, maxY } = getMaxPan(currentZoom);
      return {
        x: Math.max(-maxX, Math.min(maxX, newX)),
        y: Math.max(-maxY, Math.min(maxY, newY)),
      };
    },
    [getMaxPan]
  );

  const handleZoomIn = () => {
    setZoom((prev) => {
      const next = Math.min(MAX_ZOOM, Math.round((prev + ZOOM_STEP) * 10) / 10);
      setPan((currentPan) => clampPan(currentPan.x, currentPan.y, next));
      return next;
    });
  };

  const handleZoomOut = () => {
    setZoom((prev) => {
      const next = Math.max(MIN_ZOOM, Math.round((prev - ZOOM_STEP) * 10) / 10);
      if (next === 1) {
        setPan({ x: 0, y: 0 });
      } else {
        setPan((currentPan) => clampPan(currentPan.x, currentPan.y, next));
      }
      return next;
    });
  };

  const handleResetZoom = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  // Double click / Double tap to toggle 1x and 2x
  const handleDoubleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (zoom > 1) {
      handleResetZoom();
    } else {
      const nextZoom = 2;
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const clickX = e.clientX - rect.left - rect.width / 2;
        const clickY = e.clientY - rect.top - rect.height / 2;
        // Shift pan towards clicked point
        const targetX = -clickX * (nextZoom - 1);
        const targetY = -clickY * (nextZoom - 1);
        setZoom(nextZoom);
        setPan(clampPan(targetX, targetY, nextZoom));
      } else {
        setZoom(nextZoom);
      }
    }
  };

  // Mouse wheel zoom
  useEffect(() => {
    const el = containerRef.current;
    if (!el || !isOpen) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const delta = e.deltaY < 0 ? 0.25 : -0.25;
      setZoom((prev) => {
        const next = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, Math.round((prev + delta) * 100) / 100));
        if (next === 1) {
          setPan({ x: 0, y: 0 });
        } else {
          setPan((currentPan) => clampPan(currentPan.x, currentPan.y, next));
        }
        return next;
      });
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, [isOpen, clampPan]);

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom <= 1) return;
    e.preventDefault();
    setIsDragging(true);
    dragStartRef.current = { x: e.clientX, y: e.clientY };
    panStartRef.current = { ...pan };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || zoom <= 1) return;
    e.preventDefault();
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    setPan(clampPan(panStartRef.current.x + dx, panStartRef.current.y + dy, zoom));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch handlers (pan and pinch-to-zoom)
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      // Pinch start
      const t1 = e.touches[0];
      const t2 = e.touches[1];
      pinchStartDistRef.current = Math.hypot(t1.clientX - t2.clientX, t1.clientY - t2.clientY);
      pinchStartZoomRef.current = zoom;
      setIsDragging(false);
    } else if (e.touches.length === 1 && zoom > 1) {
      // Drag start
      setIsDragging(true);
      dragStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      panStartRef.current = { ...pan };
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2 && pinchStartDistRef.current !== null) {
      // Pinch move
      const t1 = e.touches[0];
      const t2 = e.touches[1];
      const currentDist = Math.hypot(t1.clientX - t2.clientX, t1.clientY - t2.clientY);
      const ratio = currentDist / pinchStartDistRef.current;
      const nextZoom = Math.min(
        MAX_ZOOM,
        Math.max(MIN_ZOOM, Math.round(pinchStartZoomRef.current * ratio * 100) / 100)
      );
      setZoom(nextZoom);
      if (nextZoom === 1) {
        setPan({ x: 0, y: 0 });
      } else {
        setPan((currentPan) => clampPan(currentPan.x, currentPan.y, nextZoom));
      }
    } else if (e.touches.length === 1 && isDragging && zoom > 1) {
      // Pan move
      const dx = e.touches[0].clientX - dragStartRef.current.x;
      const dy = e.touches[0].clientY - dragStartRef.current.y;
      setPan(clampPan(panStartRef.current.x + dx, panStartRef.current.y + dy, zoom));
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    pinchStartDistRef.current = null;
  };

  if (!isOpen) return null;

  const currentImage =
    activeSide === "back" && backImage ? backImage : frontImage;
  const zoomPercent = Math.round(zoom * 100);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Zoom view for ${productName}`}
      className="fixed inset-0 z-50 flex flex-col bg-black/95 backdrop-blur-md select-none animate-in fade-in duration-200"
    >
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4 border-b border-white/10 bg-black/40 text-white z-20">
        <div className="flex flex-col">
          {categoryName && (
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-tan">
              {categoryName}
            </span>
          )}
          <h2 className="text-sm sm:text-base font-bold text-white line-clamp-1">
            {productName}
          </h2>
        </div>

        {/* Angle Switcher (Front / Back) in Header */}
        {backImage && (
          <div className="flex items-center bg-white/10 rounded-full p-1 border border-white/15">
            <button
              type="button"
              onClick={() => handleSwitchSide("front")}
              className={`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full transition-all min-h-[36px] cursor-pointer ${
                activeSide === "front"
                  ? "bg-white text-navy shadow-xs"
                  : "text-white/80 hover:text-white"
              }`}
            >
              Front
            </button>
            <button
              type="button"
              onClick={() => handleSwitchSide("back")}
              className={`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full transition-all min-h-[36px] cursor-pointer ${
                activeSide === "back"
                  ? "bg-white text-navy shadow-xs"
                  : "text-white/80 hover:text-white"
              }`}
            >
              Back
            </button>
          </div>
        )}

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close zoom viewer"
          className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full bg-white/10 hover:bg-white/20 active:scale-95 text-white transition-all cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Main Interactive Zoom Canvas */}
      <div
        ref={containerRef}
        onDoubleClick={handleDoubleClick}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className={`relative flex-1 w-full h-full overflow-hidden flex items-center justify-center p-4 sm:p-8 ${
          zoom > 1
            ? isDragging
              ? "cursor-grabbing"
              : "cursor-grab"
            : "cursor-zoom-in"
        }`}
      >
        <div
          style={{
            transform: `translate3d(${pan.x}px, ${pan.y}px, 0) scale(${zoom})`,
            transition: isDragging ? "none" : "transform 0.15s ease-out",
            transformOrigin: "center center",
          }}
          className="relative w-full h-full max-w-[850px] max-h-[850px] flex items-center justify-center pointer-events-none"
        >
          <Image
            key={currentImage}
            src={currentImage}
            alt={`${productName} ${activeSide === "front" ? "Front View" : "Back View"}`}
            fill
            priority
            sizes="100vw"
            className="object-contain"
          />
        </div>

        {/* Dynamic Helpful Instruction Hint */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-black/70 border border-white/15 backdrop-blur-md px-3.5 py-1 text-xs text-white/90 shadow-md">
            {zoom > 1 ? (
              <>
                <Move className="h-3.5 w-3.5 text-tan" />
                <span>Drag to inspect • Double-tap to reset</span>
              </>
            ) : (
              <>
                <ZoomIn className="h-3.5 w-3.5 text-tan" />
                <span>Double-click or pinch to zoom in</span>
              </>
            )}
          </span>
        </div>
      </div>

      {/* Bottom Floating Control Bar */}
      <div className="px-4 py-3 sm:px-6 sm:py-4 bg-black/60 border-t border-white/10 z-20 flex flex-wrap items-center justify-between gap-3">
        {/* Zoom Out & In Buttons */}
        <div className="flex items-center gap-1.5 bg-white/10 border border-white/15 rounded-full p-1 backdrop-blur-md">
          {/* Zoom Out */}
          <button
            type="button"
            onClick={handleZoomOut}
            disabled={zoom <= MIN_ZOOM}
            aria-label="Zoom out product"
            className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full text-white hover:bg-white/15 disabled:opacity-30 disabled:hover:bg-transparent transition-all cursor-pointer"
          >
            <ZoomOut className="h-5 w-5" />
          </button>

          {/* Zoom Level Indicator Badge */}
          <span className="px-3 text-xs sm:text-sm font-extrabold tracking-wider text-white min-w-[60px] text-center">
            {zoomPercent}%
          </span>

          {/* Zoom In */}
          <button
            type="button"
            onClick={handleZoomIn}
            disabled={zoom >= MAX_ZOOM}
            aria-label="Zoom in product"
            className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full text-white hover:bg-white/15 disabled:opacity-30 disabled:hover:bg-transparent transition-all cursor-pointer"
          >
            <ZoomIn className="h-5 w-5" />
          </button>
        </div>

        {/* Zoom Slider for smooth desktop control */}
        <div className="hidden sm:flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-4 py-2">
          <span className="text-[11px] text-white/70 uppercase tracking-wider font-semibold">
            Scale
          </span>
          <input
            type="range"
            min={MIN_ZOOM}
            max={MAX_ZOOM}
            step={0.1}
            value={zoom}
            onChange={(e) => {
              const val = parseFloat(e.target.value);
              setZoom(val);
              if (val === 1) {
                setPan({ x: 0, y: 0 });
              } else {
                setPan((currentPan) => clampPan(currentPan.x, currentPan.y, val));
              }
            }}
            className="w-28 sm:w-36 accent-tan cursor-pointer"
            aria-label="Adjust zoom scale"
          />
        </div>

        {/* Reset & Angle Switchers */}
        <div className="flex items-center gap-2">
          {zoom > 1 && (
            <button
              type="button"
              onClick={handleResetZoom}
              aria-label="Reset zoom to 100%"
              className="inline-flex min-h-[44px] items-center gap-1.5 rounded-full bg-white/15 hover:bg-white/25 border border-white/20 px-4 text-xs font-bold uppercase tracking-wider text-white transition-all cursor-pointer"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Reset 1x</span>
            </button>
          )}

          {backImage && (
            <button
              type="button"
              onClick={() => handleSwitchSide(activeSide === "front" ? "back" : "front")}
              aria-label="Flip front and back view"
              className="inline-flex min-h-[44px] items-center gap-1.5 rounded-full bg-tan/90 hover:bg-tan px-4 text-xs font-bold uppercase tracking-wider text-navy transition-all cursor-pointer"
            >
              <span>Flip to {activeSide === "front" ? "Back" : "Front"}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
