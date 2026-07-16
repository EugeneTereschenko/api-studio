import { useState } from "react";
import axios from "axios";

import RequestBar from "../components/request/RequestBar";
import ResponseViewer from "../components/response/ResponseViewer";

import { v4 as uuid } from "uuid";
import { useHistoryStore } from "../store/historyStore";

import type { ApiRequest } from "../types/ApiRequest";
import type { ApiResponse } from "../types/ApiResponse";


export default function Home() {
    const [response, setResponse] = useState<ApiResponse | null>(null);

    const [request, setRequest] = useState<ApiRequest>({
            method: "GET",
            url: "https://jsonplaceholder.typicode.com/users",
            headers: [],
            params: [],
            body: "",
        });

    const addHistory = useHistoryStore((state) => state.add);

    async function handleSend(request: ApiRequest) {
        try {
            const start = performance.now();

            const res = await axios({
                method: request.method,
                url: request.url,
                data: request.body,
            });

            const duration = performance.now() - start;

            const size = new Blob([
                JSON.stringify(res.data)
            ]).size;

            const apiResponse: ApiResponse = {
                status: res.status,
                statusText: res.statusText,
                duration,
                size,
                headers: res.headers as Record<string, string>,
                data: res.data,
            };

            setResponse(apiResponse);

            addHistory({
                id: uuid(),
                request,
                response: apiResponse,
                createdAt: new Date(),
            });
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <RequestBar
                request={request}
                onRequestChange={setRequest}
                onSend={handleSend}
            />

            <ResponseViewer response={response} />
        </>
  );
}