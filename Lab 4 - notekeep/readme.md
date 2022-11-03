## NotePocket

### Wersja hobbit
- Aplikacja pozwala na tworzenie, edycję przechowywanie i usuwanie notatek. Każda notatka musi w minimalnej formie posiadać:

> Tytuł  
> Treść  
> Kolor notatki  
> Pin (boolean) - możliwość przypięcia do góry na liście notatek  
> Datę utworzenia

Notatki powinny być zapisywane w localStorage i wyświetlane w formie tablicy notatek na stronie głównej aplikacji.

### Wersja elf
- Jednocześnie można odtworzyć jedynie wybrane kanały (np. tylko pierwszy i trzeci)
- Możliwe jest nadpisanie zawartości danego kanału
- Aplikacja posiada wbudowany prosty metronom (on/off, ilość uderzeń na minutę)

### Wersja ork
- Ilość kanałów jest dynamiczna (użytkownik może dodawać/kasować kanały)
- Automat może pełnić rolę looper-a. Czyli odtwarzanie kanałów zostaje zapętlone. Pamiętaj że wtedy kanały muszą mieć równą długość (możesz przyjąć czas/takty na sztywno lub user może podać)


### Przydatne
> Obsługa localStorage:  
> ```localStorage.getItem(key)```
> ```localStorage.setItem(key, stringValue)```
> ```localStorage.removeItem(key)```
> ```localStorage.clear()```

> Zapisywanie dat (timestamp lub ISO string):   
> ``` Date.now() //timestamp ```  
> ``` new Date().toISOString() //format ISO ```  
> Wyświetlanie daty  
> ``` dateObject.toLocaleString() ```  
> ``` dateObject.get*() ```
