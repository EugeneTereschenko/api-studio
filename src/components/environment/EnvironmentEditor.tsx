import { useState } from "react";

import { useEnvironmentStore } from "../../store/environmentStore";

import type { Environment } from "../../types/Environment";

type Props = {
    environment: Environment;
};

export default function EnvironmentEditor({
    environment,
}: Props) {

    const updateVariable = useEnvironmentStore(
        (state) => state.updateVariable
    );

    const [key, setKey] = useState("");
    const [value, setValue] = useState("");

    return (
        <div>

            <h2>{environment.name}</h2>

            {environment.variables.map((v) => (
                <div
                    key={v.key}
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: 8,
                    }}
                >
                    <strong>{v.key}</strong>

                    <span>{v.value}</span>
                </div>
            ))}

            <hr />

            <input
                placeholder="Variable name"
                value={key}
                onChange={(e) => setKey(e.target.value)}
            />

            <input
                placeholder="Value"
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />

            <button
                onClick={() => {

                    if (!key.trim()) return;

                    updateVariable(environment.id, {
                        key,
                        value,
                    });

                    setKey("");
                    setValue("");
                }}
            >
                Save Variable
            </button>

        </div>
    );
}