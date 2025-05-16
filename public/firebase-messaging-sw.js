










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
  console.log('Notification payload:', payload.notification);

  // Check if notification exists
  if (!payload.notification) {
    console.log('No notification payload, checking data payload');
    if (payload.data) {
      // Handle data-only messages if applicable
      const notificationTitle = payload.data.title || 'Default Title';
      const notificationOptions = {
        body: payload.data.body || 'Default Body',
        icon: payload.data.image || '/favicon.ico'
      };
      console.log('Showing data notification:', notificationTitle, notificationOptions);
      return self.registration.showNotification(notificationTitle, notificationOptions);
    }
    console.log('No valid payload, skipping notification');
    return;
  }

  const notificationTitle = payload.notification.title || 'Default Title';
  const notificationOptions = {
    body: payload.notification.body || 'Default Body',
    icon: payload.notification.image || '/favicon.ico'
  };

  console.log('Showing notification:', notificationTitle, notificationOptions);
  return self.registration.showNotification(notificationTitle, notificationOptions);
});