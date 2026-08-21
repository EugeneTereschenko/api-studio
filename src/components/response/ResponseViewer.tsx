import type { ApiResponse } from "../../types/ApiResponse";

import ResponseInfo from "./ResponseInfo";
import ResponseTabs from "./ResponseTabs";

type Props = {
    response: ApiResponse | null;
};

export default function ResponseViewer({ response }: Props) {
    if (!response) {
        return (
            <section className="empty-state">
                <h2>No response yet</h2>
                <p>Send a request to inspect status, headers, and body output.</p>
            </section>
        );
    }

    return (
        <section className="card page">
            <ResponseInfo response={response} />
            <ResponseTabs response={response} />
        </section>
    );
}
