import type { SavedRequest } from "../../types/SavedRequest";

type Props = {
    request: SavedRequest;
    onClick: (request: SavedRequest) => void;
};

export default function CollectionItem({ request, onClick }: Props) {
    return (
        <button
            type="button"
            onClick={() => onClick(request)}
            style={{
                alignItems: "center",
                border: 0,
                borderTop: "1px solid var(--border)",
                borderRadius: 0,
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
            }}
        >
            <strong>{request.name}</strong>
            <span className="method-pill">{request.request.method}</span>
        </button>
    );
}
