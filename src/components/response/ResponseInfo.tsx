import type { ApiResponse } from "../../types/ApiResponse";

type Props = {
    response: ApiResponse | null;
}

export default function ResponseInfo({ response }: Props) {
    return (
        <div
            style = {{
                display: "flex",
                gap: "20px",
                marginBottom: "1rem",
                padding: "0.75rem",
                border: "1px solid #ddd",
                borderRadius: "8px",
            }}
        >
            <div>
                <strong>Status</strong>
                <br />
                {response?.status} {response?.statusText}
            </div>
            <div>
                <strong>Time</strong>
                <br />
                {response?.duration.toFixed(2)} ms
            </div>
            <div>
                <strong>Size</strong>
                <br />
                {response?.size} bytes
            </div>
        </div>
    );
}