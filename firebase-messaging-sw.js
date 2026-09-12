importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyDmPciW_QPM4vwcMLX2M44_C0a8jqHdPjU",
  authDomain: "azemaa-proo.firebaseapp.com",
  databaseURL: "https://azemaa-proo-default-rtdb.firebaseio.com",
  projectId: "azemaa-proo",
  storageBucket: "azemaa-proo.firebasestorage.app",
  messagingSenderId: "787350492977",
  appId: "1:787350492977:web:84061dcf31622fcb07c210"
});

const messaging = firebase.messaging();
messaging.onBackgroundMessage(function(payload) {
    self.registration.showNotification(payload.notification.title || 'طلب جديد', {
        body: payload.notification.body,
        icon: 'icon.png',
        dir: 'rtl'
    });
});
