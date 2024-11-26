import { QueryClient } from "@tanstack/react-query";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { persistQueryClient } from "@tanstack/react-query-persist-client";

const getStorage = () => {
  if (typeof window !== "undefined") {
    return localStorage;
  }
  return {
    getItem: () => null,
    setItem: () => {},
    removeItem: () => {},
  };
};

const GC_TIME = 1000 * 60 * 60; // 1 hour
const STALE_TIME = 1000 * 60 * 60; // 1 hour

export const customQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: GC_TIME,
      staleTime: STALE_TIME,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  },
});

const localStoragePersister = createSyncStoragePersister({
  storage: getStorage(),
});

persistQueryClient({
  queryClient: customQueryClient,
  persister: localStoragePersister,
  maxAge: GC_TIME,
});
