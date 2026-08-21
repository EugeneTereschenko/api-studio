import type { Collection } from "../types/Collection";
import type { Environment } from "../types/Environment";

export interface WorkspaceExport {
    version: 1;
    exportedAt: string;
    collections: Collection[];
    environments: Environment[];
    activeEnvironmentId: string | null;
}

export function createWorkspaceExport(data: Omit<WorkspaceExport, "version" | "exportedAt">): WorkspaceExport {
    return {
        version: 1,
        exportedAt: new Date().toISOString(),
        ...data,
    };
}

export function serializeWorkspaceExport(data: WorkspaceExport): string {
    return JSON.stringify(data, null, 2);
}

export function parseWorkspaceImport(contents: string): WorkspaceExport {
    const parsed = JSON.parse(contents) as Partial<WorkspaceExport>;

    if (parsed.version !== 1) {
        throw new Error("Unsupported import file version.");
    }

    if (!Array.isArray(parsed.collections)) {
        throw new Error("Import file is missing collections.");
    }

    if (!Array.isArray(parsed.environments)) {
        throw new Error("Import file is missing environments.");
    }

    return {
        version: 1,
        exportedAt: typeof parsed.exportedAt === "string"
            ? parsed.exportedAt
            : new Date().toISOString(),
        collections: parsed.collections,
        environments: parsed.environments,
        activeEnvironmentId: typeof parsed.activeEnvironmentId === "string"
            ? parsed.activeEnvironmentId
            : null,
    };
}

export function downloadJsonFile(filename: string, contents: string) {
    const blob = new Blob([contents], {
        type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = filename;
    link.click();

    URL.revokeObjectURL(url);
}
