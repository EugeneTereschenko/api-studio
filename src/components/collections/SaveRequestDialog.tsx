import { useState } from "react";

type Props = {
    open: boolean;
    collections: string[];

    onCancel: () => void;

    onSave: (data: {
        requestName: string;
        collectionName: string;
        createNew: boolean;
    }) => void;
};

export default function SaveRequestDialog({
    open,
    collections,
    onCancel,
    onSave,
}: Props) {

    const [requestName, setRequestName] = useState("");

    const [createNew, setCreateNew] = useState(false);

    const [collectionName, setCollectionName] = useState(
        collections[0] ?? ""
    );

    if (!open) return null;

    return (
        <div
            style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,.5)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <div
                style={{
                    background: "white",
                    padding: 20,
                    width: 420,
                    borderRadius: 8,
                }}
            >
                <h2>Save Request</h2>

                <p>Request name</p>

                <input
                    value={requestName}
                    onChange={(e)=>setRequestName(e.target.value)}
                    style={{width:"100%"}}
                />

                <br />
                <br />

                <label>

                    <input
                        type="radio"
                        checked={!createNew}
                        onChange={()=>setCreateNew(false)}
                    />

                    Existing Collection

                </label>

                <br />

                <select
                    disabled={createNew}
                    value={collectionName}
                    onChange={(e)=>setCollectionName(e.target.value)}
                    style={{width:"100%"}}
                >

                    {collections.map(c=>(
                        <option
                            key={c}
                            value={c}
                        >
                            {c}
                        </option>
                    ))}

                </select>

                <br />
                <br />

                <label>

                    <input
                        type="radio"
                        checked={createNew}
                        onChange={()=>setCreateNew(true)}
                    />

                    New Collection

                </label>

                <br />

                <input
                    disabled={!createNew}
                    value={collectionName}
                    onChange={(e)=>setCollectionName(e.target.value)}
                    style={{width:"100%"}}
                />

                <br />
                <br />

                <button onClick={onCancel}>
                    Cancel
                </button>

                {" "}

                <button
                    onClick={()=>
                        onSave({
                            requestName,
                            collectionName,
                            createNew,
                        })
                    }
                >
                    Save
                </button>

            </div>

        </div>
    );
}