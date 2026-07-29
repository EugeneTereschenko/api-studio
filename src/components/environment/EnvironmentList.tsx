import { useState } from "react";

import { useEnvironmentStore } from "../../store/environmentStore";

export default function EnvironmentList() {

    const environments = useEnvironmentStore(
        (state) => state.environments
    );

    const addEnvironment = useEnvironmentStore(
        (state) => state.addEnvironment
    );

    const deleteEnvironment = useEnvironmentStore(
        (state) => state.deleteEnvironment
    );

    const [name, setName] = useState("");

    return (
        <div>

            <h3>Environments</h3>

            {environments.map((env) => (

                <div
                    key={env.id}
                    style={{
                        display: "flex",
                        gap: "10px",
                        marginBottom: "10px",
                    }}
                >

                    <span style={{ flex: 1 }}>
                        {env.name}
                    </span>

                    <button
                        onClick={() =>
                            deleteEnvironment(env.id)
                        }
                    >
                        Delete
                    </button>

                </div>

            ))}

            <input
                placeholder="Environment name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <button
                onClick={() => {

                    if (!name.trim()) return;

                    addEnvironment(name);

                    setName("");

                    console.log(environments);

                }}
            >
                Add
            </button>

        </div>
    );
}