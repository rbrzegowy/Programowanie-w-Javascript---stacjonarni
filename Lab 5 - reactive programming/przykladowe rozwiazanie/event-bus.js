// EventBus jest mocno generyczny, obsługuje nazwane zdarzenia 
// pozwala więc łączyć wiele zestawów publisher<-- (eventName)-- >subscribers 
export default class EventBus {
  static #subscribers = new Map()
  static subscribe(event, cb) {
    if (!this.#isValidCallback(cb)) {
      throw new Error('invalid subscriber! Should be function or function array.')
    }
    const subs = this.#getSubscribers(event)
    const normalizedSubs = this.#normalizeSubs(cb)
    subs.push(normalizedSubs)
    this.#subscribers.set(event, subs)
  }
  static emit(event, data) {
    const subs = this.#getSubscribers(event)
    for (let subsCollection of subs) {
      for (let sub of subsCollection) {
        sub(data)
      }
    }
  }
  static #getSubscribers(event) {
    return this.#subscribers.get(event) ?? [];
  }
  static #isValidCallback(cb) {
    return cb instanceof Function || cb instanceof Array
  }
  static #normalizeSubs(cb) {
    return cb instanceof Array
      ? cb
      : [cb]
  }
}

