import type { HttpMethod } from "./HttpMethod";

export interface KeyValuePair {
    id: string;
    key: string;
    value: string;
    enabled: boolean;
}

export interface ApiRequest {
    method: HttpMethod;
    url: string;
    headers: KeyValuePair[];
    params: KeyValuePair[];
    body: string;
}