import webpush from 'web-push'

const publicKey = 'somePublicKeysomePublicKeysomePublicKeysomePublicKeysomePublicKey'
const privateKey = 'veryPrivatePrivateKey'

let vapidKeys = {
  publicKey: 'BGN1pj4Ypf7sTbYL9dj2YaeXbBuaPGO7nWZ1IdrBWnhQw5sx8oG5l0Y0RLsRkpV6patAlng6rs72M628ZFGHEOE',
  privateKey: 'zddhDQ9tPGl9nzs7hhEpX3CB4UxFGCqIPALXXqu4oX0'
}

class PushService {
  #subscriptions = []
  #pushService
  constructor() {
    this.#createWebPushService()
  }

  async saveSubscription(subscription) {
    if (this.#subscriptions.some(el => JSON.stringity(el) === JSON.stringify(subscription))) {
      return true
    }
    this.#subscriptions.push(subscription)
    return true
  }
  #createWebPushService() {
    this.pushService = webpush

    if (!vapidKeys) {
      this.#generateVapidKeys()
    }

    this.pushService.setVapidDetails(
      'malito:r.brzegowy@gmail.com',
      vapidKeys.publicKey,
      vapidKeys.privateKey
    )
  }
  // onetimer
  #generateVapidKeys() {
    console.log('generating vapid keys')
    const vapidKeys = this.pushService.generateVAPIDKeys()
    console.log(vapidKeys)
  }
  pushNotification(data) {
    let ret = []
    for (let sub of this.#subscriptions) {
      const subIndex = this.#subscriptions.findIndex(el => el === sub)

      console.log('[API] Pushing notification to sub', subIndex)

      const push = this.pushService.sendNotification(sub, data)
        .catch(err => {
          console.log('[API] Push notification failed', err)
          // nie ma już tego sub-a
          if (err.statusCode === 410) {
            this.#removeSubscription(sub)
          }
        })
      ret.push(push)
    }
    return Promise.allSettled(ret)

  }
  #removeSubscription(subscription) {
    this.#subscriptions = this.#subscriptions.filter(el => el !== subscription)
  }
}
export default new PushService()