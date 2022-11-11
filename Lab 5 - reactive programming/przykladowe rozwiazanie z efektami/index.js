import DataEvent from "./data-event.js"
import { map } from './data-event.js'
import Logger from "./logger.js"

const timerEvent = interval();

// subskrybenci
timerEvent.subscribe('timer', () => { })
timerEvent.subscribe('timer', discoverPowerBallNumber)
// subskrybent z efektami - odpowiednik .pipe() w bibliotece RxJS
timerEvent
  .addEffects(
    (data) => Logger.log(`[EFFECT] from save C] ${data}`),
    map(x => x * 10),
    (data) => console.log(`[EFFECT] another from save C] ${data}`)
  )
  .subscribe('timer', saveCToSessionStorage)



// teraz mozemy nawet tak (z tablica z poprzedniego przykładu nie będzie tak ładnie i łatwo):
// function A() {
//   timerEvent
//     .addEffects(
//       (data) => Logger.log(`[EFFECT] from save C] ${data}`),
//       (data) => console.log(`[EFFECT] another from save C] ${data}`)
//     )
//   return timerEvent
// }
// function B() {
//   const event = A()
//   event
//     // jeszcze inne efekty z innego źródła
//     .addEffects(() => { })
//     .subscribe('timer', saveCToSessionStorage)
// }

function interval() {
  let timer = 1
  let event = new DataEvent()
  setInterval(
    () => {
      event.emit('timer', timer)
      timer++
    }
    , 1000)
  return event
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