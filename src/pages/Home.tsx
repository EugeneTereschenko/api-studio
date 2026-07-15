import { useState } from "react";
import axios from "axios";

import RequestBar from "../components/request/RequestBar";
import ResponseViewer from "../components/response/ResponseViewer";

export default function Home() {
  const [response, setResponse] = useState<unknown>(null);

  async function handleSend(method: string, url: string) {
    try {
      const res = await axios({
        method,
        url,
      });

      setResponse(res.data);
    } catch (error) {
      console.error(error);
      setResponse(error);
    }
  }

  return (
    <>
      <RequestBar onSend={handleSend} />

      <ResponseViewer data={response} />
    </>
  );
}