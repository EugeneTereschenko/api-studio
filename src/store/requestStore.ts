import { create } from 'zustand';

import type { ApiRequest } from '../types/ApiRequest';

interface RequestStore {
    request: ApiRequest;
    setRequest: (request: ApiRequest) => void;
    updateRequest: (data: Partial<ApiRequest>) => void;
}

const initialRequest: ApiRequest = {
    method: "GET",
    url: "https://jsonplaceholder.typicode.com/users",
    headers: [],
    params: [],
    body: "",
}

export const useRequestStore = create<RequestStore>((set) => ({
    request: initialRequest,
    setRequest: (request) => set({ request }),
    updateRequest: (data) => set((state) => ({ request: { ...state.request, ...data } })),
}));