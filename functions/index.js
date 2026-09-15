const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.notifyMerchantOnNewOrder = functions.database
    .ref('/eqbad_orders/{orderKey}')
    .onCreate(async (snapshot, context) => {
        const order = snapshot.val();
        const orderKey = context.params.orderKey;
        if (!order || !order.target_merchant) return null;

        const merchantPhone = String(order.target_merchant).replace(/\D/g, '');
        const merchantKey = 'merchant_' + merchantPhone;

        try {
            const merchantSnap = await admin.database()
                .ref('/eqbad_merchants/' + merchantKey).once('value');
            const merchantData = merchantSnap.val();
            if (!merchantData || !merchantData.fcmToken) {
                console.log('⚠️ لا يوجد توكن:', merchantKey);
                return null;
            }

            const amount = order.amount || 0;
            const isCashOut = order.transaction_type === 'cash_out';
            const method = order.method === 'vodafone' ? 'فودافون كاش' : 'إنستاباي';
            const customerName = order.customer_name || 'عميل';

            const title = '💰 وصلني كاش — طلب جديد!';
            const body = `${isCashOut ? '💵 طلب سيولة' : '📱 طلب رصيد'} بمبلغ ${amount} ج.م • ${method} • ${customerName}`;

            await admin.messaging().send({
                token: merchantData.fcmToken,
                notification: { title, body, icon: '/icon.png' },
                data: {
                    order_key: orderKey,
                    url: '/wslnycash.html#merchantDashboardView',
                    amount: String(amount)
                },
                android: {
                    priority: 'high',
                    notification: { sound: 'default', channelId: 'wslny_orders', priority: 'max', vibrate: [300, 100, 300, 100, 500] }
                },
                webpush: {
                    headers: { 'Urgency': 'high' },
                    notification: { vibrate: [300, 100, 300, 100, 500], requireInteraction: true },
                    fcmOptions: { link: '/wslnycash.html' }
                }
            });

            console.log('✅ إشعار مبعوث:', merchantKey);
            return null;
        } catch (error) {
            console.error('❌ خطأ:', error);
            return null;
        }
    });
