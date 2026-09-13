import http from "k6/http";

export const options = {
  vus: 1,
  iterations: 1,
};

export default function () {
  const res = http.get("https://bizer.app/sitemap-directory.xml?cs=" + Date.now());
  console.log("STATUS: " + res.status);
  console.log("DURATION: " + res.timings.duration + "ms");
}