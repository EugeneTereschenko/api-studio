import { useState } from "react";
import axios from "axios";

import RequestBar from "../components/request/RequestBar";
import ResponseViewer from "../components/response/ResponseViewer";

import { v4 as uuid } from "uuid";
import { useHistoryStore } from "../store/historyStore";

import type { ApiRequest } from "../types/ApiRequest";
import type { ApiResponse } from "../types/ApiResponse";

import { useRequestStore } from "../store/requestStore";
import SaveRequestDialog from "../components/collections/SaveRequestDialog";
import { useCollectionStore } from "../store/collectionStore";

import { resolveEnvironment } from "../utils/environmentResolver";

import { useEnvironmentStore } from "../store/environmentStore";




export default function Home() {
    const [response, setResponse] = useState<ApiResponse | null>(null);

    const request = useRequestStore((state) => state.request);


    const collections = useCollectionStore((state) => state.collections);

    const addCollection = useCollectionStore(
        (state) => state.addCollection
    );

    const addRequest = useCollectionStore(
        (state) => state.addRequest
    );

    const setRequest = useRequestStore((state) => state.setRequest);

    const addHistory = useHistoryStore((state) => state.add);

    const [saveOpen, setSaveOpen] = useState(false);

    const environments = useEnvironmentStore(
        (state) => state.environments
    );

    const activeEnvironmentId = useEnvironmentStore(
        (state) => state.activeEnvironmentId
    );

    const activeEnvironment = environments.find(
        (environment) =>
            environment.id === activeEnvironmentId
    );

    const [loading, setLoading] = useState(false);

    async function handleSend(request: ApiRequest) {
        try {
            setLoading(true);

            const start = performance.now();

            const finalUrl = resolveEnvironment(
                request.url,
                activeEnvironment
            );

            const resolvedHeaders = Object.fromEntries(
                request.headers
                    .filter(
                        (header) =>
                            header.enabled &&
                            header.key
                    )
                    .map((header) => [
                        resolveEnvironment(
                            header.key,
                            activeEnvironment
                        ),
                        resolveEnvironment(
                            header.value,
                            activeEnvironment
                        ),
                    ])
            );

            const resolvedParams = Object.fromEntries(
                request.params
                    .filter(
                        (param) =>
                            param.enabled &&
                            param.key
                    )
                    .map((param) => [
                        resolveEnvironment(
                            param.key,
                            activeEnvironment
                        ),
                        resolveEnvironment(
                            param.value,
                            activeEnvironment
                        ),
                    ])
            );

            const resolvedBody = resolveEnvironment(
                request.body,
                activeEnvironment
            );

            const res = await axios({
                method: request.method,
                url: finalUrl,
                headers: resolvedHeaders,
                params: resolvedParams,
                data: resolvedBody,
            });

            const duration =
                performance.now() - start;

            const size = new Blob([
                JSON.stringify(res.data),
            ]).size;

            const apiResponse: ApiResponse = {
                status: res.status,
                statusText: res.statusText,
                duration,
                size,
                headers:
                    res.headers as Record<string, string>,
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

        } finally {
            setLoading(false);
        }
    }


    function handleSave(data: {
        requestName: string;
        collectionName: string;
        createNew: boolean;
    }) {

        let collection = collections.find(
            c => c.name === data.collectionName
        );

        let collectionId: string;

        if (!collection) {
            collectionId = addCollection(data.collectionName);
        } else {
            collectionId = collection.id;
        }

        addRequest(collectionId, {
            id: crypto.randomUUID(),
            name: data.requestName,
            request,
        });

        setSaveOpen(false);
    }

    return (
        <>
            <RequestBar
                request={request}
                onRequestChange={setRequest}
                onSend={handleSend}
                onSave={() => setSaveOpen(true)}
                loading={loading}
            />

            <ResponseViewer response={response} />

            <SaveRequestDialog
                open={saveOpen}
                collections={collections.map(c => c.name)}
                onCancel={() => setSaveOpen(false)}
                onSave={handleSave}
            />
        </>
    );
}