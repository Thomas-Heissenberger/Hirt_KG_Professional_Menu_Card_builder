# Hirt_KG_Professional_Menu_Card_builder
Weil i wirklich ned was wos i do schreibn sull griagts mei persönliche Beschreibung von zeigs wos ma so hom
## .env Variablen
>Bitte dua ma an gfolln und moch a **'.env'** file im root Verzeichnis mit die folgenden Variablen, sunst blea i:
```emoji
SERVERPORT=...           dua wost wüst
OUTPUTDIRECTORY=...      dua wost wüst
INPUTDIRECTORY=...       is Verzeichnis wo die Template Docx drinnan is
TEMPLATEFILENAME=...     Noman vom Template Docx
RESULTFILENAME=...       Noman vom Docx wos drinnan gspeichat wean sui
JSONFILENAME=...         hawara gonz ealich i was söwa ned amol warum des do is
EXTENSION=...            docx|doc wos ondas geht ned (doc hob i no nie getestet 😂)
```

## Project Strucutre

```pre
├───public
│   │   favicon.png
│   │   global.css
│   │   index.html
│   │   manifest.json
│   │   service-worker.js
│   │   titlebar.css
│   │
│   ├───build
│   │       bundle.css
│   │       bundle.js
│   │       bundle.js.map
│   │
│   └───images
│       └───icons
│               icon-128x128.png
│               icon-144x144.png
│               icon-152x152.png
│               icon-192x192.png
│               icon-256x256.png
│               icon-32x32.png
│               icon-512x512.png
│               maskable_icon.png
│
└───src
    │   App.svelte
    │   CreateMenu.svelte
    │   global.d.ts
    │   Menu.ts
    │   MenuPicker.svelte
    │   MenuPickerLayout.svelte
    │   Preview.svelte
    │   SelectMenu.svelte
    │   svelte.ts
    │   UtilsTest.svelte
    │
    └───server
        │   data.json
        │   menuCreator.js
        │   Wappla.docx
        │
        └───test
                MenuCard.docx
                MenuCard.pdf
```