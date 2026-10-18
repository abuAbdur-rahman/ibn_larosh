"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ChevronLeft, Package, Ruler, Truck } from "lucide-react";
import { CapCard } from "./cap-card";
import { ButtonAnchor } from "./ui-kit/button";
import { HScroll, hCardClass } from "./ui-kit/catalog";
import { Chip, ChipTag } from "./ui-kit/chip";
import { Page, Section } from "./ui-kit/layout";
import { SectionHead } from "./section-head";
import { WhatsAppIcon } from "./whatsapp-icon";
import { CATEGORIES } from "@/lib/site";
import { orderLink } from "@/lib/whatsapp";
import type { Cap } from "@/lib/types";

interface CapDetailProps {
  cap: Cap;
  more: Cap[];
}

const FACT = "flex items-center gap-2.5 text-sm [&_.ic]:text-gold";
const BLOCK_TITLE =
  "mb-2.5 font-sans text-xs font-bold uppercase tracking-[0.14em] text-mut";
const ORDER_BAR =
  "fixed inset-x-0 bottom-[calc(var(--tab)+var(--safe))] z-[55] flex items-center gap-3.5 border-t border-line bg-paper px-4 py-3 min-[900px]:static min-[900px]:border-0 min-[900px]:bg-transparent min-[900px]:px-0 min-[900px]:pt-5 min-[900px]:pb-0";

export function CapDetail({ cap, more }: CapDetailProps) {
  const [selectedSize, setSelectedSize] = useState(cap.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(cap.colors[0]);

  return (
    <Page className="pb-[104px] min-[900px]:pb-0">
      <Link
        href="/caps"
        className="inline-flex items-center gap-1 pt-3.5 pb-2.5 text-sm font-semibold text-g7"
      >
        <ChevronLeft className="ic" aria-hidden="true" /> All caps
      </Link>

      <div className="grid gap-7 min-[900px]:grid-cols-2 min-[900px]:items-start min-[900px]:gap-12">
        <div className="relative aspect-square overflow-hidden rounded-[22px] border border-line bg-[#efe4bd] shadow-[0_8px_24px_rgba(10,59,34,0.10)]">
          <Image
            src={cap.images[0]}
            alt={cap.name}
            fill
            sizes="(max-width: 899px) 100vw, 50vw"
            priority
            className="object-cover"
          />
        </div>

        <div>
          <ChipTag selected>{CATEGORIES[cap.category].label}</ChipTag>
          <h1 className="mt-3 mb-2.5 text-[clamp(30px,4vw,38px)] text-g9">{cap.name}</h1>
          <p className="max-w-[55ch] text-[15.5px] text-mut">{cap.description}</p>
          <p className="mt-1.5 text-sm text-mut">
            Price on request —{" "}
            <a
              href={orderLink(cap, selectedSize, selectedColor)}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-g7 underline underline-offset-[3px]"
            >
              ask on WhatsApp
            </a>
          </p>

          <div className="mt-7">
            <h2 className={BLOCK_TITLE}>Choose size</h2>
            <div className="flex flex-wrap gap-2.5" role="group" aria-label="Choose a size">
              {cap.sizes.map((size) => (
                <Chip
                  key={size}
                  selected={selectedSize === size}
                  aria-pressed={selectedSize === size}
                  onClick={() => setSelectedSize(size)}
                  className="min-w-[58px] justify-center text-[15px]"
                >
                  {size}
                </Chip>
              ))}
            </div>
            <p className="mt-2.5 text-[12.5px]">
              <Link href="/sizes" className="font-semibold text-g7">
                Not sure of your size?
              </Link>
            </p>
          </div>

          <div className="mt-7">
            <h2 className={BLOCK_TITLE}>Choose colour</h2>
            <div className="flex flex-wrap gap-2.5" role="group" aria-label="Choose a colour">
              {cap.colors.map((color) => (
                <Chip
                  key={color}
                  selected={selectedColor === color}
                  aria-pressed={selectedColor === color}
                  onClick={() => setSelectedColor(color)}
                >
                  {color}
                </Chip>
              ))}
            </div>
          </div>

          <div className="mt-7 grid gap-3">
            <div className={FACT}>
              <Truck className="ic" aria-hidden="true" /> Delivery within Ilorin
            </div>
            <div className={FACT}>
              <Ruler className="ic" aria-hidden="true" /> Custom sizes available
            </div>
            <div className={FACT}>
              <Package className="ic" aria-hidden="true" /> Bulk orders welcome
            </div>
          </div>

          <div className={ORDER_BAR}>
            <div className="flex flex-col text-xs leading-tight text-mut">
              <span>Size · colour</span>
              <b className="text-[17px] text-g9">
                {selectedSize} · {selectedColor}
              </b>
            </div>
            <ButtonAnchor
              variant="wa"
              className="flex-1"
              href={orderLink(cap, selectedSize, selectedColor)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon className="ic wa" /> Order on WhatsApp
            </ButtonAnchor>
          </div>
        </div>
      </div>

      {more.length > 0 ? (
        <Section>
          <SectionHead title="More caps" href="/caps" linkLabel="See all" />
          <HScroll label="More caps">
            {more.map((other) => (
              <CapCard cap={other} className={hCardClass} key={other.id} />
            ))}
          </HScroll>
        </Section>
      ) : null}
    </Page>
  );
}
