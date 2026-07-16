import { useHistoryStore } from "../store/historyStore";

export default function History() {
    const history = useHistoryStore((state) => state.items);

    return (
        <>
            <h2>History</h2>

            {history.map((item) => (
                <div
                    key={item.id}
                    style={{
                        padding: "10px",
                        borderBottom: "1px solid #ddd",
                    }}
                >
                    <strong>{item.request.method}</strong>

                    {" "}

                    {item.request.url}

                    {" "}

                    ({item.response.status})
                </div>
            ))}
        </>
    );
}