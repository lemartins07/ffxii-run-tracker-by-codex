import { createContext, useContext, useMemo, useState } from 'react';
import type { SearchResults } from '../types/walkthrough';
import { searchEntities } from '../lib/walkthrough-data';

interface SearchContextValue {
  query: string;
  results: SearchResults;
  search: (term: string) => void;
  clear: () => void;
}

const SearchContext = createContext<SearchContextValue | null>(null);

export const SearchProvider = ({ children }: { children: React.ReactNode }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResults>({ sections: [], items: [], shops: [] });

  const search = (term: string) => {
    setQuery(term);
    setResults(searchEntities(term));
  };

  const clear = () => {
    setQuery('');
    setResults({ sections: [], items: [], shops: [] });
  };

  const value = useMemo(() => ({ query, results, search, clear }), [query, results]);

  return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>;
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used inside SearchProvider');
  }
  return context;
};
