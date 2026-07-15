export interface ApiResponse {
    status: number;
    statusText: string;
    duration: number;
    size: number;
    headers: Record<string, string>;
    data: unknown;
}