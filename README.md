# Localization-tool

Tool for localizing videogames (ChatGPT wrapper).

Dependencies:
- 
- Vue 3.5.22
- Vue-router 4.6.3
- Pinia 3.0.3


Structure
- 
```bash
.
├── public
├── src
│   ├── App.vue
│   ├── assets - fonts, images
│   │   └── fonts
│   ├── components
│   │   └── layout - layout components (Header, Footer, etc)
│   ├── languages - JSONs with localized text
│   │   ├── availableLanguages.ts
│   │   └── getLocalizedJSON.ts
│   ├── main.ts
│   ├── routes
│   │   ├── ExampleView
│   │   │   └── ExampleView.vue
│   │   └── router.ts
│   └── stores
│       └── exampleStore.ts
├── base.css
└── index.html
```