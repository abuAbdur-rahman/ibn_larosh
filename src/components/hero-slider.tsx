"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Pause, Play } from "lucide-react";
import type { Cap } from "@/lib/types";

interface HeroSliderProps {
  slides: Cap[];
}

/**
 * Auto-cycling hero gallery (3.8s). Stays static for reduced-motion users and
 * exposes a pause control, per WCAG 2.2.2 (moving content > 5s).
 */
export function HeroSlider({ slides }: HeroSliderProps) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (slides.length < 2 || paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % slides.length);
    }, 3800);

    return () => window.clearInterval(timer);
  }, [slides.length, paused]);

  if (slides.length === 0) return null;

  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-[22px] border border-gold-l/45 bg-[#0d2a1b] shadow-[0_14px_34px_rgba(0,0,0,0.35)]">
      {slides.map((cap, index) => (
        <Link
          key={cap.id}
          href={`/caps/${cap.id}`}
          aria-hidden={index !== active}
          tabIndex={index === active ? undefined : -1}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === active ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={cap.images[0]}
            alt={cap.name}
            fill
            sizes="(max-width: 899px) 92vw, 46vw"
            priority={index === 0}
            className="object-cover"
          />
          <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 bg-[linear-gradient(transparent,rgba(0,0,0,0.7))] px-3.5 pt-7.5 pb-3">
            <b className="min-w-0 truncate font-heading text-base font-semibold">{cap.name}</b>
            <span className="flex-none text-xs opacity-85">Size {cap.sizes[0]}+</span>
          </span>
        </Link>
      ))}

      <button
        type="button"
        onClick={() => setPaused((current) => !current)}
        aria-label={paused ? "Play slideshow" : "Pause slideshow"}
        aria-pressed={paused}
        className="absolute top-2.5 left-2.5 z-[2] grid size-11 place-items-center rounded-full bg-g9/62 text-white transition-colors hover:bg-g9/85"
      >
        {paused ? (
          <Play className="ic" aria-hidden="true" />
        ) : (
          <Pause className="ic" aria-hidden="true" />
        )}
      </button>

      <div className="absolute top-3 right-3 flex gap-1.5" aria-hidden="true">
        {slides.map((cap, index) => (
          <i
            key={cap.id}
            className={`h-[7px] rounded-full transition-all duration-300 ${
              index === active ? "w-5 bg-gold-l" : "w-[7px] bg-white/45"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
