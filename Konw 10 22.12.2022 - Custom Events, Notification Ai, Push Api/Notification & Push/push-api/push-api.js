const appServerPublicKey = 'BGN1pj4Ypf7sTbYL9dj2YaeXbBuaPGO7nWZ1IdrBWnhQw5sx8oG5l0Y0RLsRkpV6patAlng6rs72M628ZFGHEOE'
const pushServerSubUri = 'http://localhost:3000/api/subscribe-to-push'

document.addEventListener('DOMContentLoaded', appStart)

async function appStart() {
    await initializeNotifiactionApi()
    const registration = await registerServiceWorker()
    await subscribePushManager(registration)
}
async function registerServiceWorker() {
    if (!('serviceWorker' in navigator)) {
        throw new Error('Brak wsparcia dla ServiceWorker!')
    }
    if (!('PushManager' in window)) {
        throw new Error('Brak wsparcia dla powiadomień Push!')
    }
    // Zarejestruj ServiceWorker (zwraca Promise)
    return navigator.serviceWorker
        .register('push-service-worker.js')
        .then((registration) => {
            console.log('[Push API SW] Registered', registration)
            return registration
        })
        .catch((err) => console.log(err))
}
async function initializeNotifiactionApi() {
    return Notification.requestPermission((status) => {
        console.log('Status Notification API: ', status)
    })
}
async function subscribePushManager(registration) {
    const options = {
        userVisibleOnly: true,
        applicationServerKey: appServerPublicKey
    }
    registration.pushManager.subscribe(options)
        .then(pushSubscription => {
            console.log(pushSubscription)
            return sendPushSubscriptionToServer(pushSubscription)
        })
}
async function sendPushSubscriptionToServer(subscription) {
    return fetch(pushServerSubUri, {
        method: 'post',
        headers: { 'Content-Type': 'Application/json' },
        body: JSON.stringify(subscription)
    })
}