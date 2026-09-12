// استدعاء مكتبات فايربيز لبيئة الـ Service Worker
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js');

// نفس إعدادات فايربيز الخاصة بك
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

// استقبال الإشعارات والتطبيق مغلق
messaging.onBackgroundMessage(function(payload) {
    console.log('تم استقبال إشعار في الخلفية: ', payload);
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: '/icon.png', // مسار أيقونة تطبيقك (أضف صورة بصيغة png)
        badge: '/badge.png',
        dir: 'rtl'
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});
