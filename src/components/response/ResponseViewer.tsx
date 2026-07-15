import type { ApiResponse } from "../../types/ApiResponse";

import ResponseInfo from "./ResponseInfo";
import ResponseTabs from "./ResponseTabs";

type Props = {
    response: ApiResponse | null;
};

export default function ResponseViewer({ response }: Props) {
    if (!response) {
        return <p>No response yet.</p>;
    }

    return (
        <>
            <ResponseInfo response={response} />
            <ResponseTabs response={response} />
        </>
    );
}