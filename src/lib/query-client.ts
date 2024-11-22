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

export function createQueryClient() {
  const GC_TIME = 1000 * 60 * 60 * 2; // 2 hours
  const STALE_TIME = 1000 * 60 * 60; // 1 hour

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        gcTime: GC_TIME,
        staleTime: STALE_TIME,
      },
    },
  });

  const localStoragePersister = createSyncStoragePersister({
    storage: getStorage(),
  });

  persistQueryClient({
    queryClient,
    persister: localStoragePersister,
    maxAge: GC_TIME,
  });

  return queryClient;
}
