import { useState } from "react";

import type { ApiResponse } from "../../types/ApiResponse";
import ResponseBody from "./ResponseBody";

type Props = {
    response: ApiResponse;
};

export default function ResponseTabs({ response }: Props) {
    const [tab, setTab] = useState<"body" | "headers" | "raw">("body");

    return (
        <>
            <div
                style={{
                    display: "flex",
                    gap: "10px",
                    marginBottom: "1rem",
                }}
            >
                <button onClick={() => setTab("body")}>Body</button>
                <button onClick={() => setTab("headers")}>Headers</button>
                <button onClick={() => setTab("raw")}>Raw</button>
            </div>

            {tab === "body" && <ResponseBody data={response.data} />}

            {tab === "headers" && (
                <pre>{JSON.stringify(response.headers, null, 2)}</pre>
            )}

            {tab === "raw" && (
                <pre>{JSON.stringify(response, null, 2)}</pre>
            )}
        </>
    );
}