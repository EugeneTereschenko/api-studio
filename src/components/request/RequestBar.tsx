import MethodSelect from "./MethodSelect";
import UrlInput from "./UrlInput";
import SendButton from "./SendButton.tsx";

import type { ApiRequest } from "../../types/ApiRequest";

type Props = {
    request: ApiRequest;
    onRequestChange: (request: ApiRequest) => void;
    onSend: (request: ApiRequest) => void;
    onSave: () => void;
};

export default function RequestBar({
    request,
    onRequestChange,
    onSend,
    onSave,
}: Props) {
    return (
        <div
            style={{
                display: "flex",
                gap: 10,
                marginBottom: 20,
            }}
        >
            <MethodSelect
                value={request.method}
                onChange={(method) =>
                    onRequestChange({
                        ...request,
                        method,
                    })
                }
            />

            <UrlInput
                value={request.url}
                onChange={(url) =>
                    onRequestChange({
                        ...request,
                        url,
                    })
                }
            />

            <SendButton
                onClick={() => onSend(request)}
            />

            <button onClick={onSave}>
                Save
            </button>
        </div>
    );
}