
- [ ] quit user from cookies

# MVP app
- [x] autentificación
  - [x] Rutas protegidas y obtención de session de usuario 

- [x] Crud supabase
  - [x] book 📁
    - [x] add
    - [x] delete
    - [x] set
    - [x] delete cards in cascade

  - [x] crud card 
    - [x] add card and expressions
    - [x] delete card 

- [ ] Interface de estudio
  - [ ] basic
    - [x] Api 
      - [x] get and generate random list study
        - [x] by last review

      - [x] on finish round
    - [x] study round
      - [x] no query
        - [x] random by last review or null
      - [x] Save in storage round
        - [x] save errors
  
  - [ ] save On finish get results
    - [ ] save next review by flashcards
    - [x] Pass Auth to local storage 
    - [ ] TTS Api
      - [ ] Deploy


- [ ] Testing and accessibility
  - [ ] Prioridades 
    - [ ] Auth
    - [ ] LocalDatabase
    - [ ] Sync database
    - [ ] Refactor


- [ ] Modos de estudio
  - [ ] by book
  - [ ] by random
  - [x] all by last review
  - [ ] by params
    - [ ] book
    - [ ] quantity

## - [ ] UI,  validations and testing
- [ ] add material UI
  - [ ] App bard
  - [ ] Dashboard cards
  - [ ] Lists
    - [ ] Audios
    - [ ] Statistics
- [ ] auth
  - [ ] User verify  ⏱2
  - [ ] Validación de usuario autentificado para el crud ⏱3
- [ ] validate expressions  ⏱3
  - [ ] expression users => 0
  - [ ] card expression crud
    - [ ] suggestion de expression similar Expression o equal ⏱3
  - [ ] 
- [ ] set card

- [ ] databases query https://supabase.com/docs/reference/javascript/filter

## testing
https://youtu.be/JW_x-Tq5Vt0?t=2713



# Q2 Mobil progressive web app and users verify expressions
- [ ] Base de datos local [web Database]
  - [ ] user anonymous
  - [ ] Use without connection and sync
  - [ ] delete Json

# options sync db
### IndexedDB 
  - https://caniuse.com/?search=IndexedDB
  - https://web.dev/articles/indexeddb-best-practices?hl=es-419
  - https://dexie.org/
  - https://developer.mozilla.org/es/docs/Web/API/IndexedDB_API/Using_IndexedDB
- cookies: for session from backend and expire data  
- locals

- Web SQL [❌ deprecated]


# Ui
- https://material-foundation.github.io/material-theme-builder/
https://aribudin.github.io/tailmater/#


### Tailwind
[tailus](https://tailus.io/)


### material design
theme
- index
  - register
  - Login
  - try as long
- App bar
  - Account or login - register
  - Books
  - Lists expressions
  - New expression
- Ripple https://material-web.dev/components/ripple/
- dialog https://material-web.dev/components/dialog/



# [ ] Relación base de datos

- [ ] expresión: frase, palabra, sonido, etc
  - [ ] Lenguaje
  - [ ] agregado por
  - [ ] validación: determina si la expresión es correcta o debe mejorarse o si es similar
  - [ ] Relacionados
  - [ ] Tipo: Frase, American speed
  - [ ] Optimo generador de audio
    - [ ] url audio por api

- [ ] user-books
  - [ ] usuario
  - [ ] estadísticas de estudio
  - [ ] lista de expresiones
    - [ ] expresión-card-user
      - [ ] puntuación actual
      - [ ] Ultimo estudio
      - [ ] Proximo estudio
      - [ ] repetitions



https://docs.astro.build/es/guides/backend/supabase/


UI

https://material-foundation.github.io/material-theme-builder/


Algoritmos de Rsp

https://super-memory.com/english/ol/sm2.htm
https://github.com/Maxvien/supermemo


# Modelización

https://www.lemonsqueezy.com/