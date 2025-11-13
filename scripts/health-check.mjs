#!/usr/bin/env node
import https from "https";
import http from "http";

const url =
  process.argv[2] || process.env.HEALTH_URL || "http://localhost:5001/health";
const lib = url.startsWith("https") ? https : http;

const req = lib.get(url, (res) => {
  let data = "";
  res.on("data", (chunk) => (data += chunk));
  res.on("end", () => {
    try {
      const json = JSON.parse(data);
      console.log(JSON.stringify(json, null, 2));
      const ok = json && json.dbState === 1 && json.ping === "ok";
      process.exit(ok ? 0 : 2);
    } catch (e) {
      console.error("Invalid JSON response:", data);
      process.exit(3);
    }
  });
});

req.on("error", (err) => {
  console.error("Request failed:", err.message);
  process.exit(1);
});
