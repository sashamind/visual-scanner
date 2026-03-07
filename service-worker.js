// Название кэша — меняй версию когда обновляешь приложение
const CACHE_NAME = 'theremin-v1';

// Файлы которые сохраняем для офлайн работы
const FILES_TO_CACHE = [
  '/',
  '/index.html',
  '/icon-192.png',
  '/icon-512.png'
];

// Установка: сохраняем файлы в кэш
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});

// Активация: удаляем старый кэш если версия изменилась
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME)
            .map(key => caches.delete(key))
      );
    })
  );
});

// Запрос: сначала сеть, если нет — кэш
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});
