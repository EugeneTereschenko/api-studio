import { useNavigate } from "react-router-dom";

import CollectionList from "../components/collections/CollectionList";
import { useCollectionStore } from "../store/collectionStore";
import { useRequestStore } from "../store/requestStore";
import type { SavedRequest } from "../types/SavedRequest";

export default function Collections() {
    const collections = useCollectionStore((state) => state.collections);
    const setRequest = useRequestStore((state) => state.setRequest);
    const navigate = useNavigate();

    function handleRequestClick(savedRequest: SavedRequest) {
        setRequest(savedRequest.request);
        navigate("/");
    }

    return (
        <section className="page">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Collections</h1>
                    <p className="page-subtitle">
                        Reopen saved requests from your workspace collections.
                    </p>
                </div>
            </div>

            {collections.length > 0 ? (
                <CollectionList onRequestClick={handleRequestClick} />
            ) : (
                <div className="empty-state">
                    <h2>No collections yet</h2>
                    <p>Save a request from the workspace to build your first collection.</p>
                </div>
            )}
        </section>
    );
}
