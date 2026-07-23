import { useState } from "react";

import type { ApiRequest } from "../../types/ApiRequest";

type Props = {
  request: ApiRequest;
  onRequestChange: (request: ApiRequest) => void;
  onSend: (request: ApiRequest) => void;
};

export default function RequestBar({
  request,
  onRequestChange,
  onSend,
}: Props) {

  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        marginBottom: "20px",
      }}
    >
      <select
        value={request.method}
        onChange={(e) =>
          onRequestChange({
            ...request,
            url: e.target.value,
          })
        }
      >
        <option>GET</option>
        <option>POST</option>
        <option>PUT</option>
        <option>PATCH</option>
        <option>DELETE</option>
      </select>

      <input
        style={{ flex: 1 }}
        value={request.url}
        onChange={(e) =>
          onRequestChange({
            ...request,
            method: e.target.value as ApiRequest["method"],
          })
        }
      />

      <button onClick={() => onSend(request)}>
        Send
      </button>
    </div>
  );
}