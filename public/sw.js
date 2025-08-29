const CACHE_NAME = 'hestia-chatbot-v3';
  const urlsToCache = [
    '/',
    '/index.html',
    '/manifest.json',
    '/hestia-avatar.svg',
    '/hestia-icon.svg',
    '/icon-192.png',
    '/icon-512.png',
    '/src/main.tsx',
    '/src/App.tsx',
    '/src/index.css',
    '/src/App.css',
    '/src/pages/Index.tsx',
    '/src/components/ChatBot.tsx',
    '/src/components/FAQ.tsx',
    '/src/components/LoadingScreen.tsx',
    '/src/components/IOSInstallGuide.tsx',
    '/src/components/ui/button.tsx',
    '/src/components/ui/card.tsx',
    '/src/components/ui/input.tsx',
    '/src/components/ui/toast.tsx',
    '/src/components/ui/toaster.tsx',
    '/src/components/ui/sonner.tsx',
    '/src/components/ui/tooltip.tsx',
    '/src/lib/utils.ts',
    '/src/hooks/use-toast.ts',
    '/src/hooks/use-mobile.tsx'
  ];

// Install event - cache resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        // Cache opened successfully
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event - serve from cache when offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        if (response) {
          return response;
        }
        
        return fetch(event.request).then((response) => {
          // Cache successful responses for future offline use
          if (response && response.status === 200 && response.type === 'basic') {
            const responseToCache = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });
          }
          return response;
        });
      })
      .catch(() => {
        // Return offline page if both cache and network fail
        if (event.request.destination === 'document') {
          return caches.match('/index.html');
        }
        // For other requests, return a basic offline response
        return new Response('Offline content not available', {
          status: 503,
          statusText: 'Service Unavailable',
          headers: new Headers({
            'Content-Type': 'text/plain',
          }),
        });
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            // Deleting old cache
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Background sync for offline data
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

function doBackgroundSync() {
  // Handle any background sync tasks
  // Background sync triggered
  return Promise.resolve();
}

// Push notification handling
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'New message from Hestia!',
            icon: '/hestia-icon.svg',
        badge: '/hestia-icon.svg',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
             {
         action: 'explore',
         title: 'Open Chat',
         icon: '/hestia-icon.svg'
       },
       {
         action: 'close',
         title: 'Close',
         icon: '/hestia-icon.svg'
       }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('Hestia AI Assistant', options)
  );
});

// Notification click handling
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});
