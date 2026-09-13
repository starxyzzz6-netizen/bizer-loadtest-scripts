import http from "k6/http";
import { check } from "k6";

export const options = {
  scenarios: {
    tier3_10vu: {
      executor: "shared-iterations",
      vus: 10,
      iterations: 20,
      maxDuration: "5m",
    },
  },
  thresholds: {
    http_req_failed: [{ threshold: "rate<0.25", abortOnFail: true, delayAbortEval: "1m" }],
  },
};

const URL = "https://us-central1-bizer-app-a9d8b.cloudfunctions.net/askMilesPublic";

export default function () {
  const sessionId = `loadtest-${__VU}-${Date.now()}`;
  const res = http.post(
    URL,
    JSON.stringify({ data: { message: "What does Bizer do?", history: [], sessionId } }),
    { headers: { "Content-Type": "application/json" }, timeout: "60s" }
  );
  check(res, {
    "status 200": (r) => r.status === 200,
    "has text": (r) => !!r.json("result.text"),
  });
}