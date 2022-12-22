// ----------------------------
// Custom events
// ----------------------------
// Case: chcemy emitować własne eventy
// Rozwiązania:
// 1. extends EventTarget i CustomEvents
// 2. Własny mechanizm (np. metoda .listen(event, cb))
// 3. Zewn. bliblioteka (np. RxJS)

// Usuwanie event listenerow - pod przykładami 

// btn.addEventListener('click', () => {
//   const rndCol = `rgb(${random(255)}, ${random(255)}, ${random(255)})`;
//   document.body.style.backgroundColor = rndCol;
// }, { signal: controller.signal }); // pass an AbortSignal to this handler

// 1
// class Note extends EventTarget {
//   constructor(title, content) {
//     super()
//     this.title = title
//     this.content = content
//     this.id = this.#createId()
//     this.emitRemoveNoteAfter5s()
//     this.removeEvent = new CustomEvent('remove', {
//       // bubbles: true, // dla elementów html-owych
//       detail: { title: this.title, content: this.content, id: this.id }
//     })

//   }
//   #createId() {
//     const randomHash = () => Math.floor(Math.random() * 1000000).toString(36)
//     return randomHash() + '.' + randomHash()
//   }
//   emitRemoveNoteAfter5s() {
//     setInterval(() => {
//       console.log('[Note] dispatch Remove')
//       this.dispatchEvent(this.removeEvent)
//     }, 5000)
//   }
// }

// const note = new Note('notatka 1', 'test custom events')
// note.addEventListener('remove', (e) => console.log(e))


// 2
// Mechanizm eventow można wydzielić do osobnej klasy i dziedziczyć/komponować
// class Note {
//   #eventCallbacks = new Map()
//   #title
//   #content
//   #id
//   constructor(title, content) {
//     this.#title = title
//     this.#content = content
//     this.#id = this.#createId()
//     this.#emitRemoveNoteAfter5s()

//   }
//   #createId() {
//     const randomHash = () => Math.floor(Math.random() * 1000000).toString(36)
//     return randomHash() + '.' + randomHash()
//   }
//   #emitRemoveNoteAfter5s() {
//     setInterval(() => {
//       this.#dispatchEvent(
//         'remove',
//         { title: this.#title, content: this.#content, id: this.#id })
//     }, 5000)
//   }
//   #dispatchEvent(eventName, data) {
//     console.log('[Note] dispatch', eventName)
//     const callbacks = this.#getCallbacks(eventName)
//     for (const cb of callbacks) {
//       cb(data)
//     }
//   }
//   #getCallbacks(eventName) {
//     return this.#eventCallbacks.get(eventName) ?? []
//   }
//   listen(eventName, cb) {
//     const callbacks = this.#getCallbacks()
//     callbacks.push(cb)
//     this.#eventCallbacks.set(eventName, callbacks)
//   }
// }


// const note = new Note('notatka 1', 'test custom events')
// note.listen('remove', (e) => console.log(e))




// -------------------------------------------------------
// Usuwanie event listenerow - dla obiektów z EventTarget
// -------------------------------------------------------
// note.removeEventListener('remove', () => {})
// AbortController
const controller = new AbortController();

// note.addEventListener('remove', (e) => {
//   console.log()
// }, { signal: controller.signal });

// // somehow, somewhere, over the rainbow
// controller.abort()

