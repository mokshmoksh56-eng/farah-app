<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <title>مركز التقارير - منظومة فرح</title>
    <style>
        body { font-family: 'Segoe UI', Tahoma, sans-serif; background: #f4f7f6; padding: 20px; margin: 0; }
        .grid-reports { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; }
        .report-card { background: white; border-radius: 10px; padding: 15px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); border-top: 5px solid #c0392b; }
        .report-card h3 { color: #c0392b; border-bottom: 1px solid #eee; padding-bottom: 10px; margin-top: 0; }
        
        .stat-box { display: flex; justify-content: space-between; background: #f9f9f9; padding: 10px; margin-bottom: 5px; border-radius: 5px; }
        .stat-label { font-weight: bold; color: #555; }
        .stat-value { color: #2c3e50; font-weight: 900; }
        
        table { width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 13px; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: center; }
        th { background-color: #f2f2f2; }
        .urgent { color: white; background: #e74c3c; padding: 2px 5px; border-radius: 3px; }
        
        .financial-summary { grid-column: span 2; display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; }
        .fin-box { padding: 15px; border-radius: 8px; text-align: center; color: white; }
    </style>
</head>
<body>

    <div class="grid-reports">
        
        <div class="report-card">
            <h3>📅 مواعيد الاستلام القريبة</h3>
            <table>
                <thead>
                    <tr>
                        <th>اسم العميل</th>
                        <th>تاريخ الاستلام</th>
                        <th>الحالة</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>محمد أحمد</td>
                        <td>2026-05-10</td>
                        <td><span class="urgent">عاجل</span></td>
                    </tr>
                    <tr>
                        <td>معرض الأمل</td>
                        <td>2026-05-15</td>
                        <td>قيد التصنيع</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="report-card">
            <h3>🤝 ملخص الاتفاقيات والديون</h3>
            <div class="stat-box">
                <span class="stat-label">عدد الاتفاقيات الكلي:</span>
                <span class="stat-value">45 اتفاقية</span>
            </div>
            <div class="stat-box">
                <span class="stat-label">إجمالي الدفعات المستلمة:</span>
                <span class="stat-value" style="color: green;">150,000 ج.م</span>
            </div>
            <div class="stat-box">
                <span class="stat-label">إجمالي المتبقي لنا:</span>
                <span class="stat-value" style="color: red;">65,000 ج.م</span>
            </div>
        </div>

        <div class="report-card">
            <h3>👷 تقرير العمال الأسبوعي</h3>
            <div class="stat-box">
                <span class="stat-label">إجمالي الرواتب (هذا الأسبوع):</span>
                <span class="stat-value">12,400 ج.م</span>
            </div>
            <div class="stat-box">
                <span class="stat-label">إجمالي السلف:</span>
                <span class="stat-value">2,100 ج.م</span>
            </div>
            <div class="stat-box">
                <span class="stat-label">أيام الغياب الكلية:</span>
                <span class="stat-value">5 أيام</span>
            </div>
        </div>

        <div class="report-card" style="grid-column: span 1;">
            <h3>💰 حركة الخزينة (الداخل والخارج)</h3>
            <table>
                <tr>
                    <th>الفترة</th>
                    <th>الداخل (إيراد)</th>
                    <th>الخارج (مصروف)</th>
                    <th>الصافي</th>
                </tr>
                <tr>
                    <td>اليوم</td>
                    <td>5,000</td>
                    <td>1,200</td>
                    <td>+3,800</td>
                </tr>
                <tr>
                    <td>الأسبوع</td>
                    <td>25,000</td>
                    <td>10,000</td>
                    <td>+15,000</td>
                </tr>
                <tr>
                    <td>الشهر</td>
                    <td>110,000</td>
                    <td>45,000</td>
                    <td>+65,000</td>
                </tr>
                <tr>
                    <td>السنة</td>
                    <td>--</td>
                    <td>--</td>
                    <td>--</td>
                </tr>
            </table>
        </div>

    </div>

</body>
</html>
