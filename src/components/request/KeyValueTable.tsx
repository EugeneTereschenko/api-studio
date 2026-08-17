import type { KeyValuePair } from "../../types/ApiRequest";

type Props = {
    items: KeyValuePair[];
    onChange: (items: KeyValuePair[]) => void;
};

export default function KeyValueTable({
    items,
    onChange,
}: Props) {

    function updateItem(
        index: number,
        field: "key" | "value",
        value: string
    ) {
        const next = [...items];

        next[index] = {
            ...next[index],
            [field]: value,
        };

        onChange(next);
    }

    function toggleItem(
        index: number,
        enabled: boolean
    ) {
        const next = [...items];

        next[index] = {
            ...next[index],
            enabled,
        };

        onChange(next);
    }

    function addItem() {
        onChange([
            ...items,
            {
                id: crypto.randomUUID(),
                key: "",
                value: "",
                enabled: true,
            },
        ]);
    }

    function removeItem(index: number) {
        onChange(
            items.filter((_, i) => i !== index)
        );
    }

    return (
        <div>
            <table
                style={{
                    width: "100%",
                    borderCollapse: "collapse",
                }}
            >
                <thead>
                    <tr>
                        <th style={{ width: "60px" }}>Use</th>
                        <th>Key</th>
                        <th>Value</th>
                        <th style={{ width: "50px" }}></th>
                    </tr>
                </thead>

                <tbody>
                    {items.map((item, index) => (
                        <tr key={item.id}>

                            <td>
                                <input
                                    type="checkbox"
                                    checked={item.enabled}
                                    onChange={(e) =>
                                        toggleItem(
                                            index,
                                            e.target.checked
                                        )
                                    }
                                />
                            </td>

                            <td>
                                <input
                                    style={{
                                        width: "95%",
                                        padding: "6px",
                                    }}
                                    value={item.key}
                                    placeholder="Key"
                                    onChange={(e) =>
                                        updateItem(
                                            index,
                                            "key",
                                            e.target.value
                                        )
                                    }
                                />
                            </td>

                            <td>
                                <input
                                    style={{
                                        width: "95%",
                                        padding: "6px",
                                    }}
                                    value={item.value}
                                    placeholder="Value"
                                    onChange={(e) =>
                                        updateItem(
                                            index,
                                            "value",
                                            e.target.value
                                        )
                                    }
                                />
                            </td>

                            <td>
                                <button
                                    onClick={() =>
                                        removeItem(index)
                                    }
                                >
                                    ✕
                                </button>
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>

            <button
                style={{
                    marginTop: "10px",
                }}
                onClick={addItem}
            >
                + Add
            </button>
        </div>
    );
}