import { create } from "zustand";

import type { Collection } from "../types/Collection";
import type { SavedRequest } from "../types/SavedRequest";

interface CollectionStore {
    collections: Collection[];

    addCollection: (name: string) => string;

    addRequest: (
        collectionId: string,
        request: SavedRequest
    ) => void;
}

export const useCollectionStore =
create<CollectionStore>((set) => ({

    collections: [],

    addCollection(name) {
        const id = crypto.randomUUID();

        set(state => ({
            collections: [
                ...state.collections,
                {
                    id,
                    name,
                    requests: [],
                },
            ],
        }));

        return id;
    },

    addRequest(collectionId, request) {
        set(state => ({
            collections: state.collections.map(c =>
                c.id === collectionId
                    ? {
                          ...c,
                          requests: [...c.requests, request],
                      }
                    : c
            ),
        }));
    },
}));