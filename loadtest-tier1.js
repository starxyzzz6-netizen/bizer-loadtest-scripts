import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  scenarios: {
    baseline: { executor: "ramping-vus", startVUs: 0, stages: [
      { duration: "30s", target: 5 },
      { duration: "1m", target: 20 },
      { duration: "30s", target: 0 },
    ]},
  },
  thresholds: {
    http_req_failed: ["rate<0.05"],
    http_req_duration: ["p(95)<3000"],
  },
};

const targets = [
  "https://bizer.app/",
  "https://bizer.app/app-market",
  "https://bizer.app/support",
];

export default function () {
  const url = targets[Math.floor(Math.random() * targets.length)];
  const res = http.get(url);
  check(res, { "status 200": (r) => r.status === 200 });
  sleep(1);
}