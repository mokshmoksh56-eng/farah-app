/* AZEMAA PRO Service Worker
   Network-first for same-origin GET requests, with safe offline fallback.
*/

const CACHE_NAME = 'azemaa-cache-v3';

const CORE_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './windows.html'
];

// تثبيت Service Worker وتخزين الملفات الأساسية
self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);

    await Promise.all(CORE_ASSETS.map(async asset => {
      try {
        const response = await fetch(asset, {
          cache: 'reload'
        });

        if (response.ok && response.type === 'basic') {
          await cache.put(asset, response);
        }

      } catch (error) {
        console.warn('Precache skipped:', asset, error);
      }
    }));

    await self.skipWaiting();

  })());
});


// تفعيل النسخة الجديدة وتنظيف النسخ القديمة الخاصة بالتطبيق فقط
self.addEventListener('activate', event => {
  event.waitUntil((async () => {

    const keys = await caches.keys();

    await Promise.all(
      keys
        .filter(key =>
          key.startsWith('azemaa-cache-') &&
          key !== CACHE_NAME
        )
        .map(key => caches.delete(key))
    );

    await self.clients.claim();

  })());
});


// التعامل مع طلبات الصفحات والملفات
self.addEventListener('fetch', event => {

  const request = event.request;

  // تجاهل الطلبات غير GET
  if (request.method !== 'GET') return;

  const requestUrl = new URL(request.url);

  // عدم التدخل في Firebase أو المواقع الخارجية
  if (requestUrl.origin !== self.location.origin) return;

  event.respondWith((async () => {

    try {

      // محاولة تحميل أحدث نسخة من الإنترنت
      const response = await fetch(request);

      // تخزين الملفات الناجحة فقط
      if (
        response &&
        response.ok &&
        response.type === 'basic' &&
        !response.headers.get('Cache-Control')?.includes('no-store')
      ) {

        const cache = await caches.open(CACHE_NAME);

        await cache.put(
          request,
          response.clone()
        ).catch(() => {});

      }

      return response;

    } catch (error) {

      // في حالة انقطاع الإنترنت نبحث في التخزين المحلي
      const cached = await caches.match(request);

      if (cached) {
        return cached;
      }

      // إذا كانت صفحة HTML نعرض الصفحة الرئيسية المحفوظة
      if (request.mode === 'navigate') {

        const fallback = await caches.match('./index.html');

        if (fallback) {
          return fallback;
        }

      }

      // رسالة عند عدم وجود الصفحة في التخزين
      return new Response(
        'لا يوجد اتصال بالإنترنت وهذه الصفحة غير محفوظة على الجهاز.',
        {
          status: 503,
          statusText: 'Service Unavailable',
          headers: {
            'Content-Type': 'text/plain; charset=utf-8'
          }
        }
      );

    }

  })());

});
