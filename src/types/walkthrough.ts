export type SectionKind =
  | 'story'
  | 'mark'
  | 'loot'
  | 'shop'
  | 'misc'
  | string;

export interface LocalizedText {
  en?: string;
  jp?: string;
  raw?: string;
}

export interface TocSection {
  code: string;
  order: number;
  kind: SectionKind;
  label?: LocalizedText;
  parentCode?: string | null;
  region?: string;
}

export interface CrystalInfo {
  teleport?: boolean;
  save?: boolean;
}

export interface MediaItem {
  url: string;
  caption?: string;
}

export interface ShopItem {
  itemId?: string;
  nameEn?: string;
  nameJp?: string;
  nameRaw?: string;
  price?: number;
  quantity?: string;
  notes?: string;
  type?: string;
}

export interface Shop {
  id?: string;
  type?: string;
  name?: string;
  items?: ShopItem[];
}

export type NarrativeEntry = string | { kind?: string; text: string };

export interface WalkthroughEntry {
  code: string;
  titles: {
    primary?: LocalizedText;
    [key: string]: LocalizedText | undefined;
  };
  kind: SectionKind;
  crystals?: CrystalInfo;
  media?: MediaItem[];
  narrative?: NarrativeEntry[];
  shops?: Shop[];
  itemsReferenced?: string[];
  relatedCodes?: string[];
  summary?: string;
}

export interface WalkthroughData {
  meta: {
    title: string;
    subtitle?: string;
    version?: string;
    author?: string;
  };
  toc: TocSection[];
  entries: Record<string, WalkthroughEntry>;
}

export interface SectionWithEntry {
  section: TocSection;
  entry?: WalkthroughEntry;
}

export interface ShopReference {
  sectionCode: string;
  shopType?: string;
  shopName?: string;
}

export interface ItemIndexEntry {
  itemId: string;
  nameEn?: string;
  nameJp?: string;
  occurrences: {
    sectionCode: string;
    shopType?: string;
    shopName?: string;
  }[];
  referencedIn: string[];
}

export interface SearchResults {
  sections: SectionWithEntry[];
  items: ItemIndexEntry[];
  shops: ShopReference[];
}
