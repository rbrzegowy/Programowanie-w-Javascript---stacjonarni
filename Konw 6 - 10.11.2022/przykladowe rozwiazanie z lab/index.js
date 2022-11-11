import EventBus from "./event-bus.js"
import Logger from "./logger.js"

// subskrybent
EventBus.subscribe('timer', () => { })
// jakiś inny subskrybent
EventBus.subscribe('timer', discoverPowerBallNumber)
// zestaw subskrybentów
EventBus.subscribe('timer', [saveCToSessionStorage, (data) => Logger.log(`[from save C] ${data}`)])

interval();

function interval() {
  let timer = 1
  setInterval(
    () => {
      // emisja zdarzenia
      EventBus.emit('timer', timer)
      timer++
    }
    , 2000)
}

function saveCToSessionStorage(data) {
  console.log('[reader C]', data)
  const storageData = { data }
  sessionStorage.setItem('C', JSON.stringify(storageData))
}

function discoverPowerBallNumber(data) {
  const number = Math.floor(Math.random() * data * 100)
  console.log('[powerball number]', number)
}