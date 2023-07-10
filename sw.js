
//EN SERVICE WORKER SOLO SELF (NO WINDOW) ;()


//Cuando se Instala el service worker
self.addEventListener('install', e => {
    console.log('Instalando el Service Worker');

    console.log(e);
})

//Activar service worker
self.addEventListener('activate', e => {
    console.log('Service Worker Activado');

    console.log(e);
})

