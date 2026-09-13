import http from "k6/http";

export const options = {
  vus: 1,
  iterations: 1,
};

export default function () {
  const res = http.get("https://bizer.app/biz/la/southern-farms-specialty-meats");
  console.log("STATUS: " + res.status);
  console.log("DURATION: " + res.timings.duration + "ms");
}