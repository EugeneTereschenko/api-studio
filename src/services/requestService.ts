import { apiClient } from "../api/apiClient";

export async function sendRequest(method: string, url: string){

    const response = await apiClient({
        method,
        url,
    });
    return response;
}