import { create } from "zustand";

import type { HttpMethod } from "../types/HttpMethod";
import type { MockEndpoint } from "../types/MockEndpoint";

const STORAGE_KEY = "api-studio-mock-endpoints";

interface MockEndpointInput {
    method: HttpMethod;
    path: string;
    status: number;
    delay: number;
    headers: string;
    body: string;
}

interface MockServerStore {
    endpoints: MockEndpoint[];
    addEndpoint: (endpoint: MockEndpointInput) => void;
    updateEndpoint: (id: string, endpoint: MockEndpointInput) => void;
    deleteEndpoint: (id: string) => void;
    clearEndpoints: () => void;
}

function readInitialEndpoints(): MockEndpoint[] {
    if (typeof localStorage === "undefined") {
        return [];
    }

    const value = localStorage.getItem(STORAGE_KEY);

    if (!value) {
        return [];
    }

    try {
        return JSON.parse(value) as MockEndpoint[];
    } catch {
        return [];
    }
}

function persist(endpoints: MockEndpoint[]) {
    if (typeof localStorage === "undefined") {
        return;
    }

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(endpoints)
    );
}

export const useMockServerStore = create<MockServerStore>((set) => ({
    endpoints: readInitialEndpoints(),

    addEndpoint(endpoint) {
        set((state) => {
            const endpoints = [
                ...state.endpoints,
                {
                    ...endpoint,
                    id: crypto.randomUUID(),
                    createdAt: new Date().toISOString(),
                },
            ];

            persist(endpoints);

            return { endpoints };
        });
    },

    updateEndpoint(id, endpoint) {
        set((state) => {
            const endpoints = state.endpoints.map((item) =>
                item.id === id
                    ? {
                          ...item,
                          ...endpoint,
                      }
                    : item
            );

            persist(endpoints);

            return { endpoints };
        });
    },

    deleteEndpoint(id) {
        set((state) => {
            const endpoints = state.endpoints.filter(
                (endpoint) => endpoint.id !== id
            );

            persist(endpoints);

            return { endpoints };
        });
    },

    clearEndpoints() {
        persist([]);
        set({ endpoints: [] });
    },
}));
