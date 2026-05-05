<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;700&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Cairo', sans-serif; background: #fff; margin: 0; padding: 20px; color: #333; }
        .grid-container {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }
        /* بطاقات الإحصائيات */
        .stat-card {
            background: #f8f9fa;
            border-right: 5px solid #3498db;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.05);
        }
        .stat-card h4 { margin: 0; color: #7f8c8d; font-size: 0.9rem; }
        .stat-card .value { font-size: 1.8rem; font-weight: bold; color: #2c3e50; margin: 10px 0; }
        
        /* قسم الجداول المدمجة */
        .report-section {
            background: white;
            border: 1px solid #eee;
            border-radius: 12px;
            padding: 20px;
            margin-top: 20px;
        }
        .report-section h3 { border-bottom: 2px solid #3498db; padding-bottom: 10px; color: #1e3c72; }
        
        table { width: 100%; border-collapse: collapse; margin-top: 15px; }
        table th { background: #f2f2f2; padding: 12px; text-align: right; font-size: 0.9rem; }
        table td { padding: 12px; border-bottom: 1px solid #eee; font-size: 0.85rem; }
        
        .status-badge {
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 0.75rem;
            font-weight: bold;
        }
        .urgent { background: #e74c3c; color: white; } /* لتنبيهات التسليم القريبة */
        .success { background: #27ae60; color: white; }
    </style>
</head>
<body>

    <div class="grid-container">
        <div class="stat-card">
            <h4>إجمالي ديون الزبائن</h4>
            <div class="value" id="total-debts">0.00 ج.م</div>
            <small>مستخرج من: حسابات الزبائن</small>
        </div>
        <div class="stat-card" style="border-right-color: #e67e22;">
            <h4>تسليمات مرتقبة (هذا الأسبوع)</h4>
            <div class="value" id="upcoming-deliveries">0</div>
            <small>مستخرج من: جدول التسليمات</small>
        </div>
        <div class="stat-card" style="border-right-color: #2ecc71;">
            <h4>صافي حركة اليومية</h4>
            <div class="value" id="daily-balance">0.00 ج.م</div>
            <small>مستخرج من: يوميات الورشة</small>
        </div>
    </div>

    <div class="report-section">
        <h3>🔔 تنبيهات الاستلام العاجلة</h3>
        <table>
            <thead>
                <tr>
                    <th>اسم الزبيل</th>
                    <th>نوع المطبخ</th>
                    <th>تاريخ التعاقد</th>
                    <th>موعد التسليم</th>
                    <th>الحالة</th>
                </tr>
            </thead>
            <tbody id="alerts-table">
                <tr>
                    <td>محمد علي</td>
                    <td>خشب مودرن</td>
                    <td>2026-04-01</td>
                    <td style="color: red; font-weight: bold;">2026-05-07</td>
                    <td><span class="status-badge urgent">عاجل - خلال يومين</span></td>
                </tr>
            </tbody>
        </table>
    </div>

    <div class="report-section">
        <h3>📉 ملخص الربط المالي (زبائن + يومية)</h3>
        <table>
            <thead>
                <tr>
                    <th>البيان</th>
                    <th>الوارد (من الزبائن)</th>
                    <th>المنصرف (خامات/عمال)</th>
                    <th>صافي الربح التقديري</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>إحصاء شهر مايو 2026</td>
                    <td style="color: green;">+ 45,000 ج.م</td>
                    <td style="color: red;">- 20,000 ج.م</td>
                    <td style="font-weight: bold;">25,000 ج.م</td>
                </tr>
            </tbody>
        </table>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</body>
</html>
