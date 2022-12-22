document.addEventListener('DOMContentLoaded', appStart)

function appStart() {
    // POWIADOMIENIA
    pokazPowiadomienie()
}

async function pokazPowiadomienie() {
    // 1. Czy domena po zezwolenie?
    await Notification.requestPermission().then((status) => {
        console.log('Notification request permision', status)
    })
    // jeśli mamy uprawnienia - pokaż powiadomienie
    if (Notification.permission === 'granted') {
        showNotify('First time here?', 'Haaa! Gotch ya!',)
        setTimeout(() => {
            showNotify('Definitely you like it:)', 'No, you can\'t unsubscribe!')
        }, 4000)
    }
}

function showNotify(title, body) {
    const notifyOptions = {
        body,
        icon: 'https://i0.wp.com/www.chargelogic.com/wp-content/uploads/2016/05/ChargeLogic-Notify-Icon-Large-No-Back.png?ssl=1',
        data: 'welcome', // lub tag: 'someid'
        // actions są dostępne tylko dla powiadomień z service workera
        // actions: [
        //     { action: 'fail', title: 'Ups, pomyliłem się', icon: '' },
        //     { action: 'ok', title: 'No ba!', icon: '' },
        // ]
    }
    const notify = new Notification(title, notifyOptions)
    notify.addEventListener('click', notifyClick)
    notify.addEventListener('close', notifyClose)
}
function notifyClick(e) {
    console.log(e.target);
    window.open('https://google.com', '_blank')
    // lub window.location = 'https://youtube.com'
    // zamknij powiadomienie, samo się nie zamknie...
    this.close()
}
function notifyClose(e) {
    console.log(e.target);
}