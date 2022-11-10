## Reactive programming, decoupling
Ćwiczenie nie wchodzi w skład projektów zaliczeniowych.

### Coupling  
Coupling to (biorąc rzecz baardzo powierzchownie) "sztywne" połączenie kilku miejsc w kodzie. Np.:
function A() {
  let secret = Math.random()
  B(secret)
}

Nie lubimy couplingu jeśli nie jest konieczny - utrudnia utrzymanie i reużywanie kodu, łamie podstawowe zasady programowania i robi inne straszne rzeczy. Unikaj couplingu.

### Todo 1
Usuń coupling z przykładu (index.js). 

### Todo 2
Zaprojektuj third-party bibliotekę która będzie pośredniczyć w komunikacji i wymianie danych między A, B i C. A także D, E itd.

### Todo 3
Spytaj prowadzącego, niespodzianka;)

### Przydatne
> Wzorzec Observer - Observable
