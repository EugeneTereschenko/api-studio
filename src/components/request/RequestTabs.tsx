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
    const [tab, setTab] = useState<Tab>("params");

    return (
        <div style={{ marginTop: 20 }}>
            <div
                style={{
                    display: "flex",
                    gap: 10,
                    marginBottom: 15,
                }}
            >
                <button onClick={() => setTab("params")}>
                    Params
                </button>

                <button onClick={() => setTab("headers")}>
                    Headers
                </button>

                <button onClick={() => setTab("body")}>
                    Body
                </button>
            </div>

            {tab === "params" && (
                <QueryParamsEditor
                    value={request.params}
                    onChange={(params) =>
                        onChange({
                            ...request,
                            params,
                        })
                    }
                />
            )}

            {tab === "headers" && (
                <HeadersEditor
                    value={request.headers}
                    onChange={(headers) =>
                        onChange({
                            ...request,
                            headers,
                        })
                    }
                />
            )}

            {tab === "body" && (
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