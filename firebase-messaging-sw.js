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

// استلام الإشعار والتطبيق مغلق (في الخلفية)
messaging.onBackgroundMessage(function(payload) {
  const notificationTitle = payload.notification.title || "طلب جديد 🔔";
  const notificationOptions = {
    body: payload.notification.body,
    icon: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png', // اللوجو الكبير
    badge: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png', // اللوجو الصغير في الشريط العلوي
    dir: 'rtl',
    vibrate: [500, 250, 500, 250, 500], // اهتزاز قوي للتنبيه
    requireInteraction: true, // إبقاء الإشعار في الشريط العلوي حتى يفتحه التاجر
    data: {
      click_url: '/' // لفتح التطبيق عند الضغط على الإشعار
    }
  };
  
  return self.registration.showNotification(notificationTitle, notificationOptions);
});

// الحدث الخاص بالضغط على الإشعار من الشريط العلوي لفتح التطبيق
self.addEventListener('notificationclick', function(event) {
    event.notification.close(); // إغلاق الإشعار بعد الضغط عليه
    
    // فتح التطبيق أو التركيز عليه إذا كان مفتوحاً في الخلفية
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(clientList) {
            for (let i = 0; i < clientList.length; i++) {
                let client = clientList[i];
                if (client.url === '/' && 'focus' in client) {
                    return client.focus();
                }
            }
            if (clients.openWindow) {
                return clients.openWindow('/');
            }
        })
    );
});
