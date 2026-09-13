import http from "k6/http";
import { check } from "k6";

export const options = {
  scenarios: {
    tier2_sustained: {
      executor: "constant-vus",
      vus: 50,
      duration: "2m",
    },
  },
  thresholds: {
    http_req_failed: [{ threshold: "rate<0.25", abortOnFail: true }],
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