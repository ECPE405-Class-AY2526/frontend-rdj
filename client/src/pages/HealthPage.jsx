import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "../config.js";

const HealthPage = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/health`);
        const json = await res.json();
        setData(json);
      } catch (e) {
        setError("Failed to fetch health status");
      }
    };
    load();
  }, []);

  return (
    <div style={{ padding: 24 }}>
      <h1>Health</h1>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <pre style={{ background: "#f5f5f5", padding: 16 }}>
        {JSON.stringify(data, null, 2)}
      </pre>
      <p>dbState: 0=disconnected, 1=connected, 2=connecting, 3=disconnecting</p>
    </div>
  );
};

export default HealthPage;
