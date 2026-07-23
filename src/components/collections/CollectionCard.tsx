import CollectionItem from "./CollectionItem";

import type { Collection } from "../../types/Collection";
import type { SavedRequest } from "../../types/SavedRequest";

type Props = {
    collection: Collection;
    onRequestClick: (request: SavedRequest) => void;
};

export default function CollectionCard({
    collection,
    onRequestClick,
}: Props) {
    return (
        <div
            style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                marginBottom: "20px",
                padding: "10px",
            }}
        >
            <h3>{collection.name}</h3>

            {collection.requests.map((request) => (
                <CollectionItem
                    key={request.id}
                    request={request}
                    onClick={onRequestClick}
                />
            ))}
        </div>
    );
}