"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search, SearchX } from "lucide-react";
import { CapCard } from "./cap-card";
import { Button, ButtonAnchor } from "./ui-kit/button";
import { CapGrid } from "./ui-kit/catalog";
import { Chip } from "./ui-kit/chip";
import { Page, PageTitle, Section } from "./ui-kit/layout";
import { WhatsAppIcon } from "./whatsapp-icon";
import { CATEGORIES } from "@/lib/site";
import { wa } from "@/lib/whatsapp";
import type { Cap, CategoryKey } from "@/lib/types";

const PAGE_SIZE = 24;

type CategoryFilter = CategoryKey | "all";
type SizeFilter = number | "all";
type SortKey = "new" | "size";

interface CatalogBrowserProps {
  caps: Cap[];
}

interface CatalogViewProps extends CatalogBrowserProps {
  initialCategory: CategoryFilter;
}

const ASK_LINK = wa(
  "Assalamu alaikum, I can't find a cap in the size/design I want on the site."
);

const inCategory = (cap: Cap, category: CategoryFilter) =>
  category === "all" || cap.category === category;

const hasSize = (cap: Cap, size: SizeFilter) =>
  size === "all" || cap.sizes.includes(size);

const matchesQuery = (cap: Cap, needle: string) =>
  !needle ||
  `${cap.name} ${cap.colors.join(" ")} ${cap.tags.join(" ")}`
    .toLowerCase()
    .includes(needle);

/** Reads `?cat=` client-side so the catalog route stays statically cached. */
export function CatalogBrowser({ caps }: CatalogBrowserProps) {
  const params = useSearchParams();
  const requested = params.get("cat");
  const initialCategory: CategoryFilter =
    requested && requested in CATEGORIES ? (requested as CategoryKey) : "all";

  return (
    <CatalogView key={initialCategory} caps={caps} initialCategory={initialCategory} />
  );
}

function CatalogView({ caps, initialCategory }: CatalogViewProps) {
  const [category, setCategory] = useState<CategoryFilter>(initialCategory);
  const [size, setSize] = useState<SizeFilter>("all");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("new");
  const [visible, setVisible] = useState(PAGE_SIZE);

  const sizes = useMemo(
    () => [...new Set(caps.flatMap((cap) => cap.sizes))].sort((a, b) => a - b),
    [caps]
  );

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();

    return caps
      .filter((cap) => inCategory(cap, category))
      .filter((cap) => hasSize(cap, size))
      .filter((cap) => matchesQuery(cap, needle))
      .sort((a, b) =>
        sort === "size"
          ? a.sizes[0] - b.sizes[0]
          : Date.parse(b.createdAt) - Date.parse(a.createdAt)
      );
  }, [caps, category, size, query, sort]);

  const shown = filtered.slice(0, visible);

  const resetFilters = () => {
    setCategory("all");
    setSize("all");
    setQuery("");
    setSort("new");
    setVisible(PAGE_SIZE);
  };

  return (
    <Page>
      <PageTitle
        title="Browse caps"
        lead="Tap a cap to see sizes and order on WhatsApp."
      />
      <h2 className="sr-only">All caps</h2>

      <div className="sticky top-[58px] z-20 -mx-3.5 bg-cream px-3.5 pt-3.5 pb-3">
        <label className="flex h-[52px] items-center gap-2.5 rounded-full border-[1.5px] border-line bg-paper px-4.5 focus-within:border-g7 focus-within:shadow-[0_0_0_3px_rgba(18,104,58,0.18)]">
          <Search className="ic text-mut" aria-hidden="true" />
          <input
            type="search"
            placeholder="Search name or colour"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setVisible(PAGE_SIZE);
            }}
            aria-label="Search caps by name or colour"
            className="w-full border-0 bg-transparent outline-none"
          />
        </label>

        <div
          className="flex gap-2.5 overflow-x-auto pt-3.5 pb-0.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          role="group"
          aria-label="Filter by type"
        >
          <Chip
            selected={category === "all"}
            aria-pressed={category === "all"}
            onClick={() => {
              setCategory("all");
              setVisible(PAGE_SIZE);
            }}
          >
            All
          </Chip>
          {(Object.entries(CATEGORIES) as [CategoryKey, { label: string }][]).map(
            ([key, value]) => (
              <Chip
                key={key}
                selected={category === key}
                aria-pressed={category === key}
                onClick={() => {
                  setCategory(key);
                  setVisible(PAGE_SIZE);
                }}
              >
                {value.label}
              </Chip>
            )
          )}
        </div>

        <div
          className="flex gap-2.5 overflow-x-auto pt-3.5 pb-0.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          role="group"
          aria-label="Filter by size"
        >
          <span
            className="self-center text-[11px] font-bold tracking-[0.14em] text-mut uppercase"
            aria-hidden="true"
          >
            Size
          </span>
          <Chip
            selected={size === "all"}
            aria-pressed={size === "all"}
            onClick={() => {
              setSize("all");
              setVisible(PAGE_SIZE);
            }}
          >
            Any
          </Chip>
          {sizes.map((value) => (
            <Chip
              key={value}
              selected={size === value}
              aria-pressed={size === value}
              onClick={() => {
                setSize(value);
                setVisible(PAGE_SIZE);
              }}
            >
              {value}
            </Chip>
          ))}
        </div>
      </div>

      <div className="my-5 flex items-center justify-between text-[13px] text-mut">
        <span aria-live="polite">
          {filtered.length} cap{filtered.length === 1 ? "" : "s"}
        </span>
        <select
          value={sort}
          onChange={(event) => setSort(event.target.value as SortKey)}
          aria-label="Sort caps"
          className="min-h-11 rounded-full border-[1.5px] border-line bg-paper px-3.5 py-2 text-[13px]"
        >
          <option value="new">Newest</option>
          <option value="size">Size: small to large</option>
        </select>
      </div>

      <CapGrid>
        {shown.map((cap, index) => (
          <CapCard cap={cap} key={cap.id} priority={index < 4} />
        ))}

        {filtered.length === 0 ? (
          <div className="col-span-full grid justify-items-center gap-4 py-14 text-center text-mut">
            <SearchX className="ic" aria-hidden="true" />
            <p>No caps match your filters.</p>
            <Button variant="line" onClick={resetFilters}>
              Clear filters
            </Button>
            <ButtonAnchor
              variant="wa"
              href={ASK_LINK}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon className="ic wa" /> Ask on WhatsApp
            </ButtonAnchor>
          </div>
        ) : null}
      </CapGrid>

      {visible < filtered.length ? (
        <Section className="text-center">
          <Button
            variant="line"
            onClick={() => setVisible((current) => current + PAGE_SIZE)}
          >
            Load more caps
          </Button>
        </Section>
      ) : null}
    </Page>
  );
}
