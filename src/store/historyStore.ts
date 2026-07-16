import { create } from "zustand";

import type { HistoryItem } from "../types/HistoryItem";

interface HistoryStore {
    items: HistoryItem[];

    add: (item: HistoryItem) => void;

    clear: () => void;
}

export const useHistoryStore = create<HistoryStore>((set) => ({
    items: [],

    add: (item) =>
        set((state) => ({
            items: [item, ...state.items],
        })),

    clear: () =>
        set({
            items: [],
        }),
}));