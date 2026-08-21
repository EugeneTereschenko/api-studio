import type { ApiResponse } from "../../types/ApiResponse";

type Props = {
    response: ApiResponse | null;
};

export default function ResponseInfo({ response }: Props) {
    return (
        <div className="grid-two">
            <div className="card card-muted">
                <strong>Status</strong>
                <br />
                <span className="status-ok">
                    {response?.status} {response?.statusText}
                </span>
            </div>
            <div className="card card-muted">
                <strong>Time</strong>
                <br />
                {response?.duration.toFixed(2)} ms
            </div>
            <div className="card card-muted">
                <strong>Size</strong>
                <br />
                {response?.size} bytes
            </div>
        </div>
    );
}
