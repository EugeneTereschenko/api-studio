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
        <article className="card">
            <h2>{collection.name}</h2>

            {collection.requests.length > 0 ? (
                collection.requests.map((request) => (
                    <CollectionItem
                        key={request.id}
                        request={request}
                        onClick={onRequestClick}
                    />
                ))
            ) : (
                <p className="page-subtitle">This collection is empty.</p>
            )}
        </article>
    );
}
