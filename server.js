const admin = require("firebase-admin");
const express = require("express"); // إضافة مكتبة إكسبريس
const serviceAccount = require("./serviceAccountKey.json");

const app = express(); // تشغيل إكسبريس

// تهيئة الاتصال بقاعدة بيانات فايربيز الخاصة بتطبيقك
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://azemaa-proo-default-rtdb.firebaseio.com"
});

console.log("✅ اتصال فايربيز جاهز ويراقب الطلبات...");

const db = admin.database();
const ordersRef = db.ref('eqbad_orders');

// مراقبة أي طلب جديد يتم إضافته
ordersRef.on('child_added', async (snapshot) => {
    const orderData = snapshot.val();
    const targetMerchant = orderData.target_merchant;

    if (!targetMerchant || orderData.status !== 'pending') return;

    const merchantRef = db.ref(`eqbad_merchants/merchant_${targetMerchant}`);
    const merchantSnap = await merchantRef.once('value');
    
    if (!merchantSnap.exists() || !merchantSnap.val().fcmToken) return;

    const fcmToken = merchantSnap.val().fcmToken;
    const isCashOut = orderData.transaction_type === 'cash_out' || !orderData.transaction_type;
    const title = isCashOut ? "طلب سيولة كاش 💵" : "طلب تحويل رصيد 📱";
    const body = `يطلب ${orderData.customer_name || 'عميل'} مبلغ ${orderData.amount || 0} ج.م، افتح التطبيق للموافقة.`;

    try {
        await admin.messaging().send({
            notification: { title, body },
            token: fcmToken
        });
        console.log("تم إرسال الإشعار بنجاح للتاجر:", targetMerchant);
    } catch (error) {
        console.error("حدث خطأ أثناء إرسال الإشعار:", error);
    }
});

// إعداد خادم الويب ليفتح المنفذ ويقبل النشر على Render
const PORT = process.env.PORT || 3000;
app.get('/', (req, res) => {
    res.send("🚀 سيرفر الإشعارات يعمل بنجاح!");
});

app.listen(PORT, () => {
    console.log(`✅ Web server is running on port ${PORT}`);
});
