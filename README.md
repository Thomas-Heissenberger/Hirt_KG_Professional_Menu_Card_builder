# Hirt_KG_Professional_Menu_Card_builder
Weil i wirklich ned was wos i do schreibn sull griagts mei persΓΆnliche Beschreibung von zeigs wos ma so hom
## .env Variablen
>Bitte dua ma an gfolln und moch a **'.env'** file im root Verzeichnis mit die folgenden Variablen, sunst blea i:
```emoji
SERVERPORT=...           dua wost wΓΌst
OUTPUTDIRECTORY=...      dua wost wΓΌst
INPUTDIRECTORY=...       is Verzeichnis wo die Template Docx drinnan is
TEMPLATEFILENAME=...     Noman vom Template Docx
RESULTFILENAME=...       Noman vom Docx wos drinnan gspeichat wean sui
JSONFILENAME=...         hawara gonz ealich i was sΓΆwa ned amol warum des do is
EXTENSION=...            docx|doc wos ondas geht ned (doc hob i no nie getestet π)
```

## Project Strucutre

```pre
ββββpublic
β   β   favicon.png
β   β   global.css
β   β   index.html
β   β   manifest.json
β   β   service-worker.js
β   β   titlebar.css
β   β
β   ββββbuild
β   β       bundle.css
β   β       bundle.js
β   β       bundle.js.map
β   β
β   ββββimages
β       ββββicons
β               icon-128x128.png
β               icon-144x144.png
β               icon-152x152.png
β               icon-192x192.png
β               icon-256x256.png
β               icon-32x32.png
β               icon-512x512.png
β               maskable_icon.png
β
ββββsrc
    β   App.svelte
    β   CreateMenu.svelte
    β   global.d.ts
    β   Menu.ts
    β   MenuPicker.svelte
    β   MenuPickerLayout.svelte
    β   Preview.svelte
    β   SelectMenu.svelte
    β   svelte.ts
    β   UtilsTest.svelte
    β
    ββββserver
        β   data.json
        β   menuCreator.js
        β   Wappla.docx
        β
        ββββtest
                MenuCard.docx
                MenuCard.pdf
```