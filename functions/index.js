const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

/* لما يجي طلب جديد → ابعت إشعار للتاجر */
exports.notifyMerchantOnNewOrder = functions.database
    .ref('/eqbad_orders/{orderKey}')
    .onCreate(async (snapshot, context) => {
        const order = snapshot.val();
        const orderKey = context.params.orderKey;

        if (!order || !order.target_merchant) return null;

        const merchantPhone = String(order.target_merchant).replace(/\D/g, '');
        const merchantKey = 'merchant_' + merchantPhone;

        try {
            /* جيب توكن التاجر */
            const merchantSnap = await admin.database()
                .ref('/eqbad_merchants/' + merchantKey + '/fcmToken')
                .once('value');

            const token = merchantSnap.val();
            if (!token) {
                console.log('⚠️ لا يوجد توكن للتاجر:', merchantKey);
                return null;
            }

            /* جهّز نص الإشعار */
            const amount = order.amount || 0;
            const isCashOut = order.transaction_type === 'cash_out';
            const method = order.method === 'vodafone' ? 'فودافون كاش' : 'إنستاباي';
            const title = '💰 وصلني كاش — طلب جديد!';
            const body = `${isCashOut ? '💵 طلب سيولة' : '📱 طلب رصيد'} بمبلغ ${amount} ج.م • ${method}`;

            /* ابعت الإشعار */
            const message = {
                token: token,
                notification: {
                    title: title,
                    body: body,
                    icon: '/icon.png'
                },
                data: {
                    order_key: orderKey,
                    url: '/wslnycash.html#merchantDashboardView',
                    amount: String(amount),
                    method: order.method || 'vodafone',
                    transaction_type: order.transaction_type || 'cash_out',
                    customer_name: order.customer_name || 'عميل'
                },
                android: {
                    priority: 'high',
                    notification: {
                        sound: 'default',
                        channelId: 'wslny_orders',
                        priority: 'max',
                        vibrate: [300, 100, 300, 100, 500]
                    }
                },
                webpush: {
                    headers: { 'Urgency': 'high' },
                    notification: {
                        vibrate: [300, 100, 300, 100, 500],
                        requireInteraction: true
                    }
                }
            };

            await admin.messaging().send(message);
            console.log('✅ تم إرسال الإشعار للتاجر:', merchantKey);
            return null;
        } catch (error) {
            console.error('❌ خطأ في إرسال الإشعار:', error);
            return null;
        }
    });
