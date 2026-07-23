import type { SavedRequest } from "../../types/SavedRequest";

type Props = {
    request: SavedRequest;
    onClick: (request: SavedRequest) => void;
};

export default function CollectionItem({ request, onClick }: Props) {
    return (
        <div
            onClick={() => onClick(request)}
            style={{
                padding: "10px",
                borderBottom: "1px solid #ddd",
                cursor: "pointer",
            }}
        >
            <strong>{request.name}</strong>
            <span style={{ marginLeft: "10px", color: "#888" }}>
                ({request.request.method})
            </span>
        </div>
    );
}