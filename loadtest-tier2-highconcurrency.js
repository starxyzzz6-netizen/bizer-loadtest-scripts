import http from "k6/http";
import { check } from "k6";

export const options = {
  scenarios: {
    tier2_high: {
      executor: "ramping-vus",
      startVUs: 0,
      stages: [
        { duration: "1m", target: 100 },
        { duration: "2m", target: 250 },
        { duration: "1m", target: 0 },
      ],
    },
  },
  thresholds: {
    http_req_failed: [{ threshold: "rate<0.25", abortOnFail: true, delayAbortEval: "1m" }],
  },
};

const targets = [
  "https://bizer.app/biz/la/southern-farms-specialty-meats",
  "https://bizer.app/biz/la/southern-farms-specialty-meats.md",
  "https://bizer.app/sitemap-directory.xml",
  "https://bizer.app/sitemap-sites.xml",
];

export default function () {
  const url = targets[Math.floor(Math.random() * targets.length)];
  const res = http.get(url);
  check(res, { "status 200": (r) => r.status === 200 });
}