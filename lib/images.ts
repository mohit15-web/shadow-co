// Placeholder atmosphere photography (Lorem Picsum, Unsplash-licensed) standing in
// for original SHADOW CO. campaign photography until real shoots exist.
export interface AtmospherePhoto {
  id: number;
  alt: string;
  credit: string;
}

export const atmospherePhotos: AtmospherePhoto[] = [
  { id: 57, alt: "Narrow city street lined with brick buildings in shadow", credit: "Nicholas Swanson" },
  { id: 826, alt: "Boat on a canal between tall brick warehouses in hazy light", credit: "Nick Scheerbart" },
  { id: 868, alt: "Aerial view of a dense city skyline fading into haze", credit: "Jeffrey Swanson" },
  { id: 322, alt: "Narrow cobbled alley between worn ochre and terracotta walls", credit: "Afroz Nawaf" },
  { id: 344, alt: "Hazy golden city skyline reflected in still water", credit: "Alex Gindin" },
  { id: 188, alt: "Snow-dusted rooftops of an old town seen from above", credit: "Wojtek Witkowski" },
];

export function photoUrl(id: number) {
  return `/images/atmosphere/${id}.jpg`;
}
