import { useHistoryStore } from "../store/historyStore";
import { useNavigate } from "react-router-dom";
import { useRequestStore } from "../store/requestStore";

export default function History() {
    const history = useHistoryStore((state) => state.items);
    const setRequest = useRequestStore((state) => state.setRequest);
    const clear = useHistoryStore((state) => state.clear);
    const navigate = useNavigate();

    return (
        <>
            <h2>History</h2>

            <button
                onClick={(e) => {
                    e.stopPropagation();
                    clear();
                }}
            >
                Clear History
            </button>

            {history.map((item) => (
                <div
                    key={item.id}
                    onClick={() => {
                        setRequest(item.request);
                        navigate("/");
                    }}
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "10px",
                        borderBottom: "1px solid #ddd",
                        cursor: "pointer",
                    }}
                >
                    <span>
                        <strong>{item.request.method}</strong> {item.request.url}
                    </span>

                    <span>
                        {item.response.status}
                    </span>
                </div>
            ))}
        </>
    );
}