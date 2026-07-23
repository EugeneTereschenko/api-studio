import type { ApiRequest } from "./ApiRequest";

export interface SavedRequest {
    id: string;
    name: string;
    request: ApiRequest;
}