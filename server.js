// استبدل كود الإرسال (try...catch) في ملف server.js بهذا الكود:
try {
    await admin.messaging().send({
        token: fcmToken,
        notification: { title, body },
        // إضافة إعدادات الأندرويد لضمان ظهوره كإشعار نظام منبثق
        android: {
            priority: 'high',
            notification: {
                sound: 'default',
                defaultVibrateTimings: true
            }
        },
        // إضافة إعدادات الويب
        webpush: {
            headers: {
                Urgency: 'high'
            }
        }
    });
    console.log("تم إرسال الإشعار بنجاح للتاجر:", targetMerchant);
} catch (error) {
    console.error("حدث خطأ أثناء إرسال الإشعار:", error);
}
