import type {
    EnvironmentVariable,
} from "../../types/Environment";

type Props = {
    variable: EnvironmentVariable;

    onChange: (
        variable: EnvironmentVariable
    ) => void;
};

export default function VariableRow({
    variable,
    onChange,
}: Props) {

    return (
        <div
            style={{
                display: "flex",
                gap: "10px",
                marginBottom: "10px",
            }}
        >
            <input
                placeholder="Key"
                value={variable.key}
                onChange={(e) =>
                    onChange({
                        ...variable,
                        key: e.target.value,
                    })
                }
            />

            <input
                placeholder="Value"
                value={variable.value}
                onChange={(e) =>
                    onChange({
                        ...variable,
                        value: e.target.value,
                    })
                }
            />
        </div>
    );
}