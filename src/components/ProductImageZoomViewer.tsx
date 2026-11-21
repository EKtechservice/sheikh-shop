"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Maximize2,
  Move,
} from "lucide-react";
import ProductImageZoomModal from "@/components/ProductImageZoomModal";

export interface ProductImageZoomViewerProps {
  productName: string;
  categoryName?: string;
  frontImage: string;
  backImage?: string;
  activeSide: "front" | "back";
  onToggleSide?: (side: "front" | "back") => void;
  onSale?: boolean;
  discountPercent?: number | null;
}

const MIN_ZOOM = 1;
const MAX_ZOOM = 3.5;
const ZOOM_STEP = 0.5;

export default function ProductImageZoomViewer({
  productName,
  categoryName,
  frontImage,
  backImage,
  activeSide,
  onToggleSide,
  onSale,
  discountPercent,
}: ProductImageZoomViewerProps) {
  const [zoom, setZoom] = useState<number>(1);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const dragStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const panStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const pinchStartDistRef = useRef<number | null>(null);
  const pinchStartZoomRef = useRef<number>(1);

  const currentDisplayImage =
    activeSide === "back" && backImage ? backImage : frontImage;

  // Reset zoom & pan when image changes (e.g. user toggles Front / Back)
  useEffect(() => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, [activeSide, frontImage, backImage]);

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

  const handleZoomIn = (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    setZoom((prev) => {
      const next = Math.min(MAX_ZOOM, Math.round((prev + ZOOM_STEP) * 10) / 10);
      setPan((currentPan) => clampPan(currentPan.x, currentPan.y, next));
      return next;
    });
  };

  const handleZoomOut = (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
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

  const handleResetZoom = (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
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
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      // Only zoom on wheel if mouse is over image container and ctrl key is held OR if already zoomed in
      if (e.ctrlKey || zoom > 1) {
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
      }
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, [zoom, clampPan]);

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

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      const t1 = e.touches[0];
      const t2 = e.touches[1];
      pinchStartDistRef.current = Math.hypot(t1.clientX - t2.clientX, t1.clientY - t2.clientY);
      pinchStartZoomRef.current = zoom;
      setIsDragging(false);
    } else if (e.touches.length === 1 && zoom > 1) {
      setIsDragging(true);
      dragStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      panStartRef.current = { ...pan };
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2 && pinchStartDistRef.current !== null) {
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
      const dx = e.touches[0].clientX - dragStartRef.current.x;
      const dy = e.touches[0].clientY - dragStartRef.current.y;
      setPan(clampPan(panStartRef.current.x + dx, panStartRef.current.y + dy, zoom));
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    pinchStartDistRef.current = null;
  };

  const zoomPercent = Math.round(zoom * 100);

  return (
    <>
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50 shadow-sm group select-none">
        {/* Sale Badge */}
        {onSale && (
          <span className="absolute top-4 left-4 z-20 rounded bg-[#D32F2F] px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-xs">
            Sale {discountPercent ? `-${discountPercent}%` : ""}
          </span>
        )}

        {/* Front / Back Indicator Badge */}
        {backImage && (
          <div className="absolute top-4 right-4 z-20">
            <button
              type="button"
              onClick={() => onToggleSide?.(activeSide === "front" ? "back" : "front")}
              title="Click to toggle angle"
              className="inline-flex min-h-[36px] items-center gap-1.5 rounded-full bg-navy/90 hover:bg-navy backdrop-blur-xs px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-xs transition-all cursor-pointer"
            >
              <span
                className={`h-2 w-2 rounded-full ${
                  activeSide === "front" ? "bg-[#B98B63]" : "bg-sky-400"
                }`}
              />
              <span>{activeSide === "front" ? "Front View" : "Back View"}</span>
            </button>
          </div>
        )}

        {/* Pan / Zoom Gesture Hint (when zoomed in) */}
        {zoom > 1 && (
          <div className="absolute top-14 left-1/2 -translate-x-1/2 z-20 pointer-events-none animate-in fade-in duration-200">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-black/75 px-3 py-1 text-[11px] font-semibold text-white/95 shadow-md">
              <Move className="h-3 w-3 text-tan" />
              <span>Drag to pan fabric • Double-tap to reset</span>
            </span>
          </div>
        )}

        {/* Main Image Canvas */}
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
          className={`relative w-full h-full flex items-center justify-center p-6 sm:p-8 ${
            zoom > 1
              ? isDragging
                ? "cursor-grabbing"
                : "cursor-grab"
              : "cursor-zoom-in"
          }`}
          title={zoom > 1 ? "Drag to pan or double-click to reset" : "Double-click to zoom in"}
        >
          <div
            style={{
              transform: `translate3d(${pan.x}px, ${pan.y}px, 0) scale(${zoom})`,
              transition: isDragging ? "none" : "transform 0.15s ease-out",
              transformOrigin: "center center",
            }}
            className="relative w-full h-full flex items-center justify-center pointer-events-none"
          >
            <Image
              key={currentDisplayImage}
              src={currentDisplayImage}
              alt={`${productName} ${activeSide === "front" ? "Front View" : "Back View"}`}
              fill
              priority
              sizes="(min-width: 1024px) 500px, 92vw"
              className="object-contain p-2 sm:p-4"
            />
          </div>
        </div>

        {/* Interactive Floating Zoom Controls Bar */}
        <div className="absolute bottom-3 right-3 left-3 sm:left-auto z-20 flex items-center justify-between sm:justify-end gap-2">
          {/* Zoom Buttons Cluster */}
          <div className="flex items-center bg-white/95 backdrop-blur-md border border-zinc-200/90 rounded-full p-1 shadow-md">
            {/* Zoom Out Button */}
            <button
              type="button"
              onClick={handleZoomOut}
              disabled={zoom <= MIN_ZOOM}
              aria-label="Zoom out"
              title="Zoom out"
              className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full text-zinc-700 hover:text-navy hover:bg-zinc-100 disabled:opacity-30 disabled:hover:bg-transparent transition-all cursor-pointer"
            >
              <ZoomOut className="h-4 w-4" />
            </button>

            {/* Percentage Badge */}
            <span className="px-2 text-xs font-bold text-navy min-w-[48px] text-center select-none">
              {zoomPercent}%
            </span>

            {/* Zoom In Button */}
            <button
              type="button"
              onClick={handleZoomIn}
              disabled={zoom >= MAX_ZOOM}
              aria-label="Zoom in"
              title="Zoom in"
              className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full text-zinc-700 hover:text-navy hover:bg-zinc-100 disabled:opacity-30 disabled:hover:bg-transparent transition-all cursor-pointer"
            >
              <ZoomIn className="h-4 w-4" />
            </button>

            {/* Reset Zoom Button (when zoomed in) */}
            {zoom > 1 && (
              <button
                type="button"
                onClick={handleResetZoom}
                aria-label="Reset zoom"
                title="Reset zoom to 100%"
                className="inline-flex min-h-[44px] items-center gap-1 rounded-full bg-zinc-100 hover:bg-zinc-200 px-2.5 text-[11px] font-bold text-zinc-700 transition-all cursor-pointer ml-0.5"
              >
                <RotateCcw className="h-3 w-3" />
                <span>1x</span>
              </button>
            )}
          </div>

          {/* Fullscreen / Inspect Lightbox Button */}
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            aria-label="Open fullscreen zoom inspector"
            title="Inspect in fullscreen"
            className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full bg-white/95 hover:bg-white text-navy border border-zinc-200/90 shadow-md transition-all active:scale-95 cursor-pointer"
          >
            <Maximize2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Fullscreen Modal Lightbox */}
      <ProductImageZoomModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        productName={productName}
        categoryName={categoryName}
        frontImage={frontImage}
        backImage={backImage}
        initialSide={activeSide}
      />
    </>
  );
}
