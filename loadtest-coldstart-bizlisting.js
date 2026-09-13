import http from "k6/http";

export const options = {
  vus: 1,
  iterations: 1,
};

// Change this URL between runs to test each endpoint
const URL = "https://bizer.app/biz/la/southern-farms-specialty-meats?cs=" + Date.now();

export default function () {
  const res = http.get(URL);
  console.log("STATUS: " + res.status);
  console.log("DURATION: " + res.timings.duration + "ms");
}