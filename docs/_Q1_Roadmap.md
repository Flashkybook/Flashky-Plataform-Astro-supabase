## Improve the UX

- [x] UserStorage need in frontend
- [x] on fail add differences between words red and green for improve the focus

- [ ] Add text to speech chatgpt api
  - [ ] Change server response


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

- [x] Interface de estudio
  - [x] basic
    - [x] Api 
      - [x] get and generate random list study
      - [x] by last review
  - [x] on finish round
  - [x] study round
    - [x] no query
      - [x] random by last review or null
    - [x] Save in storage round
      - [x] save errors

  - [x] Pass Auth to local storage 
  
- [x] [TTS Api](https://github.com/Flashkybook/tts_api)
  - [x] [Deploy](https://tts-api-96an.onrender.com/tts/?expression=)

- [x] Integration de la api a los audios
  - [ ] feedback message

- [ ] save on finish get results
  - [ ] save next review by flashcards

- [ ] Testing and accessibility
  - [ ] Prioridades 
    - [ ] Auth
    - [ ] LocalDatabase
    - [ ] Sync database
    - [x] Refactor

- [ ] integrate chatgpt
  - [ ] determinate user level
  - [ ] expression surgers
  - [ ] icono de ¡ consulta que ayuda a pronunciar 
    - [ ] all data that chatgpt gives must be save in the expression description field because i don't want request chatgpt always 
  - [ ] determinate the price os chatgpt
  - [ ] generate a chatgpt assist for this 


# ⏱2 UI validations and testing

- [ ] add material UI
  - [ ] App bard
  - [ ] Dashboard cards
  - [ ] Lists
    - [ ] Audios
    - [ ] Statistics
- [ ] auth
  - [ ] User verify  
  - [ ] Validación de usuario autentificado para el crud ⏱3

- [ ] validate expressions  ⏱3
  - [ ] expression users => 0
  - [ ] card expression crud
    - [ ] suggestion de expression similar Expression o equal ⏱3
  - [ ] 
- [ ] set card
- [ ] databases query https://supabase.com/docs/reference/javascript/filter

- [ ] Modos de estudio
  - [ ] by book
  - [ ] by random
  - [x] all by last review
  - [ ] by params
    - [ ] book
    - [ ] quantity






# Q2 Mobil progressive web app and users verify expressions
- [ ] Base de datos local [web Database]
  - [ ] user anonymous
  - [ ] Use without connection and sync
  - [ ] delete Json



# Doc Ref

## DBsync

### IndexedDB 
  - https://caniuse.com/?search=IndexedDB
  - https://web.dev/articles/indexeddb-best-practices?hl=es-419
  - https://dexie.org/
  - https://developer.mozilla.org/es/docs/Web/API/IndexedDB_API/Using_IndexedDB
- cookies: for session from backend and expire data  
- locals
- Web SQL [❌ deprecated]






https://docs.astro.build/es/guides/backend/supabase/







