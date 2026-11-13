import type { Metadata } from "next";
import Form from "next/form";
import Link from "next/link";
import { ArrowUpRight, Search } from "lucide-react";
import { Button, ButtonAnchor, ButtonLink } from "@/components/ui-kit/button";
import { Page, PageTitle } from "@/components/ui-kit/layout";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { COLLECTIONS, findCollections, shopHref } from "@/lib/collections";
import { enquiryLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Shop the collections",
  description: "Browse modest wear, Hausa caps, perfumes, Islamic books and essentials from IBN Larosh in Ilorin.",
  alternates: { canonical: "/shop" },
};

type ShopParams = Promise<{ collection?: string | string[]; q?: string | string[] }>;

export default async function ShopPage({ searchParams }: { searchParams: ShopParams }) {
  const params = await searchParams;
  const selected = COLLECTIONS.find((collection) => collection.id === params.collection);
  const query = typeof params.q === "string" ? params.q.trim().slice(0, 80) : "";
  const results = findCollections(selected, query);
  const filters = [{ id: undefined, shortName: "All" }, ...COLLECTIONS];

  return (
    <Page>
      <PageTitle
        title="Shop the collections"
        lead="Find what you’re looking for, then ask us about availability and prices on WhatsApp."
      />

      <div className="grid gap-3 rounded-[22px] border border-line bg-paper p-3.5 sm:p-5">
        <Form action="/shop" className="flex gap-2" role="search" aria-label="Shop collections">
          {selected && <input type="hidden" name="collection" value={selected.id} />}
          <label className="flex min-w-0 flex-1 items-center gap-2 rounded-full border border-line bg-white px-3.5 focus-within:border-g7">
            <Search className="size-5 shrink-0 text-mut" aria-hidden="true" />
            <span className="sr-only">Search the collections</span>
            <input
              key={query}
              name="q"
              type="search"
              maxLength={80}
              defaultValue={query}
              placeholder="Try Tajia, attar or prayer mat"
              className="min-w-0 flex-1 bg-transparent text-base focus-visible:outline-none focus-visible:shadow-none"
            />
          </label>
          <Button type="submit" className="shrink-0 px-4 sm:px-6">Search</Button>
        </Form>

        <nav className="flex flex-wrap gap-2" aria-label="Filter by collection">
          {filters.map((filter) => {
            const active = filter.id === selected?.id;
            return (
              <Link
                key={filter.id ?? "all"}
                href={shopHref(filter.id, query)}
                aria-current={active ? "page" : undefined}
                className={`inline-flex min-h-11 items-center rounded-full border px-3.5 text-sm font-semibold transition-colors ${
                  active ? "border-g9 bg-g9 text-white" : "border-line text-g9 hover:bg-cream"
                }`}
              >
                {filter.shortName}
              </Link>
            );
          })}
        </nav>
      </div>

      {query && (
        <div className="mt-5 flex flex-wrap items-center justify-between gap-x-3 text-mut">
          <p role="status">
            {results.length ? "Showing results for" : "No matches for"} <strong className="text-g9 [overflow-wrap:anywhere]">“{query}”</strong>
          </p>
          <Link href={shopHref(selected?.id)} className="inline-flex min-h-11 items-center font-semibold text-g9 underline underline-offset-4">
            Clear search
          </Link>
        </div>
      )}

      {results.length ? (
        <div className="mt-6 grid gap-6">
          {results.map((collection) => (
            <section
              key={collection.id}
              aria-labelledby={collection.id}
              className="overflow-hidden rounded-[22px] border border-line bg-paper"
            >
              <header className="border-b border-line bg-cream/60 px-4 py-5 sm:px-6">
                <h2 id={collection.id} className="text-[clamp(23px,4vw,34px)] text-g9">{collection.name}</h2>
                <p className="mt-1.5 text-sm text-mut">{collection.description}</p>
              </header>
              <ul className="grid sm:grid-cols-2 xl:grid-cols-3">
                {collection.items.map((item) => (
                  <li key={item.name} className="border-t border-line first:border-t-0 sm:odd:border-r sm:nth-2:border-t-0 xl:odd:border-r-0 xl:nth-3:border-t-0 xl:[&:not(:nth-child(3n))]:border-r">
                    {item.href ? (
                      <Link href={item.href} className="flex min-h-[72px] items-center gap-3 px-4 py-3 transition-colors hover:bg-cream sm:px-6">
                        <span className="flex-1">
                          <span className="block font-semibold text-g9">{item.name}</span>
                          <span className="block text-sm text-mut">{item.detail}</span>
                          <span className="mt-1 block text-xs font-semibold text-g7">Browse cap styles</span>
                        </span>
                        <ArrowUpRight className="size-5 shrink-0 text-g7" aria-hidden="true" />
                      </Link>
                    ) : (
                      <a
                        href={enquiryLink(item.name)}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Ask about ${item.name} on WhatsApp`}
                        className="flex h-full min-h-[72px] items-center gap-3 px-4 py-3 transition-colors hover:bg-cream sm:px-6"
                      >
                        <span className="flex-1">
                          <span className="block font-semibold text-g9">{item.name}</span>
                          {item.detail && <span className="block text-sm text-mut">{item.detail}</span>}
                        </span>
                        <span className="grid size-10 shrink-0 place-items-center rounded-full bg-g9/[0.07] text-g9">
                          <WhatsAppIcon className="size-5" />
                        </span>
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      ) : (
        <div className="mt-4 rounded-[22px] border border-line bg-paper p-5 sm:p-7">
          <p className="text-mut">Try a shorter name, search all collections, or ask us on WhatsApp.</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <ButtonLink href={selected ? shopHref(undefined, query) : "/shop"} variant="line">
              {selected ? "Search all collections" : "See all collections"}
            </ButtonLink>
            <ButtonAnchor href={enquiryLink(query)} variant="wa" target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon className="ic wa" /> Ask on WhatsApp
            </ButtonAnchor>
          </div>
        </div>
      )}
    </Page>
  );
}
