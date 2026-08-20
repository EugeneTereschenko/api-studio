import type { HttpMethod } from "./HttpMethod";

export interface MockEndpoint {
    id: string;
    method: HttpMethod;
    path: string;
    status: number;
    delay: number;
    headers: string;
    body: string;
    createdAt: string;
}
