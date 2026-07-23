import { useCollectionStore } from "../store/collectionStore";

export default function Collections() {
    const collections = useCollectionStore((state) => state.collections);

    return (
        <>
            <h2>Collections</h2>

            <pre>
                {JSON.stringify(collections, null, 2)}
            </pre>
        </>
    );
}