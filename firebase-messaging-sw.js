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
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png', // يمكنك تغييره برابط لوجو تطبيقك
    dir: 'rtl'
  };
  return self.registration.showNotification(notificationTitle, notificationOptions);
});
