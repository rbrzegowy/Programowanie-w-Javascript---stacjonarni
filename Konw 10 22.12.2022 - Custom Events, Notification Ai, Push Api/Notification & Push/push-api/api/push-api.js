import express from 'express'
import { json } from 'express'
import pushService from './push-service.js'
import cors from 'cors'

const port = 3000

const app = new express()
let isNotificationRunning = false

app.use(cors())
app.use(json())
app.listen(port, () => console.log('[API] Started'))

app.post('/api/subscribe-to-push', (req, res) => {
  console.log('[API] Sub to push requested', req.body)
  pushService.saveSubscription(req.body)
    .then((subscriptionId) => {
      startNotificationSpam()

      res.setHeader('Content-Type', 'application/json')
      res.send(JSON.stringify({ data: { status: 'registered', id: subscriptionId } }))
    })
    .catch((err) => {
      res.status(500)
      res.setHeader('Content-Type', 'application/json')
      const error = JSON.stringify({
        error: 'Rejestracja subskrypcji nie powiodła się.'
      })
    })
})
function startNotificationSpam() {
  if (isNotificationRunning) {
    return
  }
  isNotificationRunning = true
  let counter = 0
  setInterval(() => {
    const msg = JSON.stringify({ message: `Notification ${counter}. Bla bla bla. Bla!` })
    console.log('[API] Notification push: ', msg)
    pushService.pushNotification(msg)
    counter++
  }, 5000)

}