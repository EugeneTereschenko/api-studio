import MethodSelect from "./MethodSelect";
import UrlInput from "./UrlInput";
import SendButton from "./SendButton";
import RequestTabs from "./RequestTabs";

import type { ApiRequest } from "../../types/ApiRequest";

type Props = {
    request: ApiRequest;
    onRequestChange: (request: ApiRequest) => void;
    onSend: (request: ApiRequest) => void;
    onSave: () => void;
    loading: boolean;
};

export default function RequestBar({
    request,
    onRequestChange,
    onSend,
    onSave,
    loading,
}: Props) {
    return (
        <section className="card page">
            <div className="toolbar">
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

                <SendButton onClick={() => onSend(request)} loading={loading} />

                <button type="button" onClick={onSave}>Save</button>
            </div>

            <RequestTabs
                request={request}
                onChange={onRequestChange}
            />
        </section>
    );
}