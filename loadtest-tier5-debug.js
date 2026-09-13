import http from "k6/http";

export const options = {
  vus: 1,
  iterations: 1,
};

const URL = "https://us-central1-bizer-app-a9d8b.cloudfunctions.net/askMiles";
const ID_TOKEN = "<FIREBASE_ID_TOKEN>"; // fetch a fresh token from bizer.app (DevTools > Application > IndexedDB > firebaseLocalStorageDb > stsTokenManager.accessToken); expires ~1hr
const BUSINESS_ID = "biz-kICtB8q5S8aC";

export default function () {
  const res = http.post(
    URL,
    JSON.stringify({
      data: {
        businessId: BUSINESS_ID,
        threadId: "loadtest-debug",
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
  console.log("STATUS: " + res.status);
  console.log("BODY: " + res.body);
}
