const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]

measurePerformance('add 1', () => addData1(data), data)
measurePerformance('add 2', () => addData2(data), data)
measurePerformance('add 3', () => addData3(data), data)

// for z await
async function addData1(data) {
  let sum = 0
  for (let item of data) {
    sum = await asyncAdd(sum, item)
  }
  return sum
}
// reduce z sum jako Promise
async function addData2(data) {
  console.log('reduce start')
  const resultPromise = data.reduce(async (sumPromise, item) => {
    const sumValue = await sumPromise
    return asyncAdd(sumValue, item)
  }, 0)
  console.log('reduce end')
  return resultPromise
}
async function addData3(data) {
  const internalData = [...data]
  const sumsPromises = []
  while (internalData.length > 0) {
    const a = internalData.pop()
    const b = internalData.pop() || 0
    sumsPromises.push(asyncAdd(a, b))
  }
  const sums = await Promise.all(sumsPromises)
  return sums.reduce((acc, val) => acc += val, 0)
}
async function measurePerformance(name, cb) {
  console.log(`Start: ${name}`);
  performance.mark('mf-start')
  const result = await cb()
  performance.mark('mf-end')
  const runTime = performance.measure('Czas wykonania kodu', 'mf-start', 'mf-end')
  console.log(`Wynik z ${name}: ${result}`)
  console.log(`Czas wykonywania: ${runTime.duration.toFixed(2)}ms`)
}
async function asyncAdd(a, b) {
  if (typeof a !== 'number' || typeof b !== 'number') {
    console.log('err', { a, b })
    return Promise.reject('Argumenty muszą mieć typ number!')
  }
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(a + b)
    }, 10)
  })
}
