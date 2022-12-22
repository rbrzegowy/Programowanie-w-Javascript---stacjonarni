// SW events: install, activate, message

self.addEventListener('sync',
    (e) => {
        console.log('[SW] sync event', e)
        // synchronizacja danych
        // e.waitUntil (jakasFunkcja())
    })

// push to powiadomienie z serwera
self.addEventListener('push',
    (e) => {
        // e.waitUntil(() => {
        const data = e.data.json()
        console.log('[SW] fetch event', data, e)
        showNotify('Push from server', data.message)
        // self.registration.showNotification('SWorker notify!')
        // })
    })

function showNotify(title, body) {
    const notifyOptions = {
        body,
        icon: 'https://i0.wp.com/www.chargelogic.com/wp-content/uploads/2016/05/ChargeLogic-Notify-Icon-Large-No-Back.png?ssl=1',
        vibrate: [200, 100, 200, 100, 200, 100, 200],
        // actions są dostępne tylko dla powiadomień z service workera
        actions: [
            { action: 'fail', title: 'Ok ok', icon: '' },
            { action: 'ok', title: 'Nope', icon: '' },
        ]
    }
    self.registration.showNotification(title, notifyOptions)
}
self.addEventListener('notificationclick', ev => {
    console.log('[SW] Notification action', ev)
})
