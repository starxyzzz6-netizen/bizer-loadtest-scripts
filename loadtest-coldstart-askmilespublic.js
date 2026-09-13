import http from "k6/http";

export const options = {
  vus: 1,
  iterations: 1,
};

export default function () {
  const sessionId = `coldstart-${Date.now()}`;
  const res = http.post(
    "https://us-central1-bizer-app-a9d8b.cloudfunctions.net/askMilesPublic",
    JSON.stringify({ data: { message: "What does Bizer do?", history: [], sessionId } }),
    { headers: { "Content-Type": "application/json" }, timeout: "60s" }
  );
  console.log("STATUS: " + res.status);
  console.log("DURATION: " + res.timings.duration + "ms");
}