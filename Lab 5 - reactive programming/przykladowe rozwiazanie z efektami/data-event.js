export default class DataEvent {
  #subscribers = new Map()
  #tempEffectsSet = []
  createEvent(event) {
    return
  }
  addEffects(...cb) {
    this.#tempEffectsSet.push(...cb)
    return this
  }
  subscribe(event, cb) {
    if (!this.#isValidCallback(cb)) {
      throw new Error('invalid subscriber! Should be function or function array.')
    }
    const subs = this.#getSubscribers(event)
    const subWithEffects = this.#moveEffectsToSub(cb)
    subs.push(subWithEffects)
    this.#subscribers.set(event, subs)
    return this
  }
  emit(event, data) {
    const subs = this.#getSubscribers(event)
    for (let subsCollection of subs) {
      // zaczynamy obsługę strumienia od wartości z publishera
      let streamData = data
      for (let sub of subsCollection) {
        // każdy kolejny efekt może zmieniać wartość w strumieniu
        // w kodzie mamy duże uproszczenie - brakuje obsługi wyjątków, obsługi zwracenego nullish values itd
        const result = sub(streamData)
        streamData = result ?? streamData
      }
    }
  }
  #getSubscribers(event) {
    return this.#subscribers.has(event) ? this.#subscribers.get(event) : [];
  }
  #isValidCallback(cb) {
    return cb instanceof Function
  }
  #moveEffectsToSub(cb) {
    const ret = this.#tempEffectsSet.length > 0
      ? [...this.#tempEffectsSet, cb]
      : [cb]
    this.#tempEffectsSet = []
    return ret
  }
}

export function map(cb) {
  return cb
}
