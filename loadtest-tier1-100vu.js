import http from "k6/http";
import { check } from "k6";

export const options = {
  scenarios: {
    fixed_burst: {
      executor: "shared-iterations",
      vus: 100,
      iterations: 3000,
      maxDuration: "5m",
    },
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
}