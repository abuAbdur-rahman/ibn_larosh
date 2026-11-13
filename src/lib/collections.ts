export interface CollectionItem {
  name: string;
  detail?: string;
  href?: string;
}

export interface Collection {
  id: string;
  shortName: string;
  name: string;
  description: string;
  image: string;
  imagePosition: string;
  items: readonly CollectionItem[];
}

export const COLLECTIONS: readonly Collection[] = [
  {
    id: "clothing",
    shortName: "Clothing",
    name: "Clothing & Wearables",
    description: "Hausa caps, modest wear and pieces for Friday, Eid and every day.",
    image: "/collections/clothing.webp",
    imagePosition: "center",
    items: [
      { name: "Hausa caps", detail: "Tajia and kaftan caps", href: "/caps" },
      { name: "Islamic caps", detail: "Atiku, Saudi and Turkish styles" },
      { name: "Jalabiyas" },
      { name: "Hijabs" },
      { name: "Niqabs" },
      { name: "Khimars" },
      { name: "Abayas" },
      { name: "Hijab undercaps and underscarves" },
      { name: "Senator wear" },
      { name: "Kaftans" },
      { name: "Thobes" },
      { name: "Agbada" },
      { name: "Fabrics" },
      { name: "Rings" },
      { name: "Wristwatches", detail: "Men’s and women’s styles" },
      { name: "Cufflinks" },
    ],
  },
  {
    id: "fragrances",
    shortName: "Fragrances",
    name: "Luxury Perfumes & Fragrances",
    description: "Attars, bukhūr and alcohol-free sprays for yourself or as a gift.",
    image: "/collections/fragrance.webp",
    imagePosition: "center 42%",
    items: [
      { name: "Attars", detail: "Concentrated perfume oils" },
      { name: "Incense and bukhūr", detail: "Bakhoor" },
      { name: "Alcohol-free spray perfumes" },
      { name: "Sunnah-inspired fragrance gift sets" },
    ],
  },
  {
    id: "essentials",
    shortName: "Books & essentials",
    name: "Islamic Books & Essentials",
    description: "Books for every stage of learning, prayer essentials and everyday staples.",
    image: "/collections/essentials.webp",
    imagePosition: "center 28%",
    items: [
      { name: "Qur’an and Nūr al-Bayān", detail: "Nurul-Bayan" },
      { name: "Tawheed books", detail: "Taoheed · Islamic creed" },
      { name: "Fiqh books", detail: "Fiqhu · Islamic jurisprudence" },
      { name: "Hadith collections" },
      { name: "Tafsir books" },
      { name: "Seerah books" },
      { name: "Arabic language learning books" },
      { name: "Children’s Islamic storybooks" },
      { name: "Digital Islamic learning devices", detail: "E-books, digital Qur’an pens, Qur’an players and headphones" },
      { name: "Black seed", detail: "Oil and powder" },
      { name: "Honey", detail: "Including Sidr honey" },
      { name: "Zamzam water" },
      { name: "Herbal and natural wellness products" },
      { name: "Prayer mats" },
      { name: "Miswak" },
      { name: "Qur’an stands", detail: "Rehal" },
    ],
  },
];

export function shopHref(collection?: string, query?: string) {
  const params = new URLSearchParams();
  if (collection) params.set("collection", collection);
  if (query) params.set("q", query);
  const search = params.toString();
  return search ? `/shop?${search}` : "/shop";
}

function normalize(text: string) {
  return text
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

export function findCollections(collection: Collection | undefined, query: string) {
  const words = normalize(query).split(" ").filter(Boolean);

  return (collection ? [collection] : COLLECTIONS)
    .map((group) => ({
      ...group,
      items: group.items.filter((item) => {
        const name = normalize(`${item.name} ${item.detail ?? ""}`);
        return words.every((word) => name.includes(word));
      }),
    }))
    .filter((group) => group.items.length > 0);
}
