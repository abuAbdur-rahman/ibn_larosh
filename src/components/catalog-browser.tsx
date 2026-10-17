"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search, SearchX } from "lucide-react";
import { CapCard } from "./cap-card";
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
    <div className="page">
      <div className="ttl">
        <h1>Browse caps</h1>
        <p>Tap a cap to see sizes and order on WhatsApp.</p>
      </div>

      <h2 className="sr-only">All caps</h2>

      <div className="fbar">
        <label className="search">
          <Search className="ic" aria-hidden="true" />
          <input
            type="search"
            placeholder="Search name or colour"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setVisible(PAGE_SIZE);
            }}
            aria-label="Search caps by name or colour"
          />
        </label>

        <div className="chips" role="group" aria-label="Filter by type">
          <button
            type="button"
            className="chip"
            aria-pressed={category === "all"}
            onClick={() => {
              setCategory("all");
              setVisible(PAGE_SIZE);
            }}
          >
            All
          </button>
          {(Object.entries(CATEGORIES) as [CategoryKey, { label: string }][]).map(
            ([key, value]) => (
              <button
                type="button"
                className="chip"
                key={key}
                aria-pressed={category === key}
                onClick={() => {
                  setCategory(key);
                  setVisible(PAGE_SIZE);
                }}
              >
                {value.label}
              </button>
            )
          )}
        </div>

        <div className="chips" role="group" aria-label="Filter by size">
          <span className="lab" aria-hidden="true" style={{ alignSelf: "center" }}>
            Size
          </span>
          <button
            type="button"
            className="chip"
            aria-pressed={size === "all"}
            onClick={() => {
              setSize("all");
              setVisible(PAGE_SIZE);
            }}
          >
            Any
          </button>
          {sizes.map((value) => (
            <button
              type="button"
              className="chip"
              key={value}
              aria-pressed={size === value}
              onClick={() => {
                setSize(value);
                setVisible(PAGE_SIZE);
              }}
            >
              {value}
            </button>
          ))}
        </div>
      </div>

      <div className="meta">
        <span aria-live="polite">
          {filtered.length} cap{filtered.length === 1 ? "" : "s"}
        </span>
        <select
          value={sort}
          onChange={(event) => setSort(event.target.value as SortKey)}
          aria-label="Sort caps"
        >
          <option value="new">Newest</option>
          <option value="size">Size: small to large</option>
        </select>
      </div>

      <div className="cap-grid">
        {shown.map((cap, index) => (
          <CapCard cap={cap} key={cap.id} priority={index < 4} />
        ))}

        {filtered.length === 0 ? (
          <div className="empty">
            <SearchX className="ic" aria-hidden="true" />
            <p>No caps match your filters.</p>
            <button type="button" className="btn line" onClick={resetFilters}>
              Clear filters
            </button>
            <a className="btn wa" href={ASK_LINK} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon className="ic wa" /> Ask on WhatsApp
            </a>
          </div>
        ) : null}
      </div>

      {visible < filtered.length ? (
        <div className="sec" style={{ textAlign: "center" }}>
          <button
            type="button"
            className="btn line"
            onClick={() => setVisible((current) => current + PAGE_SIZE)}
          >
            Load more caps
          </button>
        </div>
      ) : null}
    </div>
  );
}
