## Exercise 0.6: New note in Single page app diagram

```mermaid
sequenceDiagram
    participant browser
    participant server

    Note over browser: User types a note and clicks "Save"

    Note right of browser: spa.js handles the event, prevent default action and updates the UI immediately without reloading

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    Note right of browser: Sends JSON body: {content: "never gonna give you up", date: "2026-03-08T18:35:00.845Z"}
    activate server
    server-->>browser: 201 Created
    deactivate server

    Note over browser: No redirect, no page reload
```

---