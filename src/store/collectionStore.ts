import { create } from "zustand";

import type { Collection } from "../types/Collection";
import type { SavedRequest } from "../types/SavedRequest";

type CollectionStore = {
    collections: Collection[];

    addCollection: (name: string) => void;

    addRequest: (
        collectionId: string,
        request: SavedRequest
    ) => void;
};

export const useCollectionStore = create<CollectionStore>((set) => ({
    collections: [],

    addCollection: (name) =>
        set((state) => ({
            collections: [
                ...state.collections,
                {
                    id: crypto.randomUUID(),
                    name,
                    requests: [],
                },
            ],
        })),

    addRequest: (collectionId, request) =>
        set((state) => ({
            collections: state.collections.map((collection) =>
                collection.id === collectionId
                    ? {
                          ...collection,
                          requests: [
                              ...collection.requests,
                              request,
                          ],
                      }
                    : collection
            ),
        })),
}));