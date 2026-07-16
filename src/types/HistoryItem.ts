import type { ApiRequest } from "./ApiRequest";
import type { ApiResponse } from "./ApiResponse";

export interface HistoryItem {
    id: string;
    request: ApiRequest;
    response: ApiResponse;
    createdAt: Date;
}