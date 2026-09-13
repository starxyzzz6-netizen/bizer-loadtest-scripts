import http from "k6/http";
import { check } from "k6";

export const options = {
  scenarios: {
    tier2_burst: {
      executor: "ramping-vus",
      startVUs: 0,
      stages: [
        { duration: "30s", target: 10 },
        { duration: "1m", target: 30 },
        { duration: "30s", target: 0 },
      ],
    },
  },
  thresholds: {
    http_req_failed: ["rate<0.25"],
    http_req_duration: ["p(95)<10000"],
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