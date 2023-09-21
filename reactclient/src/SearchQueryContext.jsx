import React, { createContext, useContext, useState } from 'react';

// Create a context for managing the search query
const SearchQueryContext = createContext();

// Create a provider component that will wrap your entire application
export function SearchQueryProvider({ children }) {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <SearchQueryContext.Provider value={{ searchQuery, setSearchQuery }}>
      {children}
    </SearchQueryContext.Provider>
  );
}

// Create a custom hook to access the search query from any component
export function useSearchQuery() {
  const context = useContext(SearchQueryContext);
  if (!context) {
    throw new Error('useSearchQuery must be used within a SearchQueryProvider');
  }
  return context;
}
