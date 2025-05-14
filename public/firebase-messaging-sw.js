// importScripts('https://www.gstatic.com/firebasejs/10.14.1/firebase-app-compat.js');
// importScripts('https://www.gstatic.com/firebasejs/10.14.1/firebase-messaging-compat.js');
// const firebaseConfig = {
//   apiKey: "AIzaSyAU1fNyonSkzJdRmcwPLhOrBLCqGlmRpm8",
//   authDomain: "movie-explorer-acf7c.firebaseapp.com",
//   projectId: "movie-explorer-acf7c",
//   storageBucket: "movie-explorer-acf7c.firebasestorage.app",
//   messagingSenderId: "478584909632",
//   appId: "1:478584909632:web:64c604248d081920d114a5",
//   measurementId: "G-VHTF0G8C2K"
// };

 
// firebase.initializeApp(firebaseConfig);

// const messaging = firebase.messaging();

// messaging.onBackgroundMessage((payload) => {
//   console.log('[firebase-messaging-sw.js] Received background message:', payload);
//   const notificationTitle = payload.notification.title;
//   const notificationOptions = {
//     body: payload.notification.body,
//     icon: payload.notification.image || '/favicon.ico'
//   };

//   self.registration.showNotification(notificationTitle, notificationOptions);
// });
// Import Firebase scripts
importScripts('https://www.gstatic.com/firebasejs/10.14.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.14.1/firebase-messaging-compat.js');

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAU1fNyonSkzJdRmcwPLhOrBLCqGlmRpm8",
  authDomain: "movie-explorer-acf7c.firebaseapp.com",
  projectId: "movie-explorer-acf7c",
  storageBucket: "movie-explorer-acf7c.firebasestorage.app",
  messagingSenderId: "478584909632",
  appId: "1:478584909632:web:64c604248d081920d114a5",
  measurementId: "G-VHTF0G8C2K"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Messaging
const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message:', payload);

  // Support both notification and data payloads
  const notification = payload.notification || payload.data;

  const notificationTitle = notification?.title || 'Movie Explorer';
  const notificationOptions = {
    body: notification?.body || 'You have a new notification.',
    icon: notification?.icon || '/favicon.ico',
  };

  // Show the notification
  self.registration.showNotification(notificationTitle, notificationOptions);
});
