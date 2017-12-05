const CACH_KEY_NAME = `blog-kazaxy-v${process.env.GIT_REVISION_HASH}`;
const assets = [
  'css/vars.css',
  'css/base.css',
  'css/home.css',
  'css/page.css',
];

const fu = 'fu';
 
self.addEventListener('install', event => {
  const saving = caches.open(CACH_KEY_NAME).then(cache => {
    return cache.addAll(assets);
  });

  event.waitUntil(saving);
});

self.addEventListener('activate', event => {
  const deleting = caches.keys()
    .then(keys => keys.filter(key => key !== CACH_KEY_NAME))
    .then(keys => Promise.all(keys.map(key => caches.delete(key))));

  event.waitUntil(deleting);
});

self.addEventListener('fetch', event => {
  const url = event.request.url;
  console.log(url);
  if (!assets.some(file => url.includes(file))) {
    return;
  }

  const fetching = caches.match(event.request).then(response => {
    return response || fetch(event.request);
  });

  event.respondWith(fetching);
});


