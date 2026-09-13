import http from "k6/http";
import { check } from "k6";

export const options = {
  scenarios: {
    ceiling_test: {
      executor: "ramping-arrival-rate",
      startRate: 5,
      timeUnit: "1s",
      preAllocatedVUs: 200,
      maxVUs: 200,
      stages: [
        { target: 100, duration: "4m" },
      ],
    },
  },
};

export default function () {
  const url = `https://bizer.app/sitemap-directory.xml?lt=${__VU}-${__ITER}`;
  const res = http.get(url);
  check(res, { "status 200": (r) => r.status === 200 });
}