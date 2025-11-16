import walkthroughJson from '../../data.json';
import type {
  ItemIndexEntry,
  SearchResults,
  SectionKind,
  SectionWithEntry,
  ShopReference,
  TocSection,
  WalkthroughData,
  WalkthroughEntry,
} from '../types/walkthrough';

const walkthroughData = walkthroughJson as WalkthroughData;

const sectionsSorted: SectionWithEntry[] = walkthroughData.toc
  .slice()
  .sort((a, b) => a.order - b.order)
  .map((section) => ({ section, entry: walkthroughData.entries[section.code] }));

const sectionMap = new Map<string, SectionWithEntry>(
  sectionsSorted.map((sectionWithEntry) => [sectionWithEntry.section.code, sectionWithEntry]),
);

const sectionsByKind = new Map<SectionKind, SectionWithEntry[]>(
  sectionsSorted.reduce((map, current) => {
    const kind = current.section.kind;
    if (!map.has(kind)) {
      map.set(kind, []);
    }
    map.get(kind)!.push(current);
    return map;
  }, new Map<SectionKind, SectionWithEntry[]>()),
);

interface ItemIndexCache {
  items: ItemIndexEntry[];
  lookup: Map<string, ItemIndexEntry>;
  shopRefs: ShopReference[];
}

let itemIndexCache: ItemIndexCache | null = null;

const normalizeItemId = (itemId?: string, fallback?: string) => {
  if (itemId && itemId.trim().length > 0) {
    return itemId;
  }
  return fallback ? fallback.toLowerCase().replace(/[^a-z0-9]+/g, '-') : '';
};

const buildItemIndex = (): ItemIndexCache => {
  const lookup = new Map<string, ItemIndexEntry>();
  const shopRefs: ShopReference[] = [];

  sectionsSorted.forEach(({ section, entry }) => {
    if (!entry) return;
    entry.shops?.forEach((shop) => {
      const typeLabel = shop.type ?? 'shop';
      shopRefs.push({
        sectionCode: section.code,
        shopType: typeLabel,
        shopName: shop.name,
      });
      shop.items?.forEach((item) => {
        const fallbackId = `${typeLabel}-${item.nameEn ?? item.nameJp ?? item.nameRaw ?? ''}`;
        const itemId = normalizeItemId(item.itemId, fallbackId);
        if (!itemId) return;
        if (!lookup.has(itemId)) {
          lookup.set(itemId, {
            itemId,
            nameEn: item.nameEn ?? item.nameRaw,
            nameJp: item.nameJp,
            occurrences: [],
            referencedIn: [],
          });
        }
        lookup.get(itemId)!.occurrences.push({
          sectionCode: section.code,
          shopType: typeLabel,
          shopName: shop.name,
        });
      });
    });

    entry.itemsReferenced?.forEach((itemId) => {
      const normalized = normalizeItemId(itemId, itemId);
      if (!normalized) return;
      if (!lookup.has(normalized)) {
        lookup.set(normalized, {
          itemId: normalized,
          occurrences: [],
          referencedIn: [],
        });
      }
      const current = lookup.get(normalized)!;
      if (!current.referencedIn.includes(section.code)) {
        current.referencedIn.push(section.code);
      }
    });
  });

  return { items: Array.from(lookup.values()), lookup, shopRefs };
};

const ensureItemIndex = () => {
  if (!itemIndexCache) {
    itemIndexCache = buildItemIndex();
  }
  return itemIndexCache;
};

export const getMeta = () => walkthroughData.meta;

export const getAllSections = () => sectionsSorted;

export const getSectionByCode = (code: string) => sectionMap.get(code);

export const getSectionsByKind = (kind: SectionKind) => sectionsByKind.get(kind) ?? [];

export const getChildrenSections = (parentCode: string) =>
  sectionsSorted.filter((section) => section.section.parentCode === parentCode);

export const getShopsBySection = (code: string) => {
  const entry = walkthroughData.entries[code];
  return entry?.shops ?? [];
};

export const getItemsIndex = (): ItemIndexEntry[] => ensureItemIndex().items;

export const getShopReferences = (): ShopReference[] => ensureItemIndex().shopRefs;

export const getCrystalLocations = () =>
  sectionsSorted.filter(({ entry }) => entry?.crystals?.teleport || entry?.crystals?.save);

export const searchEntities = (term: string): SearchResults => {
  const normalized = term.trim().toLowerCase();
  if (!normalized) {
    return { sections: [], items: [], shops: [] };
  }

  const sections = sectionsSorted.filter(({ section, entry }) => {
    const title = `${section.label?.en ?? ''} ${section.label?.jp ?? ''} ${entry?.titles?.primary?.en ?? ''} ${entry?.titles?.primary?.jp ?? ''}`;
    return title.toLowerCase().includes(normalized);
  });

  const { items, shopRefs } = ensureItemIndex();
  const filteredItems = items.filter((item) => {
    const combined = `${item.nameEn ?? ''} ${item.nameJp ?? ''} ${item.itemId}`;
    return combined.toLowerCase().includes(normalized);
  });

  const filteredShops = shopRefs.filter((shop) => {
    const combined = `${shop.shopName ?? ''} ${shop.shopType}`;
    return combined.toLowerCase().includes(normalized);
  });

  return {
    sections,
    items: filteredItems,
    shops: filteredShops,
  };
};

export const getSectionKinds = () => Array.from(sectionsByKind.keys());

export const getParentSection = (code: string): SectionWithEntry | undefined => {
  const section = getSectionByCode(code);
  if (!section?.section.parentCode) return undefined;
  return getSectionByCode(section.section.parentCode);
};

export const getRelatedSections = (code: string): SectionWithEntry[] => {
  const entry = walkthroughData.entries[code];
  if (!entry) return [];
  const childLinks = sectionsSorted.filter(
    ({ section }) => section.parentCode === code || entry.relatedCodes?.includes(section.code),
  );
  const unique = new Map<string, SectionWithEntry>();
  childLinks.forEach((item) => {
    unique.set(item.section.code, item);
  });
  return Array.from(unique.values());
};

export const getRunStatistics = () => ({
  totalSections: sectionsSorted.length,
  totalStory: getSectionsByKind('story').length,
  totalHunts: getSectionsByKind('mark').length,
  totalLoots: getSectionsByKind('loot').length,
  totalCrystals: getCrystalLocations().length,
});

export type { WalkthroughEntry, TocSection };
