import { useMemo, useState } from "react";

import { useMockServerStore } from "../store/mockServerStore";
import type { HttpMethod } from "../types/HttpMethod";
import type { MockEndpoint } from "../types/MockEndpoint";

const methods: HttpMethod[] = [
    "GET",
    "POST",
    "PUT",
    "PATCH",
    "DELETE",
    "HEAD",
    "OPTIONS",
];

const emptyForm = {
    method: "GET" as HttpMethod,
    path: "/users",
    status: 200,
    delay: 0,
    headers: '{\n  "Content-Type": "application/json"\n}',
    body: '{\n  "message": "Hello from API Studio"\n}',
};

function normalizePath(path: string) {
    const trimmed = path.trim();

    if (!trimmed) {
        return "/";
    }

    return trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
}

function formatDate(value: string) {
    return new Intl.DateTimeFormat(undefined, {
        dateStyle: "medium",
        timeStyle: "short",
    }).format(new Date(value));
}

function previewEndpoint(endpoint: MockEndpoint) {
    return `HTTP/1.1 ${endpoint.status}\n${endpoint.headers}\n\n${endpoint.body}`;
}

export default function MockServer() {
    const endpoints = useMockServerStore((state) => state.endpoints);
    const addEndpoint = useMockServerStore((state) => state.addEndpoint);
    const updateEndpoint = useMockServerStore((state) => state.updateEndpoint);
    const deleteEndpoint = useMockServerStore((state) => state.deleteEndpoint);
    const clearEndpoints = useMockServerStore((state) => state.clearEndpoints);

    const [form, setForm] = useState(emptyForm);
    const [editingId, setEditingId] = useState<string | null>(null);

    const sortedEndpoints = useMemo(
        () =>
            [...endpoints].sort((a, b) =>
                a.path.localeCompare(b.path) ||
                a.method.localeCompare(b.method)
            ),
        [endpoints]
    );

    const editingEndpoint = endpoints.find(
        (endpoint) => endpoint.id === editingId
    );

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const endpoint = {
            ...form,
            path: normalizePath(form.path),
            status: Number(form.status),
            delay: Math.max(0, Number(form.delay)),
        };

        if (editingId) {
            updateEndpoint(editingId, endpoint);
        } else {
            addEndpoint(endpoint);
        }

        setForm(emptyForm);
        setEditingId(null);
    }

    function startEditing(endpoint: MockEndpoint) {
        setEditingId(endpoint.id);
        setForm({
            method: endpoint.method,
            path: endpoint.path,
            status: endpoint.status,
            delay: endpoint.delay,
            headers: endpoint.headers,
            body: endpoint.body,
        });
    }

    return (
        <section style={{ display: "grid", gap: "24px" }}>
            <div>
                <h1>Mock Server</h1>
                <p>
                    Define mock API endpoints for local planning, demos, and
                    contract reviews before your backend is available.
                </p>
            </div>

            <form
                onSubmit={handleSubmit}
                style={{
                    display: "grid",
                    gap: "12px",
                    padding: "16px",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                }}
            >
                <h2>{editingId ? "Edit endpoint" : "New endpoint"}</h2>

                <label>
                    Method
                    <select
                        value={form.method}
                        onChange={(event) =>
                            setForm({
                                ...form,
                                method: event.target.value as HttpMethod,
                            })
                        }
                    >
                        {methods.map((method) => (
                            <option key={method} value={method}>
                                {method}
                            </option>
                        ))}
                    </select>
                </label>

                <label>
                    Path
                    <input
                        value={form.path}
                        placeholder="/users/:id"
                        onChange={(event) =>
                            setForm({ ...form, path: event.target.value })
                        }
                    />
                </label>

                <label>
                    Status
                    <input
                        type="number"
                        min="100"
                        max="599"
                        value={form.status}
                        onChange={(event) =>
                            setForm({
                                ...form,
                                status: Number(event.target.value),
                            })
                        }
                    />
                </label>

                <label>
                    Delay (ms)
                    <input
                        type="number"
                        min="0"
                        step="100"
                        value={form.delay}
                        onChange={(event) =>
                            setForm({
                                ...form,
                                delay: Number(event.target.value),
                            })
                        }
                    />
                </label>

                <label>
                    Response headers
                    <textarea
                        rows={4}
                        value={form.headers}
                        onChange={(event) =>
                            setForm({ ...form, headers: event.target.value })
                        }
                    />
                </label>

                <label>
                    Response body
                    <textarea
                        rows={8}
                        value={form.body}
                        onChange={(event) =>
                            setForm({ ...form, body: event.target.value })
                        }
                    />
                </label>

                <div style={{ display: "flex", gap: "8px" }}>
                    <button type="submit">
                        {editingId ? "Save endpoint" : "Add endpoint"}
                    </button>
                    {editingId && (
                        <button
                            type="button"
                            onClick={() => {
                                setEditingId(null);
                                setForm(emptyForm);
                            }}
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>

            <div>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <h2>Endpoints</h2>
                    <button
                        type="button"
                        disabled={endpoints.length === 0}
                        onClick={clearEndpoints}
                    >
                        Clear all
                    </button>
                </div>

                {sortedEndpoints.length === 0 ? (
                    <p>No mock endpoints yet.</p>
                ) : (
                    sortedEndpoints.map((endpoint) => (
                        <article
                            key={endpoint.id}
                            style={{
                                display: "grid",
                                gap: "8px",
                                padding: "16px",
                                border: "1px solid #ddd",
                                borderRadius: "8px",
                                marginBottom: "12px",
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    gap: "12px",
                                }}
                            >
                                <strong>
                                    {endpoint.method} {endpoint.path}
                                </strong>
                                <span>
                                    {endpoint.status} · {endpoint.delay}ms
                                </span>
                            </div>

                            <small>Created {formatDate(endpoint.createdAt)}</small>

                            <pre style={{ whiteSpace: "pre-wrap" }}>
                                {previewEndpoint(endpoint)}
                            </pre>

                            <div style={{ display: "flex", gap: "8px" }}>
                                <button
                                    type="button"
                                    onClick={() => startEditing(endpoint)}
                                >
                                    Edit
                                </button>
                                <button
                                    type="button"
                                    onClick={() => deleteEndpoint(endpoint.id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </article>
                    ))
                )}
            </div>

            {editingEndpoint && (
                <p>
                    Editing {editingEndpoint.method} {editingEndpoint.path}
                </p>
            )}
        </section>
    );
}
