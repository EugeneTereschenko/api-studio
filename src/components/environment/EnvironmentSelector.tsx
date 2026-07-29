import { useEnvironmentStore } from "../../store/environmentStore";

export default function EnvironmentSelector() {
    const environments = useEnvironmentStore(
        (state) => state.environments
    );

    const activeEnvironmentId = useEnvironmentStore(
        (state) => state.activeEnvironmentId
    );

    const setActive = useEnvironmentStore(
        (state) => state.setActive
    );

    return (
        <div style={{ marginBottom: "20px" }}>
            <label>Active Environment </label>

            <select
                value={activeEnvironmentId ?? ""}
                onChange={(e) => setActive(e.target.value)}
            >
                <option value="">
                    None
                </option>

                {environments.map((env) => (
                    <option
                        key={env.id}
                        value={env.id}
                    >
                        {env.name}
                    </option>
                ))}
            </select>
        </div>
    );
}