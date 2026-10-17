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
    <div className="slider">
      {slides.map((cap, index) => (
        <Link
          key={cap.id}
          className={`slide ${index === active ? "on" : ""}`}
          href={`/caps/${cap.id}`}
          aria-hidden={index !== active}
          tabIndex={index === active ? undefined : -1}
        >
          <Image
            src={cap.images[0]}
            alt={cap.name}
            fill
            sizes="(max-width: 899px) 92vw, 46vw"
            priority={index === 0}
          />
          <span className="cap">
            <b>{cap.name}</b>
            <span>Size {cap.sizes[0]}+</span>
          </span>
        </Link>
      ))}

      <button
        type="button"
        className="slider-toggle"
        onClick={() => setPaused((current) => !current)}
        aria-label={paused ? "Play slideshow" : "Pause slideshow"}
        aria-pressed={paused}
      >
        {paused ? <Play className="ic" aria-hidden="true" /> : <Pause className="ic" aria-hidden="true" />}
      </button>

      <div className="dots" aria-hidden="true">
        {slides.map((cap, index) => (
          <i key={cap.id} className={index === active ? "on" : ""} />
        ))}
      </div>
    </div>
  );
}
