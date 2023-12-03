import { create } from 'zustand';
import { QueryData } from '@/typings';
import { chromeStorage } from '@/services/chromeStorage';
import { SPOT_USER_QUERIES } from '@/utils/storageKeys';

interface QueryState {
  queries: QueryData[];
  isLoadingQueries: boolean;
  fetchQueries: () => void;
  updateQueries: (queries: QueryData[]) => void;
}

export const useQueriesStore = create<QueryState>((set) => ({
  queries: [],
  isLoadingQueries: true,
  fetchQueries: async () => {
    set({ isLoadingQueries: true });

    const queries = await chromeStorage.get<QueryData[]>(SPOT_USER_QUERIES);
    if (queries) {
      set({ queries });
    }

    set({ isLoadingQueries: false });
  },
  updateQueries: async (queries: QueryData[]) => {
    await chromeStorage.set(SPOT_USER_QUERIES, queries);
    set({ queries });
  },
}));
