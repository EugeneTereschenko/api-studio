import { useState } from "react";

type Props = {
  onSend: (method: string, url: string) => void;
};

export default function RequestBar({ onSend }: Props) {
  const [method, setMethod] = useState("GET");
  const [url, setUrl] = useState(
    "https://jsonplaceholder.typicode.com/users"
  );

  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        marginBottom: "20px",
      }}
    >
      <select
        value={method}
        onChange={(e) => setMethod(e.target.value)}
      >
        <option>GET</option>
        <option>POST</option>
        <option>PUT</option>
        <option>PATCH</option>
        <option>DELETE</option>
      </select>

      <input
        style={{ flex: 1 }}
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />

      <button onClick={() => onSend(method, url)}>
        Send
      </button>
    </div>
  );
}