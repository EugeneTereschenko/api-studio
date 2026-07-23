import { useState } from "react";

type Props = {
    open: boolean;
    onSave: (name: string) => void;
    onCancel: () => void;
};

export default function SaveRequestDialog({
    open,
    onSave,
    onCancel,
}: Props) {
    const [name, setName] = useState("");

    if (!open) {
        return null;
    }

    return (
        <div
            style={{
                border: "1px solid #ccc",
                padding: "20px",
                borderRadius: "8px",
                background: "white",
            }}
        >
            <h3>Save Request</h3>

            <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Request name"
            />

            <div style={{ marginTop: "10px" }}>
                <button onClick={() => onSave(name)}>
                    Save
                </button>

                <button onClick={onCancel}>
                    Cancel
                </button>
            </div>
        </div>
    );
}