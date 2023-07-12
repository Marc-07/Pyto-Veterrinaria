const nombreCache = 'apv-v1'

const archivos =  [
    '/',
    '/index.html',
    '/css/bootstrap.css',
    '/css/styles.css',
    'js/app.js',
    'js/apv.js'

]

//EN SERVICE WORKER SOLO SELF (NO WINDOW) ;()


//Cuando se Instala el service worker
self.addEventListener('install', e => {
    console.log('Instalando el Service Worker');

    e.waitUntil(
        caches.open(nombreCache)
            .then( cache => {
                console.log('cacheando')
                cache.addAll(archivos)
            })
    );
});

//Activar service worker
self.addEventListener('activate', e => {
    console.log('Service Worker Activado');

    console.log(e);
});

//Evento fetch para descargar Archivos Estaticos
self.addEventListener('fetch', e => {
    console.log('Fetch', e);
})

