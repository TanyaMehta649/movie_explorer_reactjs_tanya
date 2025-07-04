import { initializeApp } from "firebase/app";
import {
  deleteToken,
  getMessaging,
  getToken,
  onMessage,
} from "firebase/messaging";
import { sendTokenToBackend } from "../services/UserServices";

const firebaseConfig = {
  apiKey: "AIzaSyAU1fNyonSkzJdRmcwPLhOrBLCqGlmRpm8",
  authDomain: "movie-explorer-acf7c.firebaseapp.com",
  projectId: "movie-explorer-acf7c",
  storageBucket: "movie-explorer-acf7c.firebasestorage.app",
  messagingSenderId: "478584909632",
  appId: "1:478584909632:web:64c604248d081920d114a5",
  measurementId: "G-VHTF0G8C2K"
};

const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

export const generateToken = async () => {
  try {
    const registration = await navigator.serviceWorker.register(
      "/firebase-messaging-sw.js"
    );
    console.log("Service Worker registered:", registration);

    const permission = await Notification.requestPermission();
    console.log("Notification permission:", permission);
    if (permission !== "granted") {
      console.warn("Notification permission not granted:", permission);
      return null;
    }

    const vapidKey =
      "BC-X5xRxSuqmP23YIvvnmFEeLlttSgvWm4J7yTUvutVlN7RHUra21Wu-mQf-bnzvgSsrYxo8hMwlY_nt-sZsaRg";

    const token = await getToken(messaging, {
      vapidKey,
      serviceWorkerRegistration: registration,
    });

    if (!token || typeof token !== "string" || token.length < 50) {
      console.warn("Generated token appears invalid");
      return null;
    }

    console.log("New FCM Token:", token);
    sendTokenToBackend(token);

    return token;
  } catch (error) {
    console.error("Error generating FCM token or sending to backend:", error);
    return null;
  }
};

export const monitorToken = async () => {
  try {
    const vapidKey =
      "BC-X5xRxSuqmP23YIvvnmFEeLlttSgvWm4J7yTUvutVlN7RHUra21Wu-mQf-bnzvgSsrYxo8hMwlY_nt-sZsaRg";
    const token = await getToken(messaging, { vapidKey }).catch(
      async (error) => {
        if (
          error.code === "messaging/token-unsubscribed" ||
          error.code === "messaging/invalid-token"
        ) {
          console.log("Token invalid or unsubscribed, generating new token");
          await deleteToken(messaging).catch(() =>
            console.log("No token to delete")
          );
          const newToken = await getToken(messaging, { vapidKey });
          console.log("New FCM Token (refreshed):", newToken);
          return newToken;
        }
        throw error;
      }
    );
    if (token) {
      if (typeof token !== "string" || token.length < 50) {
        console.warn("Monitored token appears invalid");
        return null;
      }
      console.log("Token validated:", token);
    }
    return token;
  } catch (error) {
    console.error("Error monitoring FCM token:", error);
    return null;
  }
};

export { onMessage };