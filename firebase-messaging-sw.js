importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js');

firebase.initializeApp({
    apiKey: "AIzaSyDmPciW_QPM4vwcMLX2M44_C0a8jqHdPjU",
    authDomain: "azemaa-proo.firebaseapp.com",
    databaseURL: "https://azemaa-proo-default-rtdb.firebaseio.com",
    projectId: "azemaa-proo",
    storageBucket: "azemaa-proo.firebasestorage.app",
    messagingSenderId: "787350492977",
    appId: "1:787350492977:web:84061dcf31622fcb07c210",
    measurementId: "G-R28J7010TH"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log('[SW] 🔔 Background:', payload);
    const notificationTitle = payload.notification?.title || '💰 وصلني كاش';
    const notificationBody  = payload.notification?.body  || 'وصلك طلب جديد';
    const data = payload.data || {};

    const options = {
        body: notificationBody,
        icon: payload.notification?.icon || '/icon.png',
        badge: '/icon.png',
        dir: 'rtl',
        lang: 'ar',
        vibrate: [300, 100, 300, 100, 500],
        requireInteraction: true,
        tag: data.order_key || 'wslny_order',
        renotify: true,
        data: {
            url: data.url || '/wslnycash.html',
            order_key: data.order_key || ''
        }
    };

    self.registration.showNotification(notificationTitle, options);
});

self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    const urlToOpen = event.notification.data?.url || '/wslnycash.html';
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windowClients) => {
            for (let i = 0; i < windowClients.length; i++) {
                const client = windowClients[i];
                if (client.url.includes('wslnycash') && 'focus' in client) {
                    return client.focus();
                }
            }
            if (clients.openWindow) {
                return clients.openWindow(urlToOpen);
            }
        })
    );
});
