"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ChevronLeft, Package, Ruler, Truck } from "lucide-react";
import { CapCard } from "./cap-card";
import { SectionHead } from "./section-head";
import { WhatsAppIcon } from "./whatsapp-icon";
import { CATEGORIES } from "@/lib/site";
import { orderLink } from "@/lib/whatsapp";
import type { Cap } from "@/lib/types";

interface CapDetailProps {
  cap: Cap;
  more: Cap[];
}

export function CapDetail({ cap, more }: CapDetailProps) {
  const [selectedSize, setSelectedSize] = useState(cap.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(cap.colors[0]);

  return (
    <div className="page pbar">
      <Link className="back" href="/caps">
        <ChevronLeft className="ic" aria-hidden="true" /> All caps
      </Link>

      <div className="dgrid">
        <div className="big">
          <Image
            src={cap.images[0]}
            alt={cap.name}
            fill
            sizes="(max-width: 899px) 100vw, 50vw"
            priority
          />
        </div>

        <div className="dinfo">
          <span className="chip on">{CATEGORIES[cap.category].label}</span>
          <h1>{cap.name}</h1>
          <p className="d">{cap.description}</p>
          <p className="price-note">
            Price on request —{" "}
            <a href={orderLink(cap, selectedSize, selectedColor)} target="_blank" rel="noopener noreferrer">
              ask on WhatsApp
            </a>
          </p>

          <div className="blk">
            <h2 className="blk-title">Choose size</h2>
            <div className="sizes" role="group" aria-label="Choose a size">
              {cap.sizes.map((size) => (
                <button
                  type="button"
                  className="chip"
                  key={size}
                  aria-pressed={selectedSize === size}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
            <p className="blk-hint">
              <Link href="/sizes">Not sure of your size?</Link>
            </p>
          </div>

          <div className="blk">
            <h2 className="blk-title">Choose colour</h2>
            <div className="sizes" role="group" aria-label="Choose a colour">
              {cap.colors.map((color) => (
                <button
                  type="button"
                  className="chip"
                  key={color}
                  aria-pressed={selectedColor === color}
                  onClick={() => setSelectedColor(color)}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          <div className="blk">
            <div className="facts">
              <div className="fact">
                <Truck className="ic" aria-hidden="true" /> Delivery within Ilorin
              </div>
              <div className="fact">
                <Ruler className="ic" aria-hidden="true" /> Custom sizes available
              </div>
              <div className="fact">
                <Package className="ic" aria-hidden="true" /> Bulk orders welcome
              </div>
            </div>
          </div>

          <div className="obar">
            <div className="t">
              <span>Size · colour</span>
              <b>
                {selectedSize} · {selectedColor}
              </b>
            </div>
            <a
              className="btn wa"
              href={orderLink(cap, selectedSize, selectedColor)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon className="ic wa" /> Order on WhatsApp
            </a>
          </div>
        </div>
      </div>

      {more.length > 0 ? (
        <section className="sec">
          <SectionHead title="More caps" href="/caps" linkLabel="See all" />
          <div className="hscroll">
            {more.map((other) => (
              <CapCard cap={other} className="hcard" key={other.id} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
