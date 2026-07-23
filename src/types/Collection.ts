import type { SavedRequest } from "./SavedRequest";

export interface Collection {
    id: string;
    name: string;
    requests: SavedRequest[];
}