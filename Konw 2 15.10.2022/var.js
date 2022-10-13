// console.log(imie)
// var imie = 'Krzysio'

// function varTest() {
//   var x = 1
//   if (true) {
//     var x = 2
//     console.log(x)
//   }
//   console.log(x)
// }
// varTest()

var a = 1
var b = 1
function varNotDeclared() {
  a = 2
  var b = 10
  console.log(a, b)
}
console.log(a, b)
varNotDeclared()
console.log(a, b)

console.log(x)
// let x = 10

{
  let letVar
  const func = () => console.log(letVar)
  func()
  var letVar = 1
  func()
}


function letTest() {
  let x = 1
  if (true) {
    let x = 2 // different variable
    for (let x = 1; x < 11; x++) { //yet another variable
      log(x)
    }
    log(x) // 2
  }
  log(x) // 1
}

switch (key) {
  case value:
    {
      let a = 1
      break;
    }
  case value2:
    {
      let a = 2
      break;
    }
  default:
    break;
}

const a = [];
a.push(4)