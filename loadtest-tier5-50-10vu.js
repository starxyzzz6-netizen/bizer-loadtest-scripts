import http from "k6/http";
import { check } from "k6";

export const options = {
  scenarios: {
    tier5_10vu: {
      executor: "shared-iterations",
      vus: 10,
      iterations: 50,
      maxDuration: "5m",
    },
  },
  thresholds: {
    http_req_failed: [{ threshold: "rate<0.25", abortOnFail: true, delayAbortEval: "1m" }],
  },
};

const URL = "https://us-central1-bizer-app-a9d8b.cloudfunctions.net/askMiles";
const ID_TOKEN = "<FIREBASE_ID_TOKEN>"; // fetch a fresh token from bizer.app (DevTools > Application > IndexedDB > firebaseLocalStorageDb > stsTokenManager.accessToken); expires ~1hr
const BUSINESS_ID = "biz-kICtB8q5S8aC";

export default function () {
  const threadId = `loadtest-10vu-${__VU}-${__ITER}`;
  const res = http.post(
    URL,
    JSON.stringify({
      data: {
        businessId: BUSINESS_ID,
        threadId,
        message: "What should I focus on this week?",
      },
    }),
    {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${ID_TOKEN}`,
      },
      timeout: "60s",
    }
  );
  check(res, {
    "status 200": (r) => r.status === 200,
    "has real answer, not apology": (r) => {
      if (r.status !== 200) return false;
      try {
        const text = r.json("result.text") || "";
        const lower = text.toLowerCase();
        const apologyPhrases = ["i don't know", "i'm not sure", "i can't help", "sorry", "unavailable", "i don't have"];
        return text.length > 10 && !apologyPhrases.some((p) => lower.includes(p));
      } catch (e) {
        return false;
      }
    },
  });
}
