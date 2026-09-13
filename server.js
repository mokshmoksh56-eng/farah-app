const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

// تهيئة الاتصال بقاعدة بيانات فايربيز الخاصة بتطبيقك
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://azemaa-proo-default-rtdb.firebaseio.com"
});

console.log("✅ السيرفر يعمل بنجاح ويراقب الطلبات الجديدة...");

const db = admin.database();
const ordersRef = db.ref('eqbad_orders');

// مراقبة أي طلب جديد يتم إضافته
ordersRef.on('child_added', async (snapshot) => {
    const orderData = snapshot.val();
    const targetMerchant = orderData.target_merchant;

    // التأكد من وجود تاجر وأن الطلب جديد (معلق)
    if (!targetMerchant || orderData.status !== 'pending') return;

    // جلب التوكن الخاص بهاتف التاجر
    const merchantRef = db.ref(`eqbad_merchants/merchant_${targetMerchant}`);
    const merchantSnap = await merchantRef.once('value');
    
    if (!merchantSnap.exists() || !merchantSnap.val().fcmToken) return;

    const fcmToken = merchantSnap.val().fcmToken;
    const isCashOut = orderData.transaction_type === 'cash_out' || !orderData.transaction_type;
    const title = isCashOut ? "طلب سيولة كاش 💵" : "طلب تحويل رصيد 📱";
    const body = `يطلب ${orderData.customer_name || 'عميل'} مبلغ ${orderData.amount || 0} ج.م، افتح التطبيق للموافقة.`;

    // إرسال الإشعار لهاتف التاجر
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
