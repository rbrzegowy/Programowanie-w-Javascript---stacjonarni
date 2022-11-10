interval();

function interval() {
  let timer = 1
  setInterval(
    () => {
      // mamy coupling - interval ma na sztywno zaszyte w sobie C i D (..i logger)
      C(timer)
      D(timer)
      timer++
    }
    , 2000)
}

class Logger {
  static log(data) {
    console.log(data)
  }
}

function C(data) {
  console.log('[reader C]', data)
  const storageData = { data }
  sessionStorage.setItem('C', JSON.stringify(storageData))
  // brudzimy funkcję loggerem - to nie jest jej funkcjonalność!
  Logger.log(data)
}

function D(data) {
  console.log('[reader D]', data)
  const storageData = { data }
  sessionStorage.setItem('D', JSON.stringify(storageData))
  // j/w
  Logger.log(data)
}