importScripts('https://www.gstatic.com/firebasejs/10.14.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.14.1/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: "AIzaSyAU1fNyonSkzJdRmcwPLhOrBLCqGlmRpm8",
  authDomain: "movie-explorer-acf7c.firebaseapp.com",
  projectId: "movie-explorer-acf7c",
  storageBucket: "movie-explorer-acf7c.firebasestorage.app",
  messagingSenderId: "478584909632",
  appId: "1:478584909632:web:64c604248d081920d114a5",
  measurementId: "G-VHTF0G8C2K"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message:', payload);

const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image || '/favicon.ico'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});