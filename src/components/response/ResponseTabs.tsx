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
            <div className="tabs">
                <button className={`tab ${tab === "body" ? "active" : ""}`} type="button" onClick={() => setTab("body")}>Body</button>
                <button className={`tab ${tab === "headers" ? "active" : ""}`} type="button" onClick={() => setTab("headers")}>Headers</button>
                <button className={`tab ${tab === "raw" ? "active" : ""}`} type="button" onClick={() => setTab("raw")}>Raw</button>
            </div>

            {tab === "body" && <ResponseBody data={response.data} />}

            {tab === "headers" && (
                <pre className="code-block">{JSON.stringify(response.headers, null, 2)}</pre>
            )}

            {tab === "raw" && (
                <pre className="code-block">{JSON.stringify(response, null, 2)}</pre>
            )}
        </>
    );
}
