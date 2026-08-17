import MethodSelect from "./MethodSelect";
import UrlInput from "./UrlInput";
import SendButton from "./SendButton";
import RequestTabs from "./RequestTabs";

import type { ApiRequest } from "../../types/ApiRequest";

type Props = {
    request: ApiRequest;
    onChange: (request: ApiRequest) => void;
    onSend: (request: ApiRequest) => void;
    onSave: () => void;
};

export default function RequestBar({
    request,
    onChange,
    onSend,
    onSave,
}: Props) {
    return (
        <>
            <div
                style={{
                    display: "flex",
                    gap: 10,
                    marginBottom: 15,
                    alignItems: "center",
                }}
            >
                <MethodSelect
                    value={request.method}
                    onChange={(method) =>
                        onChange({
                            ...request,
                            method,
                        })
                    }
                />

                <UrlInput
                    value={request.url}
                    onChange={(url) =>
                        onChange({
                            ...request,
                            url,
                        })
                    }
                />

                <SendButton onClick={() => onSend(request)} />

                <button onClick={onSave}>Save</button>
            </div>

            <RequestTabs
                request={request}
                onChange={onChange}
            />
        </>
    );
}