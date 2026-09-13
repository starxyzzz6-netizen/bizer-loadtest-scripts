import http from "k6/http";
import { check } from "k6";

export const options = {
  scenarios: {
    tier4_model: {
      executor: "shared-iterations",
      vus: 5,
      iterations: 30,
      maxDuration: "3m",
    },
  },
  thresholds: {
    http_req_failed: [{ threshold: "rate<0.25", abortOnFail: true, delayAbortEval: "1m" }],
  },
};

const URL = "https://us-central1-bizer-app-a9d8b.cloudfunctions.net/bizerSearchStream";

export default function () {
  const query = `loadtest query ${__VU}-${__ITER}-${Date.now()}`;
  const sessionId = `loadtest-${__VU}-${Date.now()}`;
  const res = http.post(
    URL,
    JSON.stringify({ query, sessionId }),
    { headers: { "Content-Type": "application/json" }, timeout: "30s" }
  );
  check(res, { "status 200": (r) => r.status === 200 });
}