interval();

function interval() {
  let timer = 1
  setInterval(
    () => {
      // mamy coupling - interval ma na sztywno zaszyte w sobie C i D (..i logger)
      saveCToSessionStorage(timer)
      discoverPowerBallNumber(timer)
      timer++
    }
    , 2000)
}

class Logger {
  static log(data) {
    console.log(data)
  }
}

function saveCToSessionStorage(data) {
  console.log('[reader C]', data)
  const storageData = { data }
  sessionStorage.setItem('C', JSON.stringify(storageData))
  // brudzimy funkcję loggerem - to nie jest jej funkcjonalność!
  Logger.log(data)
}

function discoverPowerBallNumber(data) {
  const number = Math.floor(Math.random() * data * 100)
  console.log('[powerball number]', data)
}