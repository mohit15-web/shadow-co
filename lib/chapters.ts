export interface Chapter {
  slug: string;
  number: string;
  title: string;
  tagline: string;
  statement: string;
  manifesto: string[];
  designCount: number;
  pieceCount: number;
}

export const chapters: Chapter[] = [
  {
    slug: "the-unheard",
    number: "001",
    title: "THE UNHEARD",
    tagline: "For those who have something to say, but don't need to say it.",
    statement: "Three designs. Eighteen pieces. One statement.",
    manifesto: [
      "Some people wait to be asked. The ones in this chapter never do — they simply decide, quietly, and move.",
      "THE UNHEARD is not about being ignored. It's about choosing when to speak, and meaning it every time you do.",
      "Eighteen pieces. No more. Once they're gone, this chapter closes — the way a chapter should.",
    ],
    designCount: 3,
    pieceCount: 18,
  },
];

export function getChapter(slug: string) {
  return chapters.find((c) => c.slug === slug);
}
