import { useRef, useState } from "react";

import EnvironmentSelector from "../components/environment/EnvironmentSelector";
import EnvironmentList from "../components/environment/EnvironmentList";
import EnvironmentEditor from "../components/environment/EnvironmentEditor";
import { useEnvironmentStore } from "../store/environmentStore";
import { useCollectionStore } from "../store/collectionStore";
import {
    createWorkspaceExport,
    downloadJsonFile,
    parseWorkspaceImport,
    serializeWorkspaceExport,
} from "../services/importExportService";

export default function Settings() {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [importMessage, setImportMessage] = useState<string | null>(null);

    const environments = useEnvironmentStore(
        (state) => state.environments
    );

    const activeEnvironmentId = useEnvironmentStore(
        (state) => state.activeEnvironmentId
    );

    const replaceEnvironments = useEnvironmentStore(
        (state) => state.replaceEnvironments
    );

    const collections = useCollectionStore(
        (state) => state.collections
    );

    const replaceCollections = useCollectionStore(
        (state) => state.replaceCollections
    );

    const activeEnvironment = environments.find(
        (e) => e.id === activeEnvironmentId
    );

    function handleExport() {
        const workspaceExport = createWorkspaceExport({
            collections,
            environments,
            activeEnvironmentId,
        });

        downloadJsonFile(
            `api-studio-export-${workspaceExport.exportedAt.slice(0, 10)}.json`,
            serializeWorkspaceExport(workspaceExport)
        );

        setImportMessage("Workspace export downloaded.");
    }

    async function handleImport(file: File) {
        try {
            const workspaceImport = parseWorkspaceImport(
                await file.text()
            );

            replaceCollections(workspaceImport.collections);
            replaceEnvironments(
                workspaceImport.environments,
                workspaceImport.activeEnvironmentId
            );
            setImportMessage("Workspace import completed.");
        } catch (error) {
            setImportMessage(
                error instanceof Error
                    ? error.message
                    : "Unable to import workspace."
            );
        } finally {
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        }
    }

    return (
        <div style={{ padding: "20px" }}>
            <h1>Settings</h1>

            <section>
                <h2>Import / Export</h2>
                <p>
                    Export your collections and environments to a JSON
                    file, or import a previously exported workspace.
                </p>

                <button type="button" onClick={handleExport}>
                    Export workspace
                </button>

                <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    style={{ marginLeft: "8px" }}
                >
                    Import workspace
                </button>

                <input
                    ref={fileInputRef}
                    type="file"
                    accept="application/json,.json"
                    style={{ display: "none" }}
                    onChange={(event) => {
                        const file = event.target.files?.[0];

                        if (file) {
                            void handleImport(file);
                        }
                    }}
                />

                {importMessage ? <p>{importMessage}</p> : null}
            </section>

            <hr />

            <EnvironmentSelector />

            <EnvironmentList />

            <hr />

            {activeEnvironment ? (
                <EnvironmentEditor
                    environment={activeEnvironment}
                />
            ) : (
                <p>Select an environment.</p>
            )}
        </div>
    );
}
