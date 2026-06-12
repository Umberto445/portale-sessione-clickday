# Deploy Render

1. Crea un nuovo repository GitHub solo per questa cartella.
2. Carica tutti i file della cartella `portale-sessione-clickday`.
3. Su Render crea un nuovo Web Service.
4. Collega il repository.
5. Usa:
   - Runtime: Node
   - Build Command: `npm install`
   - Start Command: `npm start`
6. Scegli piano Starter se vuoi mantenere il sito sempre attivo.
7. Aggiungi un Persistent Disk:
   - Mount Path: `/opt/render/project/src/data`
   - Size: `1 GB`
8. Premi Deploy Web Service.

Importante: non usare Static Site, altrimenti i tentativi non vengono salvati correttamente.
