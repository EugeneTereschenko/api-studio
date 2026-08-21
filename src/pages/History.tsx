import { useNavigate } from "react-router-dom";

import { useHistoryStore } from "../store/historyStore";
import { useRequestStore } from "../store/requestStore";

export default function History() {
    const history = useHistoryStore((state) => state.items);
    const setRequest = useRequestStore((state) => state.setRequest);
    const clear = useHistoryStore((state) => state.clear);
    const navigate = useNavigate();

    return (
        <section className="page">
            <div className="page-header">
                <div>
                    <h1 className="page-title">History</h1>
                    <p className="page-subtitle">Jump back into previously sent requests and compare recent responses.</p>
                </div>
                <button type="button" onClick={clear}>Clear History</button>
            </div>

            {history.length === 0 ? (
                <div className="empty-state">No requests have been sent yet.</div>
            ) : (
                <div className="card">
                    {history.map((item) => (
                        <button
                            key={item.id}
                            type="button"
                            onClick={() => {
                                setRequest(item.request);
                                navigate("/");
                            }}
                            style={{
                                alignItems: "center",
                                border: 0,
                                borderBottom: "1px solid var(--border)",
                                borderRadius: 0,
                                display: "flex",
                                justifyContent: "space-between",
                                width: "100%",
                            }}
                        >
                            <span><span className="method-pill">{item.request.method}</span> {item.request.url}</span>
                            <span className="status-ok">{item.response.status}</span>
                        </button>
                    ))}
                </div>
            )}
        </section>
    );
}
