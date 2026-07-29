import EnvironmentSelector from "../components/environment/EnvironmentSelector";
import EnvironmentList from "../components/environment/EnvironmentList";
import EnvironmentEditor from "../components/environment/EnvironmentEditor";
import { useEnvironmentStore } from "../store/environmentStore";

export default function Settings() {
    const environments = useEnvironmentStore(
        (state) => state.environments
    );

    const activeEnvironmentId = useEnvironmentStore(
        (state) => state.activeEnvironmentId
    );

    const activeEnvironment = environments.find(
        (e) => e.id === activeEnvironmentId
    );

    return (
        <div style={{ padding: "20px" }}>
            <h1>Settings</h1>

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