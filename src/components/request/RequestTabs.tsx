import { useState } from "react";

import QueryParamsEditor from "./QueryParamsEditor";
import HeadersEditor from "./HeadersEditor";
import BodyEditor from "./BodyEditor";

import type { ApiRequest } from "../../types/ApiRequest";

type Props = {
    request: ApiRequest;
    onChange: (request: ApiRequest) => void;
};

type Tab = "params" | "headers" | "body";

export default function RequestTabs({
    request,
    onChange,
}: Props) {
    const [activeTab, setActiveTab] = useState<Tab>("params");

    return (
        <div style={{ marginTop: 20 }}>

            <div
                style={{
                    display: "flex",
                    gap: 5,
                    borderBottom: "1px solid #ccc",
                    marginBottom: 15,
                }}
            >
                <button
                    onClick={() => setActiveTab("params")}
                >
                    Params
                </button>

                <button
                    onClick={() => setActiveTab("headers")}
                >
                    Headers
                </button>

                <button
                    onClick={() => setActiveTab("body")}
                >
                    Body
                </button>
            </div>

            {activeTab === "params" && (
                <QueryParamsEditor
                    items={request.params}
                    onChange={(params) =>
                        onChange({
                            ...request,
                            params,
                        })
                    }
                />
            )}

            {activeTab === "headers" && (
                <HeadersEditor
                    items={request.headers}
                    onChange={(headers) =>
                        onChange({
                            ...request,
                            headers,
                        })
                    }
                />
            )}

            {activeTab === "body" && (
                <BodyEditor
                    value={request.body}
                    onChange={(body) =>
                        onChange({
                            ...request,
                            body,
                        })
                    }
                />
            )}

        </div>
    );
}