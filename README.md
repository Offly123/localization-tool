# Localization-tool

Tool for localizing videogames (LLM wrapper).

## Dependencies:

- Vue 3.5.22
- Vue-router 4.6.3
- Pinia 3.0.3
- @huggingface/transformers 3.8.0

## Structure
```bash
.
├── public
├── src
│   ├── App.vue
│   ├── assets - fonts, images
│   │   └── fonts/
│   ├── components
│   │   ├── ui/ - reusable components
│   │   └── layout/ - layout components (Header, Footer, etc)
│   ├── languages - JSONs with localized text
│   │   ├── availableLanguages.ts
│   │   ├── getLocalizedJSON.ts
│   │   └── jsons/ - localized JSONs
│   ├── main.ts
│   ├── routes
│   │   ├── ExampleView
│   │   │   └── ExampleView.vue
│   │   └── router.ts
│   └── stores
│       └── exampleStore.ts
├── index.html
└── base.css
```

###### ples help