# Portale Sessione Click Day

Questo e un portale separato dal portale con le 50 prove.

Funziona cosi:

- ogni partecipante entra con le proprie credenziali;
- vede una sola sezione: Prova generale;
- puo fare Quiz 1, Quiz 2 e Quiz 3;
- dopo aver completato i 3 quiz, resta bloccato;
- l'amministratore entra nel pannello admin e preme Riavvia quiz;
- il sistema crea un nuovo giro con altri 3 quiz diversi, uguali per tutti;
- lo storico dei tempi e dei tentativi resta salvato.

Credenziali principali:

- Admin: `admin` / `admin123`
- Partecipanti: username nel formato nome.cognome / `prova123`
- Riccardo Aiello e stato sostituito da `elia.bonetti`
- Leonardo Aganetti e stato sostituito da `pietro.pioli`

Per pubblicarlo su Render usa un Web Service Node, non Static Site.
Su Render serve un disco persistente montato su:

`/opt/render/project/src/data`

Comandi:

- Build Command: `npm install`
- Start Command: `npm start`
