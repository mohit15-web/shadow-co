export type PanelTone = "bg" | "surface" | "surface-2";

export interface Product {
  slug: string;
  code: string;
  chapterSlug: string;
  workingTitle: string;
  garmentType: string;
  theIdea: string;
  theMeaning: string;
  sizes: string[];
  editionSize: number;
  panelTone: PanelTone;
  price: number;
  image: string;
  imageDetail: string;
  imageAlt: string;
}

// Exact sizing and fabric specification are not yet confirmed by the client.
// Prices and photography are placeholders standing in for the real product
// shoot and final pricing — replace both before launch.
export const DETAILS_PENDING =
  "Fabric, weight and fit are being finalised ahead of production. Full garment specification will replace this note before launch.";
export const SIZE_RUN_NOTE = "Standard run shown as a placeholder — to be confirmed.";

export function formatPrice(price: number) {
  return `$${price}`;
}

export const products: Product[] = [
  {
    slug: "silent-frequency",
    code: "SC-001-A",
    chapterSlug: "the-unheard",
    workingTitle: "SILENT FREQUENCY",
    garmentType: "Graphic Tee",
    theIdea:
      "Not every signal needs volume to be received. This piece carries a mark only legible up close — found by the people paying attention, missed by everyone else.",
    theMeaning:
      "For the moments you understood something before anyone explained it.",
    sizes: ["S", "M", "L", "XL"],
    editionSize: 6,
    panelTone: "surface",
    price: 68,
    image: "/images/products/tee-front.jpg",
    imageDetail: "/images/products/tee-detail.jpg",
    imageAlt: "Black crew neck t-shirts on wooden hangers against a white studio background",
  },
  {
    slug: "unspoken",
    code: "SC-001-B",
    chapterSlug: "the-unheard",
    workingTitle: "UNSPOKEN",
    garmentType: "Heavyweight Hoodie",
    theIdea:
      "Weight, held close. What this piece doesn't announce is the point — built for the version of you that says less and means more of it.",
    theMeaning: "A second layer for the thoughts you keep to yourself.",
    sizes: ["S", "M", "L", "XL"],
    editionSize: 6,
    panelTone: "surface-2",
    price: 128,
    image: "/images/products/hoodie-front.jpg",
    imageDetail: "/images/products/hoodie-front.jpg",
    imageAlt: "Black and grey hoodies with drawstrings, close detail",
  },
  {
    slug: "witness-mark",
    code: "SC-001-C",
    chapterSlug: "the-unheard",
    workingTitle: "WITNESS MARK",
    garmentType: "Overshirt",
    theIdea:
      "Proof that you were paying attention when it mattered. A record worn as an outer layer, not a statement shouted from one.",
    theMeaning: "Evidence, not announcement.",
    sizes: ["S", "M", "L", "XL"],
    editionSize: 6,
    panelTone: "bg",
    price: 184,
    image: "/images/products/jacket-front.jpg",
    imageDetail: "/images/products/jacket-detail.jpg",
    imageAlt: "Black jacket laid flat, studio product photo",
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getProductsByChapter(chapterSlug: string) {
  return products.filter((p) => p.chapterSlug === chapterSlug);
}
