import CollectionCard from "./CollectionCard";

import { useCollectionStore } from "../../store/collectionStore";

import type { SavedRequest } from "../../types/SavedRequest";

type Props = {
    onRequestClick: (request: SavedRequest) => void;
};

export default function CollectionList({
    onRequestClick,
}: Props) {
    const collections = useCollectionStore(
        (state) => state.collections
    );

    return (
        <>
            {collections.map((collection) => (
                <CollectionCard
                    key={collection.id}
                    collection={collection}
                    onRequestClick={onRequestClick}
                />
            ))}
        </>
    );
}