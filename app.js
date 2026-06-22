const api = {
  async login(username, password) {
    return request("/api/login", { method: "POST", body: { username, password } });
  },
  async getRound() {
    return request("/api/round");
  },
  async saveAttempt(payload) {
    return request("/api/attempts", { method: "POST", body: payload });
  },
  async getAttempts() {
    return request("/api/attempts");
  },
  async resetAttempts() {
    return request("/api/attempts", { method: "DELETE" });
  },
};

async function request(path, options = {}) {
  const response = await fetch(path, {
    method: options.method || "GET",
    headers: { "Content-Type": "application/json" },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Errore richiesta");
  return data;
}

function radio(id, label, options, answer) {
  return { id, type: "radio", label, options, answer };
}

function checkbox(id, label, options, answer) {
  return { id, type: "checkbox", label, options, answer };
}

function select(id, label, options, answer) {
  return { id, type: "select", label, options, answer };
}

function text(id, label, answer) {
  return { id, type: "text", label, answer };
}

function exactText(id, label, answer) {
  return { id, type: "text", label, answer, caseSensitive: true };
}

const fixedQuizzes = [
  {
    "id": "bando-isi-2025-prova-1",
    "slot": 1,
    "title": "Prova 1",
    "description": "Bando ISI 2025 - simulazione con dati completi visibili nella domanda.",
    "questions": [
      {
        "id": "p1-1",
        "type": "select",
        "label": "Codice identificativo: +3b404cb3dcf6fc253b8f9f1f6a9c1b3a18fbcff8200744739c62fff649dd50d6. Selezionare i primi 7 caratteri del codice identificativo, compreso il segno.",
        "options": [
          "+3b404c0",
          "+3b404c",
          "3b404c",
          "+3b404"
        ],
        "answer": "+3b404c"
      },
      {
        "id": "p1-2",
        "type": "select",
        "label": "Data odierna simulata: 24/06/2026, mercoledi. Selezionare il giorno della data odierna.",
        "options": [
          "22",
          "25",
          "23",
          "26",
          "24",
          "42"
        ],
        "answer": "24"
      },
      {
        "id": "p1-3",
        "type": "select",
        "label": "Bando: Bando ISI 2025; anno click day: 2026. Selezionare le ultime due cifre dell'anno del bando.",
        "options": [
          "23",
          "24",
          "27",
          "52",
          "26",
          "25"
        ],
        "answer": "25"
      },
      {
        "id": "p1-4",
        "type": "select",
        "label": "Assi di finanziamento: 5; asse domanda: Asse 1.1. Selezionare il numero degli assi di finanziamento.",
        "options": [
          "5",
          "3",
          "7",
          "0",
          "4",
          "6"
        ],
        "answer": "5"
      },
      {
        "id": "p1-5",
        "type": "select",
        "label": "Bando: Bando ISI 2025; anno click day: 2026. Selezionare le vocali contenute nelle parole \"Bando ISI\".",
        "options": [
          "Bando ISI 2025",
          "aoii",
          "ISI 2025",
          "2025",
          "Bando ISI",
          "Bando ISI 2026"
        ],
        "answer": "aoii"
      },
      {
        "id": "p1-6",
        "type": "select",
        "label": "Sito INAIL: https://www.inail.it; ente: INAIL. Selezionare l'indirizzo ufficiale del sito INAIL.",
        "options": [
          "INPS",
          "INAIL",
          "https://www.inail.it",
          "http",
          "https",
          "inail"
        ],
        "answer": "https://www.inail.it"
      },
      {
        "id": "p1-7",
        "type": "select",
        "label": "Bandiera italiana in ordine: verde-bianco-rosso. Selezionare il numero dei colori della bandiera italiana.",
        "options": [
          "bianco",
          "rosso",
          "verde",
          "blu",
          "tre",
          "giallo"
        ],
        "answer": "tre"
      },
      {
        "id": "p1-8",
        "type": "select",
        "label": "Selezionare il risultato di novantanove meno sei.",
        "options": [
          "93",
          "95",
          "92",
          "91",
          "94",
          "39"
        ],
        "answer": "93"
      },
      {
        "id": "p1-9",
        "type": "checkbox",
        "label": "Dichiarazione di presa visione delle regole tecniche.",
        "options": [
          "Dichiarazione di presa visione delle regole tecniche"
        ],
        "answer": [
          "Dichiarazione di presa visione delle regole tecniche"
        ]
      },
      {
        "id": "p1-10",
        "type": "checkbox",
        "label": "Non sono un robot.",
        "options": [
          "Non sono un robot"
        ],
        "answer": [
          "Non sono un robot"
        ]
      }
    ]
  },
  {
    "id": "bando-isi-2025-prova-2",
    "slot": 2,
    "title": "Prova 2",
    "description": "Bando ISI 2025 - simulazione con dati completi visibili nella domanda.",
    "questions": [
      {
        "id": "p2-1",
        "type": "select",
        "label": "Codice identificativo: +3b404cb3dcf6fc253b8f9f1f6a9c1b3a18fbcff8200744739c62fff649dd50d6. Selezionare gli ultimi 7 caratteri del codice identificativo.",
        "options": [
          "dd50d6",
          "9dd50d6",
          "9dd50d60",
          "9dd50d"
        ],
        "answer": "9dd50d6"
      },
      {
        "id": "p2-2",
        "type": "select",
        "label": "Data odierna simulata: 24/06/2026, mercoledi. Selezionare il mese della data odierna in lettere.",
        "options": [
          "Bando ISI 2026",
          "Bando ISI 2025",
          "ISI 2025",
          "2025",
          "giugno",
          "Bando ISI"
        ],
        "answer": "giugno"
      },
      {
        "id": "p2-3",
        "type": "select",
        "label": "Momento 5: 24/06/2026 ore 11:00. Selezionare la data del Momento 5.",
        "options": [
          "19/06/2026",
          "22/06/2026",
          "24-06-2026",
          "24/06/2026",
          "18/05/2026",
          "23/06/2026"
        ],
        "answer": "24/06/2026"
      },
      {
        "id": "p2-4",
        "type": "select",
        "label": "Stanziamento: 508.000.000,00. Selezionare l'importo dello stanziamento.",
        "options": [
          "508.000.000,00",
          "580.000.000,00",
          "508.000,00",
          "508000000",
          "508",
          "08.000.000,00"
        ],
        "answer": "508.000.000,00"
      },
      {
        "id": "p2-5",
        "type": "text",
        "label": "Scrivere \"Amministratore\" senza considerare gli spazi.",
        "answer": "Amministratore",
        "caseSensitive": true
      },
      {
        "id": "p2-6",
        "type": "select",
        "label": "Sito INAIL: https://www.inail.it; ente: INAIL. Partecipante: Mario Rossi; email: mario.rossi@impresa.it; telefono: +39 347 1234567. Selezionare il nome dell'Istituto che eroga il finanziamento.",
        "options": [
          "INAIL",
          "inail",
          "https://www.inail.it",
          "https",
          "http",
          "INPS"
        ],
        "answer": "INAIL"
      },
      {
        "id": "p2-7",
        "type": "select",
        "label": "Browser compatibili: Chrome, Firefox, Edge; browser non compatibili: Safari, Opera. Selezionare una coppia di browser non compatibili.",
        "options": [
          "Chrome",
          "Edge",
          "Opera",
          "Safari",
          "Safari e Opera",
          "Firefox"
        ],
        "answer": "Safari e Opera"
      },
      {
        "id": "p2-8",
        "type": "select",
        "label": "Partecipante: Mario Rossi; email: mario.rossi@impresa.it; telefono: +39 347 1234567. Selezionare il cognome del partecipante.",
        "options": [
          "Mario Rossi",
          "rossi",
          "Rossi",
          "mario",
          "Mario",
          "Rossi Mario"
        ],
        "answer": "Rossi"
      },
      {
        "id": "p2-9",
        "type": "checkbox",
        "label": "Dichiarazione di presa visione delle regole tecniche.",
        "options": [
          "Dichiarazione di presa visione delle regole tecniche"
        ],
        "answer": [
          "Dichiarazione di presa visione delle regole tecniche"
        ]
      },
      {
        "id": "p2-10",
        "type": "checkbox",
        "label": "Non sono un robot.",
        "options": [
          "Non sono un robot"
        ],
        "answer": [
          "Non sono un robot"
        ]
      }
    ]
  },
  {
    "id": "bando-isi-2025-prova-3",
    "slot": 3,
    "title": "Prova 3",
    "description": "Bando ISI 2025 - simulazione con dati completi visibili nella domanda.",
    "questions": [
      {
        "id": "p3-1",
        "type": "select",
        "label": "Codice identificativo: +3b404cb3dcf6fc253b8f9f1f6a9c1b3a18fbcff8200744739c62fff649dd50d6. Selezionare il carattere iniziale del codice identificativo.",
        "options": [
          "+"
        ],
        "answer": "+"
      },
      {
        "id": "p3-2",
        "type": "select",
        "label": "Data odierna simulata: 24/06/2026, mercoledi. Selezionare l'anno della data odierna.",
        "options": [
          "2024",
          "2025",
          "6202",
          "2028",
          "2026",
          "2027"
        ],
        "answer": "2026"
      },
      {
        "id": "p3-3",
        "type": "select",
        "label": "Momento 6: 24/06/2026 ore 11:20. Selezionare i minuti del Momento 6.",
        "options": [
          "18",
          "22",
          "2",
          "20",
          "21",
          "19"
        ],
        "answer": "20"
      },
      {
        "id": "p3-4",
        "type": "select",
        "label": "Stanziamento: 508.000.000,00. Selezionare la somma delle cifre diverse da zero dello stanziamento 508.000.000,00.",
        "options": [
          "11",
          "31",
          "13",
          "14",
          "12",
          "15"
        ],
        "answer": "13"
      },
      {
        "id": "p3-5",
        "type": "select",
        "label": "Bando: Bando ISI 2025; anno click day: 2026. Selezionare le consonanti contenute nelle parole \"Bando ISI\".",
        "options": [
          "2025",
          "bnds",
          "Bando ISI 2025",
          "Bando ISI 2026",
          "Bando ISI",
          "ISI 2025"
        ],
        "answer": "bnds"
      },
      {
        "id": "p3-6",
        "type": "select",
        "label": "Sito INAIL: https://www.inail.it; ente: INAIL. Selezionare il protocollo corretto del sito INAIL.",
        "options": [
          "https",
          "INAIL",
          "INPS",
          "inail",
          "http",
          "https://www.inail.it"
        ],
        "answer": "https"
      },
      {
        "id": "p3-7",
        "type": "select",
        "label": "Bandiera italiana in ordine: verde-bianco-rosso. Selezionare i colori della bandiera italiana in ordine corretto.",
        "options": [
          "verde",
          "bianco",
          "rosso",
          "giallo",
          "blu",
          "verde-bianco-rosso"
        ],
        "answer": "verde-bianco-rosso"
      },
      {
        "id": "p3-8",
        "type": "select",
        "label": "Partecipante: Mario Rossi; email: mario.rossi@impresa.it; telefono: +39 347 1234567. Selezionare l'indirizzo email del partecipante.",
        "options": [
          "mario.rossi@impresa.it",
          "Rossi",
          "Mario Rossi",
          "Rossi Mario",
          "mario",
          "Mario"
        ],
        "answer": "mario.rossi@impresa.it"
      },
      {
        "id": "p3-9",
        "type": "checkbox",
        "label": "Dichiarazione di presa visione delle regole tecniche.",
        "options": [
          "Dichiarazione di presa visione delle regole tecniche"
        ],
        "answer": [
          "Dichiarazione di presa visione delle regole tecniche"
        ]
      },
      {
        "id": "p3-10",
        "type": "checkbox",
        "label": "Non sono un robot.",
        "options": [
          "Non sono un robot"
        ],
        "answer": [
          "Non sono un robot"
        ]
      }
    ]
  },
  {
    "id": "bando-isi-2025-prova-4",
    "slot": 4,
    "title": "Prova 4",
    "description": "Bando ISI 2025 - simulazione con dati completi visibili nella domanda.",
    "questions": [
      {
        "id": "p4-1",
        "type": "select",
        "label": "Codice identificativo: +3b404cb3dcf6fc253b8f9f1f6a9c1b3a18fbcff8200744739c62fff649dd50d6. Selezionare i primi 7 caratteri del codice identificativo senza considerare il segno iniziale.",
        "options": [
          "3b404cb0",
          "3b404cb",
          "b404cb",
          "3b404c"
        ],
        "answer": "3b404cb"
      },
      {
        "id": "p4-2",
        "type": "select",
        "label": "Data odierna simulata: 24/06/2026, mercoledi. Selezionare la data odierna nel formato GG/MM/AAAA.",
        "options": [
          "23/06/2026",
          "18/05/2026",
          "19/06/2026",
          "22/06/2026",
          "24/06/2026",
          "24-06-2026"
        ],
        "answer": "24/06/2026"
      },
      {
        "id": "p4-3",
        "type": "select",
        "label": "Momento 5: 24/06/2026 ore 11:00. Selezionare l'ora del Momento 5.",
        "options": [
          "10.00",
          "11:20",
          "18:00",
          "11.2",
          "10:00",
          "11:00"
        ],
        "answer": "11:00"
      },
      {
        "id": "p4-4",
        "type": "select",
        "label": "Bando: Bando ISI 2025; anno click day: 2026. Selezionare l'anno del bando a cui si partecipa.",
        "options": [
          "2025",
          "2023",
          "2027",
          "5202",
          "2024",
          "2026"
        ],
        "answer": "2025"
      },
      {
        "id": "p4-5",
        "type": "select",
        "label": "Sito INAIL: https://www.inail.it; ente: INAIL. Selezionare le vocali contenute nella parola \"INAIL\".",
        "options": [
          "INAIL",
          "iai",
          "https",
          "http",
          "inail",
          "INPS"
        ],
        "answer": "iai"
      },
      {
        "id": "p4-6",
        "type": "select",
        "label": "Sito INAIL: https://www.inail.it; ente: INAIL. Selezionare il dominio del sito INAIL.",
        "options": [
          "INPS",
          "INAIL",
          "inail.it",
          "http",
          "https",
          "inail"
        ],
        "answer": "inail.it"
      },
      {
        "id": "p4-7",
        "type": "select",
        "label": "Bandiera italiana in ordine: verde-bianco-rosso. Selezionare i colori della bandiera italiana in ordine inverso.",
        "options": [
          "bianco",
          "rosso",
          "verde",
          "blu",
          "rosso-bianco-verde",
          "giallo"
        ],
        "answer": "rosso-bianco-verde"
      },
      {
        "id": "p4-8",
        "type": "select",
        "label": "Partecipante: Mario Rossi; email: mario.rossi@impresa.it; telefono: +39 347 1234567. Selezionare il nome del partecipante.",
        "options": [
          "Mario",
          "Rossi Mario",
          "Mario Rossi",
          "mario",
          "Rossi",
          "rossi"
        ],
        "answer": "Mario"
      },
      {
        "id": "p4-9",
        "type": "checkbox",
        "label": "Dichiarazione di presa visione delle regole tecniche.",
        "options": [
          "Dichiarazione di presa visione delle regole tecniche"
        ],
        "answer": [
          "Dichiarazione di presa visione delle regole tecniche"
        ]
      },
      {
        "id": "p4-10",
        "type": "checkbox",
        "label": "Non sono un robot.",
        "options": [
          "Non sono un robot"
        ],
        "answer": [
          "Non sono un robot"
        ]
      }
    ]
  },
  {
    "id": "bando-isi-2025-prova-5",
    "slot": 5,
    "title": "Prova 5",
    "description": "Bando ISI 2025 - simulazione con dati completi visibili nella domanda.",
    "questions": [
      {
        "id": "p5-1",
        "type": "select",
        "label": "Codice identificativo: +3b404cb3dcf6fc253b8f9f1f6a9c1b3a18fbcff8200744739c62fff649dd50d6. Selezionare dal quarto al nono carattere del codice identificativo, includendo gli estremi.",
        "options": [
          "04cb3",
          "404cb3",
          "404cb30",
          "404cb"
        ],
        "answer": "404cb3"
      },
      {
        "id": "p5-2",
        "type": "select",
        "label": "Data odierna simulata: 24/06/2026, mercoledi. Selezionare il giorno della settimana della data odierna.",
        "options": [
          "Bando ISI 2026",
          "Bando ISI 2025",
          "ISI 2025",
          "2025",
          "mercoledì",
          "Bando ISI"
        ],
        "answer": "mercoledì"
      },
      {
        "id": "p5-3",
        "type": "select",
        "label": "Momento 1: 18/05/2026 ore 10:00. Selezionare la data del Momento 1.",
        "options": [
          "22/06/2026",
          "23/06/2026",
          "24-06-2026",
          "18/05/2026",
          "19/06/2026",
          "24/06/2026"
        ],
        "answer": "18/05/2026"
      },
      {
        "id": "p5-4",
        "type": "select",
        "label": "Stanziamento: 508.000.000,00. Selezionare la prima cifra dello stanziamento.",
        "options": [
          "5",
          "7",
          "3",
          "6",
          "4",
          "0"
        ],
        "answer": "5"
      },
      {
        "id": "p5-5",
        "type": "text",
        "label": "Scrivere \"Sportello informatico\" senza spazi.",
        "answer": "Sportelloinformatico",
        "caseSensitive": true
      },
      {
        "id": "p5-6",
        "type": "select",
        "label": "Sito INAIL: https://www.inail.it; ente: INAIL. Selezionare l'estensione corretta del dominio INAIL.",
        "options": [
          ".it",
          "INPS",
          "http",
          "inail",
          "https",
          "INAIL"
        ],
        "answer": ".it"
      },
      {
        "id": "p5-7",
        "type": "select",
        "label": "Bandiera italiana in ordine: verde-bianco-rosso. Selezionare il secondo colore della bandiera italiana.",
        "options": [
          "verde",
          "giallo",
          "verde-bianco-rosso",
          "blu",
          "bianco",
          "rosso"
        ],
        "answer": "bianco"
      },
      {
        "id": "p5-8",
        "type": "select",
        "label": "Selezionare le ultime tre cifre del numero telefonico.",
        "options": [
          "566",
          "765",
          "567",
          "565",
          "568",
          "569"
        ],
        "answer": "567"
      },
      {
        "id": "p5-9",
        "type": "checkbox",
        "label": "Dichiarazione di presa visione delle regole tecniche.",
        "options": [
          "Dichiarazione di presa visione delle regole tecniche"
        ],
        "answer": [
          "Dichiarazione di presa visione delle regole tecniche"
        ]
      },
      {
        "id": "p5-10",
        "type": "checkbox",
        "label": "Non sono un robot.",
        "options": [
          "Non sono un robot"
        ],
        "answer": [
          "Non sono un robot"
        ]
      }
    ]
  },
  {
    "id": "bando-isi-2025-prova-6",
    "slot": 6,
    "title": "Prova 6",
    "description": "Bando ISI 2025 - simulazione con dati completi visibili nella domanda.",
    "questions": [
      {
        "id": "p6-1",
        "type": "select",
        "label": "Codice identificativo: +3b404cb3dcf6fc253b8f9f1f6a9c1b3a18fbcff8200744739c62fff649dd50d6. Selezionare dal quarto al quindicesimo carattere del codice identificativo.",
        "options": [
          "04cb3dcf6fc",
          "404cb3dcf6fc0",
          "404cb3dcf6fc",
          "404cb3dcf6f"
        ],
        "answer": "404cb3dcf6fc"
      },
      {
        "id": "p6-2",
        "type": "select",
        "label": "Data odierna simulata: 24/06/2026, mercoledi. Selezionare il mese della data odierna in numero.",
        "options": [
          "4",
          "5",
          "60",
          "8",
          "06",
          "7"
        ],
        "answer": "06"
      },
      {
        "id": "p6-3",
        "type": "select",
        "label": "Momento 3: 22/06/2026 ore 10:00. Selezionare la data del Momento 3.",
        "options": [
          "24/06/2026",
          "23/06/2026",
          "24-06-2026",
          "22/06/2026",
          "18/05/2026",
          "19/06/2026"
        ],
        "answer": "22/06/2026"
      },
      {
        "id": "p6-4",
        "type": "select",
        "label": "Stanziamento: 508.000.000,00. Selezionare il numero composto dalla prima, seconda e terza cifra diversa da zero dello stanziamento.",
        "options": [
          "506",
          "805",
          "508",
          "509",
          "507",
          "510"
        ],
        "answer": "508"
      },
      {
        "id": "p6-5",
        "type": "select",
        "label": "Sito INAIL: https://www.inail.it; ente: INAIL. Selezionare le consonanti della parola \"INAIL\".",
        "options": [
          "http",
          "nl",
          "INAIL",
          "INPS",
          "inail",
          "https"
        ],
        "answer": "nl"
      },
      {
        "id": "p6-6",
        "type": "select",
        "label": "Sito INAIL: https://www.inail.it; ente: INAIL. Selezionare il sito errato tra https://www.inail.it e https://www.inail.ti.",
        "options": [
          "https://www.inail.ti",
          "INAIL",
          "INPS",
          "inail",
          "https",
          "http"
        ],
        "answer": "https://www.inail.ti"
      },
      {
        "id": "p6-7",
        "type": "select",
        "label": "Bandiera italiana in ordine: verde-bianco-rosso. Selezionare il primo colore della bandiera italiana.",
        "options": [
          "bianco",
          "rosso",
          "giallo",
          "blu",
          "verde-bianco-rosso",
          "verde"
        ],
        "answer": "verde"
      },
      {
        "id": "p6-8",
        "type": "select",
        "label": "Sito INAIL: https://www.inail.it; ente: INAIL. Partecipante: Mario Rossi; email: mario.rossi@impresa.it; telefono: +39 347 1234567. Selezionare il dominio dell'email del partecipante.",
        "options": [
          "impresa.it",
          "INPS",
          "inail",
          "https",
          "http",
          "INAIL"
        ],
        "answer": "impresa.it"
      },
      {
        "id": "p6-9",
        "type": "checkbox",
        "label": "Dichiarazione di presa visione delle regole tecniche.",
        "options": [
          "Dichiarazione di presa visione delle regole tecniche"
        ],
        "answer": [
          "Dichiarazione di presa visione delle regole tecniche"
        ]
      },
      {
        "id": "p6-10",
        "type": "checkbox",
        "label": "Non sono un robot.",
        "options": [
          "Non sono un robot"
        ],
        "answer": [
          "Non sono un robot"
        ]
      }
    ]
  },
  {
    "id": "bando-isi-2025-prova-7",
    "slot": 7,
    "title": "Prova 7",
    "description": "Bando ISI 2025 - simulazione con dati completi visibili nella domanda.",
    "questions": [
      {
        "id": "p7-1",
        "type": "select",
        "label": "Codice identificativo: +3b404cb3dcf6fc253b8f9f1f6a9c1b3a18fbcff8200744739c62fff649dd50d6. Selezionare il quarto carattere del codice identificativo.",
        "options": [
          "6",
          "4",
          "5",
          "3",
          "0",
          "2"
        ],
        "answer": "4"
      },
      {
        "id": "p7-2",
        "type": "select",
        "label": "Data odierna simulata: 24/06/2026, mercoledi. Selezionare le ultime due cifre dell'anno della data odierna.",
        "options": [
          "24",
          "27",
          "25",
          "28",
          "26",
          "62"
        ],
        "answer": "26"
      },
      {
        "id": "p7-3",
        "type": "select",
        "label": "Momento 6: 24/06/2026 ore 11:20. Selezionare l'ora del Momento 6.",
        "options": [
          "10.00",
          "11:00",
          "18:00",
          "11.2",
          "10:00",
          "11:20"
        ],
        "answer": "11:20"
      },
      {
        "id": "p7-4",
        "type": "select",
        "label": "Stanziamento: 508.000.000,00. Selezionare il numero di zeri nello stanziamento 508.000.000,00 considerando solo 508000000.",
        "options": [
          "6",
          "4",
          "8",
          "0",
          "5",
          "7"
        ],
        "answer": "6"
      },
      {
        "id": "p7-5",
        "type": "select",
        "label": "Bando: Bando ISI 2025; anno click day: 2026. Selezionare le iniziali delle parole \"Bando ISI\".",
        "options": [
          "Bando ISI 2025",
          "BI",
          "ISI 2025",
          "2025",
          "Bando ISI",
          "Bando ISI 2026"
        ],
        "answer": "BI"
      },
      {
        "id": "p7-6",
        "type": "select",
        "label": "Browser compatibili: Chrome, Firefox, Edge; browser non compatibili: Safari, Opera. Selezionare il browser compatibile tra Chrome e Safari.",
        "options": [
          "Edge",
          "Firefox",
          "Chrome",
          "Chrome e Firefox",
          "Opera",
          "Safari"
        ],
        "answer": "Chrome"
      },
      {
        "id": "p7-7",
        "type": "select",
        "label": "Bandiera italiana in ordine: verde-bianco-rosso. Selezionare il terzo colore della bandiera italiana.",
        "options": [
          "bianco",
          "giallo",
          "verde",
          "verde-bianco-rosso",
          "rosso",
          "blu"
        ],
        "answer": "rosso"
      },
      {
        "id": "p7-8",
        "type": "select",
        "label": "Partecipante: Mario Rossi; email: mario.rossi@impresa.it; telefono: +39 347 1234567. Selezionare lo username dell'email del partecipante.",
        "options": [
          "mario.rossi",
          "Mario Rossi",
          "Rossi",
          "Rossi Mario",
          "Mario",
          "mario"
        ],
        "answer": "mario.rossi"
      },
      {
        "id": "p7-9",
        "type": "checkbox",
        "label": "Dichiarazione di presa visione delle regole tecniche.",
        "options": [
          "Dichiarazione di presa visione delle regole tecniche"
        ],
        "answer": [
          "Dichiarazione di presa visione delle regole tecniche"
        ]
      },
      {
        "id": "p7-10",
        "type": "checkbox",
        "label": "Non sono un robot.",
        "options": [
          "Non sono un robot"
        ],
        "answer": [
          "Non sono un robot"
        ]
      }
    ]
  },
  {
    "id": "bando-isi-2025-prova-8",
    "slot": 8,
    "title": "Prova 8",
    "description": "Bando ISI 2025 - simulazione con dati completi visibili nella domanda.",
    "questions": [
      {
        "id": "p8-1",
        "type": "select",
        "label": "Codice identificativo: +3b404cb3dcf6fc253b8f9f1f6a9c1b3a18fbcff8200744739c62fff649dd50d6. Selezionare l'ultimo carattere del codice identificativo.",
        "options": [
          "7",
          "6",
          "8",
          "0",
          "4",
          "5"
        ],
        "answer": "6"
      },
      {
        "id": "p8-2",
        "type": "select",
        "label": "Data odierna simulata: 24/06/2026, mercoledi. Selezionare la data odierna senza separatori.",
        "options": [
          "24062025",
          "24062027",
          "24062024",
          "62026042",
          "24062026",
          "24062028"
        ],
        "answer": "24062026"
      },
      {
        "id": "p8-3",
        "type": "select",
        "label": "Momento 6: 24/06/2026 ore 11:20. Selezionare la data del Momento 6.",
        "options": [
          "19/06/2026",
          "22/06/2026",
          "24-06-2026",
          "24/06/2026",
          "18/05/2026",
          "23/06/2026"
        ],
        "answer": "24/06/2026"
      },
      {
        "id": "p8-4",
        "type": "select",
        "label": "Assi di finanziamento: 5; asse domanda: Asse 1.1. Selezionare il numero degli assi scritto in lettere.",
        "options": [
          "cinque",
          "1.1",
          "Asse 2",
          "Asse 1.1",
          "Asse 1",
          "5"
        ],
        "answer": "cinque"
      },
      {
        "id": "p8-5",
        "type": "text",
        "label": "Scrivere \"Regole tecniche\" senza spazi.",
        "answer": "Regoletecniche",
        "caseSensitive": true
      },
      {
        "id": "p8-6",
        "type": "select",
        "label": "Sito INAIL: https://www.inail.it; ente: INAIL. Partecipante: Mario Rossi; email: mario.rossi@impresa.it; telefono: +39 347 1234567. Selezionare il nome corretto dell'ente tra INAIL e INPS.",
        "options": [
          "INAIL",
          "inail",
          "https://www.inail.it",
          "https",
          "http",
          "INPS"
        ],
        "answer": "INAIL"
      },
      {
        "id": "p8-7",
        "type": "select",
        "label": "Bandiera italiana in ordine: verde-bianco-rosso. Selezionare i colori non in sequenza corretta: rosso-verde-bianco.",
        "options": [
          "verde",
          "rosso",
          "blu",
          "giallo",
          "rosso-verde-bianco",
          "bianco"
        ],
        "answer": "rosso-verde-bianco"
      },
      {
        "id": "p8-8",
        "type": "select",
        "label": "Partecipante: Mario Rossi; email: mario.rossi@impresa.it; telefono: +39 347 1234567. Selezionare il numero di cifre del telefono senza prefisso internazionale.",
        "options": [
          "9",
          "1",
          "10",
          "8",
          "11",
          "12"
        ],
        "answer": "10"
      },
      {
        "id": "p8-9",
        "type": "checkbox",
        "label": "Dichiarazione di presa visione delle regole tecniche.",
        "options": [
          "Dichiarazione di presa visione delle regole tecniche"
        ],
        "answer": [
          "Dichiarazione di presa visione delle regole tecniche"
        ]
      },
      {
        "id": "p8-10",
        "type": "checkbox",
        "label": "Non sono un robot.",
        "options": [
          "Non sono un robot"
        ],
        "answer": [
          "Non sono un robot"
        ]
      }
    ]
  },
  {
    "id": "bando-isi-2025-prova-9",
    "slot": 9,
    "title": "Prova 9",
    "description": "Bando ISI 2025 - simulazione con dati completi visibili nella domanda.",
    "questions": [
      {
        "id": "p9-1",
        "type": "select",
        "label": "Codice identificativo: +3b404cb3dcf6fc253b8f9f1f6a9c1b3a18fbcff8200744739c62fff649dd50d6. Selezionare il penultimo carattere del codice identificativo.",
        "options": [
          "D",
          "d"
        ],
        "answer": "d"
      },
      {
        "id": "p9-2",
        "type": "select",
        "label": "Momento 5: 24/06/2026 ore 11:00. Selezionare il giorno del Momento 5.",
        "options": [
          "22",
          "23",
          "42",
          "26",
          "24",
          "25"
        ],
        "answer": "24"
      },
      {
        "id": "p9-3",
        "type": "select",
        "label": "Bando: Bando ISI 2025; anno click day: 2026. Selezionare il bando completo.",
        "options": [
          "2025",
          "ISI 2025",
          "2026",
          "Bando ISI 2025",
          "Bando ISI 2026",
          "Bando ISI"
        ],
        "answer": "Bando ISI 2025"
      },
      {
        "id": "p9-4",
        "type": "select",
        "label": "Selezionare la somma di 5 più 8.",
        "options": [
          "11",
          "31",
          "13",
          "14",
          "12",
          "15"
        ],
        "answer": "13"
      },
      {
        "id": "p9-5",
        "type": "select",
        "label": "Bando: Bando ISI 2025; anno click day: 2026. Selezionare il numero di parole in \"Bando ISI\".",
        "options": [
          "5",
          "2",
          "3",
          "1",
          "4",
          "0"
        ],
        "answer": "2"
      },
      {
        "id": "p9-6",
        "type": "select",
        "label": "Browser compatibili: Chrome, Firefox, Edge; browser non compatibili: Safari, Opera. Selezionare il browser non compatibile tra Edge e Opera.",
        "options": [
          "Opera",
          "Chrome",
          "Firefox",
          "Edge",
          "Safari",
          "Chrome e Firefox"
        ],
        "answer": "Opera"
      },
      {
        "id": "p9-7",
        "type": "select",
        "label": "Bandiera italiana in ordine: verde-bianco-rosso. Selezionare le iniziali dei colori verde-bianco-rosso.",
        "options": [
          "verde",
          "bianco",
          "rosso",
          "giallo",
          "blu",
          "vbr"
        ],
        "answer": "vbr"
      },
      {
        "id": "p9-8",
        "type": "select",
        "label": "Partecipante: Mario Rossi; email: mario.rossi@impresa.it; telefono: +39 347 1234567. Selezionare nome e cognome del partecipante.",
        "options": [
          "Mario Rossi",
          "Rossi",
          "Rossi Mario",
          "mario",
          "rossi",
          "Mario"
        ],
        "answer": "Mario Rossi"
      },
      {
        "id": "p9-9",
        "type": "checkbox",
        "label": "Dichiarazione di presa visione delle regole tecniche.",
        "options": [
          "Dichiarazione di presa visione delle regole tecniche"
        ],
        "answer": [
          "Dichiarazione di presa visione delle regole tecniche"
        ]
      },
      {
        "id": "p9-10",
        "type": "checkbox",
        "label": "Non sono un robot.",
        "options": [
          "Non sono un robot"
        ],
        "answer": [
          "Non sono un robot"
        ]
      }
    ]
  },
  {
    "id": "bando-isi-2025-prova-10",
    "slot": 10,
    "title": "Prova 10",
    "description": "Bando ISI 2025 - simulazione con dati completi visibili nella domanda.",
    "questions": [
      {
        "id": "p10-1",
        "type": "select",
        "label": "Codice identificativo: +3b404cb3dcf6fc253b8f9f1f6a9c1b3a18fbcff8200744739c62fff649dd50d6. Selezionare il terzultimo carattere del codice identificativo.",
        "options": [
          "3",
          "0",
          "1",
          "2",
          "5",
          "4"
        ],
        "answer": "0"
      },
      {
        "id": "p10-2",
        "type": "select",
        "label": "Momento 1: 18/05/2026 ore 10:00. Selezionare il mese del Momento 1.",
        "options": [
          "Momento 4",
          "Momento 1",
          "Momento 2",
          "Momento 3",
          "maggio",
          "Momento 5"
        ],
        "answer": "maggio"
      },
      {
        "id": "p10-3",
        "type": "select",
        "label": "Bando: Bando ISI 2025; anno click day: 2026. Selezionare l'anno del click day.",
        "options": [
          "2024",
          "2025",
          "2028",
          "6202",
          "2027",
          "2026"
        ],
        "answer": "2026"
      },
      {
        "id": "p10-4",
        "type": "select",
        "label": "Selezionare il risultato di ventiquattro più sei.",
        "options": [
          "30",
          "28",
          "32",
          "3",
          "29",
          "31"
        ],
        "answer": "30"
      },
      {
        "id": "p10-5",
        "type": "select",
        "label": "Sito INAIL: https://www.inail.it; ente: INAIL. Selezionare il numero di lettere in \"INAIL\".",
        "options": [
          "6",
          "5",
          "3",
          "0",
          "7",
          "4"
        ],
        "answer": "5"
      },
      {
        "id": "p10-6",
        "type": "select",
        "label": "Sito INAIL: https://www.inail.it; ente: INAIL. Selezionare il dominio errato tra inail.it e inail.com.",
        "options": [
          "INPS",
          "INAIL",
          "inail.com",
          "http",
          "https",
          "inail"
        ],
        "answer": "inail.com"
      },
      {
        "id": "p10-7",
        "type": "select",
        "label": "Bandiera italiana in ordine: verde-bianco-rosso. Selezionare il colore mancante in verde-bianco-____.",
        "options": [
          "bianco",
          "giallo",
          "verde",
          "verde-bianco-rosso",
          "rosso",
          "blu"
        ],
        "answer": "rosso"
      },
      {
        "id": "p10-8",
        "type": "select",
        "label": "Partecipante: Mario Rossi; email: mario.rossi@impresa.it; telefono: +39 347 1234567. Selezionare il prefisso internazionale del telefono.",
        "options": [
          "+39",
          "Mario Rossi",
          "Rossi",
          "Rossi Mario",
          "Mario",
          "mario"
        ],
        "answer": "+39"
      },
      {
        "id": "p10-9",
        "type": "checkbox",
        "label": "Dichiarazione di presa visione delle regole tecniche.",
        "options": [
          "Dichiarazione di presa visione delle regole tecniche"
        ],
        "answer": [
          "Dichiarazione di presa visione delle regole tecniche"
        ]
      },
      {
        "id": "p10-10",
        "type": "checkbox",
        "label": "Non sono un robot.",
        "options": [
          "Non sono un robot"
        ],
        "answer": [
          "Non sono un robot"
        ]
      }
    ]
  },
  {
    "id": "bando-isi-2025-prova-11",
    "slot": 11,
    "title": "Prova 11",
    "description": "Bando ISI 2025 - simulazione con dati completi visibili nella domanda.",
    "questions": [
      {
        "id": "p11-1",
        "type": "select",
        "label": "Codice identificativo: +3b404cb3dcf6fc253b8f9f1f6a9c1b3a18fbcff8200744739c62fff649dd50d6. Selezionare il quinto carattere da destra del codice identificativo.",
        "options": [
          "D",
          "d"
        ],
        "answer": "d"
      },
      {
        "id": "p11-2",
        "type": "select",
        "label": "Momento 3: 22/06/2026 ore 10:00. Selezionare l'anno del Momento 3.",
        "options": [
          "2025",
          "2027",
          "2024",
          "6202",
          "2026",
          "2028"
        ],
        "answer": "2026"
      },
      {
        "id": "p11-3",
        "type": "select",
        "label": "Bando: Bando ISI 2025; anno click day: 2026. Selezionare le ultime due cifre dell'anno del click day.",
        "options": [
          "25",
          "28",
          "62",
          "26",
          "27",
          "24"
        ],
        "answer": "26"
      },
      {
        "id": "p11-4",
        "type": "select",
        "label": "Selezionare il risultato di undici più venti.",
        "options": [
          "31",
          "33",
          "29",
          "32",
          "30",
          "13"
        ],
        "answer": "31"
      },
      {
        "id": "p11-5",
        "type": "select",
        "label": "Partecipante: Mario Rossi; email: mario.rossi@impresa.it; telefono: +39 347 1234567. Selezionare la parola \"Partecipante\" senza spazi.",
        "options": [
          "Mario",
          "Rossi Mario",
          "mario",
          "Rossi",
          "Mario Rossi",
          "Partecipante"
        ],
        "answer": "Partecipante"
      },
      {
        "id": "p11-6",
        "type": "select",
        "label": "Sito INAIL: https://www.inail.it; ente: INAIL. Selezionare il protocollo errato rispetto al sito ufficiale sicuro.",
        "options": [
          "http",
          "INPS",
          "https://www.inail.it",
          "inail",
          "https",
          "INAIL"
        ],
        "answer": "http"
      },
      {
        "id": "p11-7",
        "type": "select",
        "label": "Bandiera italiana in ordine: verde-bianco-rosso. Selezionare il colore centrale del tricolore italiano.",
        "options": [
          "verde",
          "giallo",
          "verde-bianco-rosso",
          "blu",
          "bianco",
          "rosso"
        ],
        "answer": "bianco"
      },
      {
        "id": "p11-8",
        "type": "select",
        "label": "Partecipante: Mario Rossi; email: mario.rossi@impresa.it; telefono: +39 347 1234567. Selezionare il nome prima del punto nell'email mario.rossi@impresa.it.",
        "options": [
          "Rossi",
          "rossi",
          "mario",
          "Rossi Mario",
          "Mario",
          "Mario Rossi"
        ],
        "answer": "mario"
      },
      {
        "id": "p11-9",
        "type": "checkbox",
        "label": "Dichiarazione di presa visione delle regole tecniche.",
        "options": [
          "Dichiarazione di presa visione delle regole tecniche"
        ],
        "answer": [
          "Dichiarazione di presa visione delle regole tecniche"
        ]
      },
      {
        "id": "p11-10",
        "type": "checkbox",
        "label": "Non sono un robot.",
        "options": [
          "Non sono un robot"
        ],
        "answer": [
          "Non sono un robot"
        ]
      }
    ]
  },
  {
    "id": "bando-isi-2025-prova-12",
    "slot": 12,
    "title": "Prova 12",
    "description": "Bando ISI 2025 - simulazione con dati completi visibili nella domanda.",
    "questions": [
      {
        "id": "p12-1",
        "type": "select",
        "label": "Codice identificativo: +3b404cb3dcf6fc253b8f9f1f6a9c1b3a18fbcff8200744739c62fff649dd50d6. Selezionare i primi 10 caratteri del codice identificativo.",
        "options": [
          "3b404cb3d",
          "+3b404cb3d0",
          "+3b404cb3d",
          "+3b404cb3"
        ],
        "answer": "+3b404cb3d"
      },
      {
        "id": "p12-2",
        "type": "select",
        "label": "Momento 6: 24/06/2026 ore 11:20. Selezionare il mese del Momento 6 in numero.",
        "options": [
          "4",
          "5",
          "60",
          "8",
          "06",
          "7"
        ],
        "answer": "06"
      },
      {
        "id": "p12-3",
        "type": "select",
        "label": "Bando: Bando ISI 2025; anno click day: 2026. Selezionare la differenza tra anno click day e anno bando.",
        "options": [
          "4",
          "3",
          "5",
          "1",
          "2",
          "0"
        ],
        "answer": "1"
      },
      {
        "id": "p12-4",
        "type": "select",
        "label": "Selezionare il risultato di 20 diviso 5.",
        "options": [
          "2",
          "0",
          "4",
          "5",
          "3",
          "6"
        ],
        "answer": "4"
      },
      {
        "id": "p12-5",
        "type": "select",
        "label": "Selezionare la parola \"Convalida domanda\" senza spazi.",
        "options": [
          "CONVALIDADOMANDA",
          "Convalidadomanda",
          "onvalidadomanda",
          "Convalidadomand",
          "convalidadomanda",
          "Convalidadomanda0"
        ],
        "answer": "Convalidadomanda"
      },
      {
        "id": "p12-6",
        "type": "select",
        "label": "Browser compatibili: Chrome, Firefox, Edge; browser non compatibili: Safari, Opera. Selezionare il browser compatibile tra Firefox e Opera.",
        "options": [
          "Firefox",
          "Chrome",
          "Edge",
          "Safari",
          "Opera",
          "Chrome e Firefox"
        ],
        "answer": "Firefox"
      },
      {
        "id": "p12-7",
        "type": "select",
        "label": "Bandiera italiana in ordine: verde-bianco-rosso. Selezionare i colori del tricolore separati da trattino.",
        "options": [
          "verde",
          "bianco",
          "rosso",
          "giallo",
          "blu",
          "verde-bianco-rosso"
        ],
        "answer": "verde-bianco-rosso"
      },
      {
        "id": "p12-8",
        "type": "select",
        "label": "Partecipante: Mario Rossi; email: mario.rossi@impresa.it; telefono: +39 347 1234567. Selezionare il cognome nell'email mario.rossi@impresa.it.",
        "options": [
          "rossi",
          "Rossi",
          "Mario Rossi",
          "Rossi Mario",
          "mario",
          "Mario"
        ],
        "answer": "rossi"
      },
      {
        "id": "p12-9",
        "type": "checkbox",
        "label": "Dichiarazione di presa visione delle regole tecniche.",
        "options": [
          "Dichiarazione di presa visione delle regole tecniche"
        ],
        "answer": [
          "Dichiarazione di presa visione delle regole tecniche"
        ]
      },
      {
        "id": "p12-10",
        "type": "checkbox",
        "label": "Non sono un robot.",
        "options": [
          "Non sono un robot"
        ],
        "answer": [
          "Non sono un robot"
        ]
      }
    ]
  },
  {
    "id": "bando-isi-2025-prova-13",
    "slot": 13,
    "title": "Prova 13",
    "description": "Bando ISI 2025 - simulazione con dati completi visibili nella domanda.",
    "questions": [
      {
        "id": "p13-1",
        "type": "select",
        "label": "Codice identificativo: +3b404cb3dcf6fc253b8f9f1f6a9c1b3a18fbcff8200744739c62fff649dd50d6. Selezionare gli ultimi 5 caratteri del codice identificativo.",
        "options": [
          "D50d6",
          "d50d6",
          "50d6",
          "d50d",
          "d50d60"
        ],
        "answer": "d50d6"
      },
      {
        "id": "p13-2",
        "type": "select",
        "label": "Momento 1: 18/05/2026 ore 10:00. Selezionare il giorno del Momento 1.",
        "options": [
          "16",
          "19",
          "17",
          "20",
          "18",
          "81"
        ],
        "answer": "18"
      },
      {
        "id": "p13-3",
        "type": "select",
        "label": "Bando: Bando ISI 2025; anno click day: 2026. Selezionare il titolo abbreviato del bando.",
        "options": [
          "2025",
          "Bando ISI 2026",
          "ISI 2025",
          "2026",
          "Bando ISI 2025",
          "Bando ISI"
        ],
        "answer": "Bando ISI"
      },
      {
        "id": "p13-4",
        "type": "select",
        "label": "Selezionare il risultato di tre per sette.",
        "options": [
          "21",
          "19",
          "23",
          "12",
          "20",
          "22"
        ],
        "answer": "21"
      },
      {
        "id": "p13-5",
        "type": "select",
        "label": "Selezionare le vocali della parola \"Amministratore\".",
        "options": [
          "iiaoe",
          "Aiiaoe",
          "Aiiaoe0",
          "AIIAOE",
          "aiiaoe",
          "Aiiao"
        ],
        "answer": "Aiiaoe"
      },
      {
        "id": "p13-6",
        "type": "select",
        "label": "Sito INAIL: https://www.inail.it; ente: INAIL. Selezionare l'acronimo dell'Istituto.",
        "options": [
          "inail",
          "INPS",
          "INAIL",
          "https://www.inail.it",
          "http",
          "https"
        ],
        "answer": "INAIL"
      },
      {
        "id": "p13-7",
        "type": "select",
        "label": "Bandiera italiana in ordine: verde-bianco-rosso. Selezionare i colori della bandiera italiana in ordine inverso e separati da trattino.",
        "options": [
          "bianco",
          "rosso",
          "verde",
          "blu",
          "rosso-bianco-verde",
          "giallo"
        ],
        "answer": "rosso-bianco-verde"
      },
      {
        "id": "p13-8",
        "type": "select",
        "label": "Partecipante: Mario Rossi; email: mario.rossi@impresa.it; telefono: +39 347 1234567. Selezionare il provider email completo.",
        "options": [
          "impresa.it",
          "Mario Rossi",
          "Rossi",
          "Rossi Mario",
          "Mario",
          "mario"
        ],
        "answer": "impresa.it"
      },
      {
        "id": "p13-9",
        "type": "checkbox",
        "label": "Dichiarazione di presa visione delle regole tecniche.",
        "options": [
          "Dichiarazione di presa visione delle regole tecniche"
        ],
        "answer": [
          "Dichiarazione di presa visione delle regole tecniche"
        ]
      },
      {
        "id": "p13-10",
        "type": "checkbox",
        "label": "Non sono un robot.",
        "options": [
          "Non sono un robot"
        ],
        "answer": [
          "Non sono un robot"
        ]
      }
    ]
  },
  {
    "id": "bando-isi-2025-prova-14",
    "slot": 14,
    "title": "Prova 14",
    "description": "Bando ISI 2025 - simulazione con dati completi visibili nella domanda.",
    "questions": [
      {
        "id": "p14-1",
        "type": "select",
        "label": "Codice identificativo: +3b404cb3dcf6fc253b8f9f1f6a9c1b3a18fbcff8200744739c62fff649dd50d6. Selezionare gli ultimi 10 caratteri del codice identificativo.",
        "options": [
          "649dd50d6",
          "f649dd50d6",
          "F649dd50d6",
          "f649dd50d",
          "f649dd50d60"
        ],
        "answer": "f649dd50d6"
      },
      {
        "id": "p14-2",
        "type": "select",
        "label": "Momento 2: 19/06/2026 ore 18:00. Selezionare il giorno del Momento 2.",
        "options": [
          "18",
          "20",
          "17",
          "91",
          "19",
          "21"
        ],
        "answer": "19"
      },
      {
        "id": "p14-3",
        "type": "select",
        "label": "Assi di finanziamento: 5; asse domanda: Asse 1.1. Selezionare il numero dell'asse della domanda.",
        "options": [
          "Asse 1",
          "Asse 2",
          ".1",
          "1.1",
          "Asse 1.1",
          "5"
        ],
        "answer": "1.1"
      },
      {
        "id": "p14-4",
        "type": "select",
        "label": "Selezionare il risultato di sessantacinque meno sessantaquattro.",
        "options": [
          "1",
          "3",
          "4",
          "2",
          "0",
          "5"
        ],
        "answer": "1"
      },
      {
        "id": "p14-5",
        "type": "select",
        "label": "Selezionare le consonanti della parola \"Amministratore\".",
        "options": [
          "mnstrtr",
          "mmnstrtr0",
          "MMNSTRTR",
          "mmnstrt",
          "Mmnstrtr",
          "mmnstrtr"
        ],
        "answer": "mmnstrtr"
      },
      {
        "id": "p14-6",
        "type": "select",
        "label": "Sito INAIL: https://www.inail.it; ente: INAIL. Selezionare il sito corretto tra https://www.inail.it e http://www.inail.ti.",
        "options": [
          "https://www.inail.it",
          "INPS",
          "http",
          "inail",
          "https",
          "INAIL"
        ],
        "answer": "https://www.inail.it"
      },
      {
        "id": "p14-7",
        "type": "select",
        "label": "Bandiera italiana in ordine: verde-bianco-rosso. Selezionare il numero dei colori del tricolore in cifra.",
        "options": [
          "4",
          "5",
          "0",
          "1",
          "3",
          "2"
        ],
        "answer": "3"
      },
      {
        "id": "p14-8",
        "type": "select",
        "label": "Partecipante: Mario Rossi; email: mario.rossi@impresa.it; telefono: +39 347 1234567. Selezionare il telefono senza spazi.",
        "options": [
          "Rossi",
          "mario",
          "+393471234567",
          "Rossi Mario",
          "Mario",
          "Mario Rossi"
        ],
        "answer": "+393471234567"
      },
      {
        "id": "p14-9",
        "type": "checkbox",
        "label": "Dichiarazione di presa visione delle regole tecniche.",
        "options": [
          "Dichiarazione di presa visione delle regole tecniche"
        ],
        "answer": [
          "Dichiarazione di presa visione delle regole tecniche"
        ]
      },
      {
        "id": "p14-10",
        "type": "checkbox",
        "label": "Non sono un robot.",
        "options": [
          "Non sono un robot"
        ],
        "answer": [
          "Non sono un robot"
        ]
      }
    ]
  },
  {
    "id": "bando-isi-2025-prova-15",
    "slot": 15,
    "title": "Prova 15",
    "description": "Bando ISI 2025 - simulazione con dati completi visibili nella domanda.",
    "questions": [
      {
        "id": "p15-1",
        "type": "select",
        "label": "Codice identificativo: +3b404cb3dcf6fc253b8f9f1f6a9c1b3a18fbcff8200744739c62fff649dd50d6. Selezionare il carattere in posizione 15 del codice identificativo.",
        "options": [
          "C",
          "c"
        ],
        "answer": "c"
      },
      {
        "id": "p15-2",
        "type": "select",
        "label": "Momento 2: 19/06/2026 ore 18:00. Selezionare il mese del Momento 2 in lettere.",
        "options": [
          "Momento 4",
          "Momento 2",
          "Momento 5",
          "Momento 3",
          "giugno",
          "Momento 1"
        ],
        "answer": "giugno"
      },
      {
        "id": "p15-3",
        "type": "select",
        "label": "Bando: Bando ISI 2025; anno click day: 2026. Selezionare l'anno scritto per esteso del bando.",
        "options": [
          "2023",
          "2027",
          "5202",
          "2025",
          "2026",
          "2024"
        ],
        "answer": "2025"
      },
      {
        "id": "p15-4",
        "type": "select",
        "label": "Selezionare la somma tra 24 e 25.",
        "options": [
          "47",
          "94",
          "49",
          "50",
          "48",
          "51"
        ],
        "answer": "49"
      },
      {
        "id": "p15-5",
        "type": "select",
        "label": "Sito INAIL: https://www.inail.it; ente: INAIL. Selezionare il numero di caratteri della parola \"INAIL\".",
        "options": [
          "0",
          "5",
          "6",
          "4",
          "7",
          "3"
        ],
        "answer": "5"
      },
      {
        "id": "p15-6",
        "type": "select",
        "label": "Browser compatibili: Chrome, Firefox, Edge; browser non compatibili: Safari, Opera. Selezionare il browser compatibile tra Safari e Edge.",
        "options": [
          "Edge",
          "Chrome",
          "Firefox",
          "Safari",
          "Opera",
          "Chrome e Firefox"
        ],
        "answer": "Edge"
      },
      {
        "id": "p15-7",
        "type": "select",
        "label": "Bandiera italiana in ordine: verde-bianco-rosso. Selezionare il primo e il terzo colore della bandiera italiana.",
        "options": [
          "verde",
          "bianco",
          "rosso",
          "giallo",
          "blu",
          "verde-rosso"
        ],
        "answer": "verde-rosso"
      },
      {
        "id": "p15-8",
        "type": "select",
        "label": "Partecipante: Mario Rossi; email: mario.rossi@impresa.it; telefono: +39 347 1234567. Selezionare le iniziali del partecipante.",
        "options": [
          "MR",
          "Rossi",
          "Mario Rossi",
          "Rossi Mario",
          "mario",
          "Mario"
        ],
        "answer": "MR"
      },
      {
        "id": "p15-9",
        "type": "checkbox",
        "label": "Dichiarazione di presa visione delle regole tecniche.",
        "options": [
          "Dichiarazione di presa visione delle regole tecniche"
        ],
        "answer": [
          "Dichiarazione di presa visione delle regole tecniche"
        ]
      },
      {
        "id": "p15-10",
        "type": "checkbox",
        "label": "Non sono un robot.",
        "options": [
          "Non sono un robot"
        ],
        "answer": [
          "Non sono un robot"
        ]
      }
    ]
  },
  {
    "id": "bando-isi-2025-prova-16",
    "slot": 16,
    "title": "Prova 16",
    "description": "Bando ISI 2025 - simulazione con dati completi visibili nella domanda.",
    "questions": [
      {
        "id": "p16-1",
        "type": "select",
        "label": "Codice identificativo: +3b404cb3dcf6fc253b8f9f1f6a9c1b3a18fbcff8200744739c62fff649dd50d6. Selezionare il carattere in posizione 20 del codice identificativo.",
        "options": [
          "10",
          "8",
          "9",
          "7",
          "0",
          "6"
        ],
        "answer": "8"
      },
      {
        "id": "p16-2",
        "type": "select",
        "label": "Momento 2: 19/06/2026 ore 18:00. Selezionare la data del Momento 2.",
        "options": [
          "24/06/2026",
          "18/05/2026",
          "22/06/2026",
          "23/06/2026",
          "19/06/2026",
          "24-06-2026"
        ],
        "answer": "19/06/2026"
      },
      {
        "id": "p16-3",
        "type": "select",
        "label": "Assi di finanziamento: 5; asse domanda: Asse 1.1. Selezionare il numero totale di assi in lettere.",
        "options": [
          "Asse 2",
          "Asse 1",
          "1.1",
          "5",
          "Asse 1.1",
          "cinque"
        ],
        "answer": "cinque"
      },
      {
        "id": "p16-4",
        "type": "select",
        "label": "Selezionare il risultato di cinquanta più otto.",
        "options": [
          "58",
          "56",
          "60",
          "85",
          "57",
          "59"
        ],
        "answer": "58"
      },
      {
        "id": "p16-5",
        "type": "select",
        "label": "Bando: Bando ISI 2025; anno click day: 2026. Selezionare il testo \"Click Day\" senza spazi.",
        "options": [
          "Bando ISI 2025",
          "ClickDay",
          "ISI 2025",
          "2025",
          "Bando ISI",
          "Bando ISI 2026"
        ],
        "answer": "ClickDay"
      },
      {
        "id": "p16-6",
        "type": "select",
        "label": "Sito INAIL: https://www.inail.it; ente: INAIL. Partecipante: Mario Rossi; email: mario.rossi@impresa.it; telefono: +39 347 1234567. Selezionare il dominio ufficiale con prefisso www.",
        "options": [
          "INPS",
          "INAIL",
          "www.inail.it",
          "http",
          "https",
          "inail"
        ],
        "answer": "www.inail.it"
      },
      {
        "id": "p16-7",
        "type": "select",
        "label": "Bandiera italiana in ordine: verde-bianco-rosso. Selezionare le vocali nei colori \"verde bianco rosso\".",
        "options": [
          "bianco",
          "rosso",
          "verde",
          "blu",
          "eeiaooo",
          "giallo"
        ],
        "answer": "eeiaooo"
      },
      {
        "id": "p16-8",
        "type": "select",
        "label": "Partecipante: Mario Rossi; email: mario.rossi@impresa.it; telefono: +39 347 1234567. Selezionare il nome completo in ordine cognome-nome.",
        "options": [
          "Rossi Mario",
          "Mario Rossi",
          "Rossi",
          "mario",
          "Mario",
          "rossi"
        ],
        "answer": "Rossi Mario"
      },
      {
        "id": "p16-9",
        "type": "checkbox",
        "label": "Dichiarazione di presa visione delle regole tecniche.",
        "options": [
          "Dichiarazione di presa visione delle regole tecniche"
        ],
        "answer": [
          "Dichiarazione di presa visione delle regole tecniche"
        ]
      },
      {
        "id": "p16-10",
        "type": "checkbox",
        "label": "Non sono un robot.",
        "options": [
          "Non sono un robot"
        ],
        "answer": [
          "Non sono un robot"
        ]
      }
    ]
  },
  {
    "id": "bando-isi-2025-prova-17",
    "slot": 17,
    "title": "Prova 17",
    "description": "Bando ISI 2025 - simulazione con dati completi visibili nella domanda.",
    "questions": [
      {
        "id": "p17-1",
        "type": "select",
        "label": "Codice identificativo: +3b404cb3dcf6fc253b8f9f1f6a9c1b3a18fbcff8200744739c62fff649dd50d6. Selezionare il carattere in posizione 25 del codice identificativo.",
        "options": [
          "F",
          "f"
        ],
        "answer": "f"
      },
      {
        "id": "p17-2",
        "type": "select",
        "label": "Momento 3: 22/06/2026 ore 10:00. Selezionare il giorno del Momento 3.",
        "options": [
          "21",
          "23",
          "20",
          "2022",
          "22",
          "24"
        ],
        "answer": "22"
      },
      {
        "id": "p17-3",
        "type": "select",
        "label": "Bando: Bando ISI 2025; anno click day: 2026. Selezionare il bando senza indicare l'anno.",
        "options": [
          "Bando ISI 2026",
          "ISI 2025",
          "2026",
          "Bando ISI",
          "Bando ISI 2025",
          "2025"
        ],
        "answer": "Bando ISI"
      },
      {
        "id": "p17-4",
        "type": "select",
        "label": "Selezionare il risultato di 100 meno 75.",
        "options": [
          "25",
          "27",
          "23",
          "26",
          "24",
          "52"
        ],
        "answer": "25"
      },
      {
        "id": "p17-5",
        "type": "select",
        "label": "Selezionare le vocali di \"Regole tecniche\".",
        "options": [
          "oeeie",
          "eoeeie0",
          "EOEEIE",
          "eoeei",
          "Eoeeie",
          "eoeeie"
        ],
        "answer": "eoeeie"
      },
      {
        "id": "p17-6",
        "type": "select",
        "label": "Sito INAIL: https://www.inail.it; ente: INAIL. Partecipante: Mario Rossi; email: mario.rossi@impresa.it; telefono: +39 347 1234567. Selezionare l'estensione del dominio email del partecipante.",
        "options": [
          ".it",
          "INPS",
          "http",
          "inail",
          "https",
          "INAIL"
        ],
        "answer": ".it"
      },
      {
        "id": "p17-7",
        "type": "select",
        "label": "Bandiera italiana in ordine: verde-bianco-rosso. Selezionare le consonanti di \"verde\".",
        "options": [
          "verde",
          "rosso",
          "blu",
          "giallo",
          "vrd",
          "bianco"
        ],
        "answer": "vrd"
      },
      {
        "id": "p17-8",
        "type": "select",
        "label": "Partecipante: Mario Rossi; email: mario.rossi@impresa.it; telefono: +39 347 1234567. Selezionare il numero telefonico senza prefisso +39.",
        "options": [
          "3471234566",
          "7654321743",
          "3471234567",
          "3471234565",
          "3471234568",
          "3471234569"
        ],
        "answer": "3471234567"
      },
      {
        "id": "p17-9",
        "type": "checkbox",
        "label": "Dichiarazione di presa visione delle regole tecniche.",
        "options": [
          "Dichiarazione di presa visione delle regole tecniche"
        ],
        "answer": [
          "Dichiarazione di presa visione delle regole tecniche"
        ]
      },
      {
        "id": "p17-10",
        "type": "checkbox",
        "label": "Non sono un robot.",
        "options": [
          "Non sono un robot"
        ],
        "answer": [
          "Non sono un robot"
        ]
      }
    ]
  },
  {
    "id": "bando-isi-2025-prova-18",
    "slot": 18,
    "title": "Prova 18",
    "description": "Bando ISI 2025 - simulazione con dati completi visibili nella domanda.",
    "questions": [
      {
        "id": "p18-1",
        "type": "select",
        "label": "Codice identificativo: +3b404cb3dcf6fc253b8f9f1f6a9c1b3a18fbcff8200744739c62fff649dd50d6. Selezionare il carattere in posizione 30 del codice identificativo.",
        "options": [
          "2",
          "3",
          "5",
          "0",
          "4",
          "1"
        ],
        "answer": "1"
      },
      {
        "id": "p18-2",
        "type": "select",
        "label": "Momento 3: 22/06/2026 ore 10:00. Selezionare il mese del Momento 3.",
        "options": [
          "Momento 4",
          "Momento 2",
          "Momento 5",
          "Momento 3",
          "giugno",
          "Momento 1"
        ],
        "answer": "giugno"
      },
      {
        "id": "p18-3",
        "type": "select",
        "label": "Assi di finanziamento: 5; asse domanda: Asse 1.1. Selezionare l'asse della domanda.",
        "options": [
          "5",
          "Asse 2",
          "sse 1.1",
          "Asse 1.1",
          "Asse 1",
          "1.1"
        ],
        "answer": "Asse 1.1"
      },
      {
        "id": "p18-4",
        "type": "select",
        "label": "Assi di finanziamento: 5; asse domanda: Asse 1.1. Selezionare il doppio del numero degli assi.",
        "options": [
          "8",
          "1",
          "10",
          "11",
          "9",
          "12"
        ],
        "answer": "10"
      },
      {
        "id": "p18-5",
        "type": "select",
        "label": "Selezionare le consonanti di \"Regole tecniche\".",
        "options": [
          "Rgl tcnch0",
          "Rgl tcnch",
          "gl tcnch",
          "Rgl tcnc",
          "rgl tcnch"
        ],
        "answer": "Rgl tcnch"
      },
      {
        "id": "p18-6",
        "type": "select",
        "label": "Browser compatibili: Chrome, Firefox, Edge; browser non compatibili: Safari, Opera. Selezionare il browser non compatibile tra Chrome e Safari.",
        "options": [
          "Safari",
          "Chrome",
          "Firefox",
          "Edge",
          "Opera",
          "Chrome e Firefox"
        ],
        "answer": "Safari"
      },
      {
        "id": "p18-7",
        "type": "select",
        "label": "Bandiera italiana in ordine: verde-bianco-rosso. Selezionare il colore che non appartiene al tricolore tra blu e bianco.",
        "options": [
          "verde",
          "bianco",
          "rosso",
          "giallo",
          "verde-bianco-rosso",
          "blu"
        ],
        "answer": "blu"
      },
      {
        "id": "p18-8",
        "type": "select",
        "label": "Partecipante: Mario Rossi; email: mario.rossi@impresa.it; telefono: +39 347 1234567. Selezionare la parte prima della chiocciola nell'email.",
        "options": [
          "mario.rossi",
          "Rossi",
          "Mario Rossi",
          "Rossi Mario",
          "mario",
          "Mario"
        ],
        "answer": "mario.rossi"
      },
      {
        "id": "p18-9",
        "type": "checkbox",
        "label": "Dichiarazione di presa visione delle regole tecniche.",
        "options": [
          "Dichiarazione di presa visione delle regole tecniche"
        ],
        "answer": [
          "Dichiarazione di presa visione delle regole tecniche"
        ]
      },
      {
        "id": "p18-10",
        "type": "checkbox",
        "label": "Non sono un robot.",
        "options": [
          "Non sono un robot"
        ],
        "answer": [
          "Non sono un robot"
        ]
      }
    ]
  },
  {
    "id": "bando-isi-2025-prova-19",
    "slot": 19,
    "title": "Prova 19",
    "description": "Bando ISI 2025 - simulazione con dati completi visibili nella domanda.",
    "questions": [
      {
        "id": "p19-1",
        "type": "select",
        "label": "Codice identificativo: +3b404cb3dcf6fc253b8f9f1f6a9c1b3a18fbcff8200744739c62fff649dd50d6. Selezionare il carattere in posizione 35 del codice identificativo.",
        "options": [
          "10",
          "8",
          "9",
          "7",
          "0",
          "6"
        ],
        "answer": "8"
      },
      {
        "id": "p19-2",
        "type": "select",
        "label": "Momento 4: 23/06/2026 ore 10:00. Selezionare la data del Momento 4.",
        "options": [
          "24/06/2026",
          "18/05/2026",
          "19/06/2026",
          "22/06/2026",
          "23/06/2026",
          "24-06-2026"
        ],
        "answer": "23/06/2026"
      },
      {
        "id": "p19-3",
        "type": "select",
        "label": "Selezionare le ultime due cifre dell'anno 2025.",
        "options": [
          "23",
          "24",
          "27",
          "52",
          "26",
          "25"
        ],
        "answer": "25"
      },
      {
        "id": "p19-4",
        "type": "select",
        "label": "Selezionare la metà di 20.",
        "options": [
          "10",
          "8",
          "12",
          "1",
          "9",
          "11"
        ],
        "answer": "10"
      },
      {
        "id": "p19-5",
        "type": "select",
        "label": "Selezionare \"Domanda online\" senza spazi.",
        "options": [
          "omandaonline",
          "Domandaonline",
          "Domandaonline0",
          "DOMANDAONLINE",
          "domandaonline",
          "Domandaonlin"
        ],
        "answer": "Domandaonline"
      },
      {
        "id": "p19-6",
        "type": "select",
        "label": "Sito INAIL: https://www.inail.it; ente: INAIL. Partecipante: Mario Rossi; email: mario.rossi@impresa.it; telefono: +39 347 1234567. Selezionare il nome del sito senza protocollo.",
        "options": [
          "INPS",
          "INAIL",
          "www.inail.it",
          "http",
          "https",
          "inail"
        ],
        "answer": "www.inail.it"
      },
      {
        "id": "p19-7",
        "type": "select",
        "label": "Bandiera italiana in ordine: verde-bianco-rosso. Selezionare la sequenza errata tra verde-bianco-rosso e rosso-verde-bianco.",
        "options": [
          "bianco",
          "rosso",
          "verde",
          "blu",
          "rosso-verde-bianco",
          "giallo"
        ],
        "answer": "rosso-verde-bianco"
      },
      {
        "id": "p19-8",
        "type": "select",
        "label": "Partecipante: Mario Rossi; email: mario.rossi@impresa.it; telefono: +39 347 1234567. Selezionare il numero di lettere del nome Mario.",
        "options": [
          "5",
          "7",
          "4",
          "3",
          "6",
          "0"
        ],
        "answer": "5"
      },
      {
        "id": "p19-9",
        "type": "checkbox",
        "label": "Dichiarazione di presa visione delle regole tecniche.",
        "options": [
          "Dichiarazione di presa visione delle regole tecniche"
        ],
        "answer": [
          "Dichiarazione di presa visione delle regole tecniche"
        ]
      },
      {
        "id": "p19-10",
        "type": "checkbox",
        "label": "Non sono un robot.",
        "options": [
          "Non sono un robot"
        ],
        "answer": [
          "Non sono un robot"
        ]
      }
    ]
  },
  {
    "id": "bando-isi-2025-prova-20",
    "slot": 20,
    "title": "Prova 20",
    "description": "Bando ISI 2025 - simulazione con dati completi visibili nella domanda.",
    "questions": [
      {
        "id": "p20-1",
        "type": "select",
        "label": "Codice identificativo: +3b404cb3dcf6fc253b8f9f1f6a9c1b3a18fbcff8200744739c62fff649dd50d6. Selezionare il carattere in posizione 40 del codice identificativo.",
        "options": [
          "F",
          "f"
        ],
        "answer": "f"
      },
      {
        "id": "p20-2",
        "type": "select",
        "label": "Momento 4: 23/06/2026 ore 10:00. Selezionare il giorno del Momento 4.",
        "options": [
          "22",
          "24",
          "21",
          "32",
          "23",
          "25"
        ],
        "answer": "23"
      },
      {
        "id": "p20-3",
        "type": "select",
        "label": "Bando: Bando ISI 2025; anno click day: 2026. Selezionare l'anno successivo all'anno del bando.",
        "options": [
          "2025",
          "2028",
          "6202",
          "2026",
          "2027",
          "2024"
        ],
        "answer": "2026"
      },
      {
        "id": "p20-4",
        "type": "select",
        "label": "Selezionare il triplo di 5.",
        "options": [
          "15",
          "17",
          "13",
          "16",
          "14",
          "51"
        ],
        "answer": "15"
      },
      {
        "id": "p20-5",
        "type": "select",
        "label": "Codice identificativo: +3b404cb3dcf6fc253b8f9f1f6a9c1b3a18fbcff8200744739c62fff649dd50d6. Selezionare le vocali di \"Codice identificativo\".",
        "options": [
          "ieieiiaio",
          "oieieiiaio0",
          "OIEIEIIAIO",
          "oieieiiai",
          "Oieieiiaio",
          "oieieiiaio"
        ],
        "answer": "oieieiiaio"
      },
      {
        "id": "p20-6",
        "type": "select",
        "label": "Sito INAIL: https://www.inail.it; ente: INAIL. Selezionare l'ente corretto tra INAIL, INPS e Agenzia Entrate.",
        "options": [
          "INAIL",
          "inail",
          "https://www.inail.it",
          "https",
          "http",
          "INPS"
        ],
        "answer": "INAIL"
      },
      {
        "id": "p20-7",
        "type": "select",
        "label": "Bandiera italiana in ordine: verde-bianco-rosso. Selezionare le iniziali di verde, bianco e rosso.",
        "options": [
          "verde",
          "rosso",
          "blu",
          "giallo",
          "vbr",
          "bianco"
        ],
        "answer": "vbr"
      },
      {
        "id": "p20-8",
        "type": "select",
        "label": "Partecipante: Mario Rossi; email: mario.rossi@impresa.it; telefono: +39 347 1234567. Selezionare il numero di lettere del cognome Rossi.",
        "options": [
          "4",
          "0",
          "5",
          "3",
          "6",
          "7"
        ],
        "answer": "5"
      },
      {
        "id": "p20-9",
        "type": "checkbox",
        "label": "Dichiarazione di presa visione delle regole tecniche.",
        "options": [
          "Dichiarazione di presa visione delle regole tecniche"
        ],
        "answer": [
          "Dichiarazione di presa visione delle regole tecniche"
        ]
      },
      {
        "id": "p20-10",
        "type": "checkbox",
        "label": "Non sono un robot.",
        "options": [
          "Non sono un robot"
        ],
        "answer": [
          "Non sono un robot"
        ]
      }
    ]
  },
  {
    "id": "bando-isi-2025-prova-21",
    "slot": 21,
    "title": "Prova 21",
    "description": "Bando ISI 2025 - simulazione con dati completi visibili nella domanda.",
    "questions": [
      {
        "id": "p21-1",
        "type": "select",
        "label": "Codice identificativo: +3b404cb3dcf6fc253b8f9f1f6a9c1b3a18fbcff8200744739c62fff649dd50d6. Selezionare il carattere in posizione 45 del codice identificativo.",
        "options": [
          "8",
          "9",
          "0",
          "6",
          "5",
          "7"
        ],
        "answer": "7"
      },
      {
        "id": "p21-2",
        "type": "select",
        "label": "Momento 1: 18/05/2026 ore 10:00. Selezionare l'ora del Momento 1.",
        "options": [
          "10.00",
          "11:20",
          "11.2",
          "18:00",
          "10:00",
          "11:00"
        ],
        "answer": "10:00"
      },
      {
        "id": "p21-3",
        "type": "select",
        "label": "Selezionare il numero 2025 senza le prime due cifre.",
        "options": [
          "23",
          "27",
          "52",
          "25",
          "26",
          "24"
        ],
        "answer": "25"
      },
      {
        "id": "p21-4",
        "type": "select",
        "label": "Data odierna simulata: 24/06/2026, mercoledi. Selezionare la somma tra giorno odierno e mese odierno.",
        "options": [
          "28",
          "3",
          "30",
          "31",
          "29",
          "32"
        ],
        "answer": "30"
      },
      {
        "id": "p21-5",
        "type": "select",
        "label": "Codice identificativo: +3b404cb3dcf6fc253b8f9f1f6a9c1b3a18fbcff8200744739c62fff649dd50d6. Selezionare \"Codice identificativo\" senza spazi.",
        "options": [
          "CODICEIDENTIFICATIVO",
          "Codiceidentificativo",
          "odiceidentificativo",
          "Codiceidentificativ",
          "codiceidentificativo",
          "Codiceidentificativo0"
        ],
        "answer": "Codiceidentificativo"
      },
      {
        "id": "p21-6",
        "type": "select",
        "label": "Sito INAIL: https://www.inail.it; ente: INAIL. Selezionare il dominio errato tra inail.it e inail.ti.",
        "options": [
          "inail.ti",
          "INAIL",
          "INPS",
          "inail",
          "https",
          "http"
        ],
        "answer": "inail.ti"
      },
      {
        "id": "p21-7",
        "type": "select",
        "label": "Bandiera italiana in ordine: verde-bianco-rosso. Selezionare il colore finale del tricolore.",
        "options": [
          "verde",
          "bianco",
          "giallo",
          "blu",
          "verde-bianco-rosso",
          "rosso"
        ],
        "answer": "rosso"
      },
      {
        "id": "p21-8",
        "type": "select",
        "label": "Partecipante: Mario Rossi; email: mario.rossi@impresa.it; telefono: +39 347 1234567. Selezionare il nome del partecipante in minuscolo.",
        "options": [
          "mario",
          "Rossi",
          "Mario Rossi",
          "Rossi Mario",
          "rossi",
          "Mario"
        ],
        "answer": "mario"
      },
      {
        "id": "p21-9",
        "type": "checkbox",
        "label": "Dichiarazione di presa visione delle regole tecniche.",
        "options": [
          "Dichiarazione di presa visione delle regole tecniche"
        ],
        "answer": [
          "Dichiarazione di presa visione delle regole tecniche"
        ]
      },
      {
        "id": "p21-10",
        "type": "checkbox",
        "label": "Non sono un robot.",
        "options": [
          "Non sono un robot"
        ],
        "answer": [
          "Non sono un robot"
        ]
      }
    ]
  },
  {
    "id": "bando-isi-2025-prova-22",
    "slot": 22,
    "title": "Prova 22",
    "description": "Bando ISI 2025 - simulazione con dati completi visibili nella domanda.",
    "questions": [
      {
        "id": "p22-1",
        "type": "select",
        "label": "Codice identificativo: +3b404cb3dcf6fc253b8f9f1f6a9c1b3a18fbcff8200744739c62fff649dd50d6. Selezionare il carattere in posizione 50 del codice identificativo.",
        "options": [
          "11",
          "9",
          "10",
          "8",
          "0",
          "7"
        ],
        "answer": "9"
      },
      {
        "id": "p22-2",
        "type": "select",
        "label": "Momento 2: 19/06/2026 ore 18:00. Selezionare l'ora del Momento 2.",
        "options": [
          "10.00",
          "10:00",
          "11:00",
          "11:20",
          "18:00",
          "11.2"
        ],
        "answer": "18:00"
      },
      {
        "id": "p22-3",
        "type": "select",
        "label": "Assi di finanziamento: 5; asse domanda: Asse 1.1. Selezionare il numero degli assi più uno.",
        "options": [
          "4",
          "5",
          "8",
          "0",
          "7",
          "6"
        ],
        "answer": "6"
      },
      {
        "id": "p22-4",
        "type": "select",
        "label": "Stanziamento: 508.000.000,00. Selezionare la differenza tra 508 e 500.",
        "options": [
          "8",
          "6",
          "10",
          "0",
          "7",
          "9"
        ],
        "answer": "8"
      },
      {
        "id": "p22-5",
        "type": "select",
        "label": "Selezionare le iniziali di \"Regole tecniche sportello\".",
        "options": [
          "TS",
          "RTS",
          "RTS0",
          "rts",
          "rTS",
          "RT"
        ],
        "answer": "RTS"
      },
      {
        "id": "p22-6",
        "type": "select",
        "label": "Browser compatibili: Chrome, Firefox, Edge; browser non compatibili: Safari, Opera. Selezionare una coppia di browser compatibili.",
        "options": [
          "Firefox",
          "Chrome",
          "Chrome e Firefox",
          "Opera",
          "Safari",
          "Edge"
        ],
        "answer": "Chrome e Firefox"
      },
      {
        "id": "p22-7",
        "type": "select",
        "label": "Bandiera italiana in ordine: verde-bianco-rosso. Selezionare il colore iniziale del tricolore italiano.",
        "options": [
          "rosso",
          "giallo",
          "bianco",
          "verde-bianco-rosso",
          "verde",
          "blu"
        ],
        "answer": "verde"
      },
      {
        "id": "p22-8",
        "type": "select",
        "label": "Partecipante: Mario Rossi; email: mario.rossi@impresa.it; telefono: +39 347 1234567. Selezionare il cognome del partecipante in maiuscolo.",
        "options": [
          "ROSSI",
          "Mario Rossi",
          "Rossi",
          "Rossi Mario",
          "Mario",
          "mario"
        ],
        "answer": "ROSSI"
      },
      {
        "id": "p22-9",
        "type": "checkbox",
        "label": "Dichiarazione di presa visione delle regole tecniche.",
        "options": [
          "Dichiarazione di presa visione delle regole tecniche"
        ],
        "answer": [
          "Dichiarazione di presa visione delle regole tecniche"
        ]
      },
      {
        "id": "p22-10",
        "type": "checkbox",
        "label": "Non sono un robot.",
        "options": [
          "Non sono un robot"
        ],
        "answer": [
          "Non sono un robot"
        ]
      }
    ]
  },
  {
    "id": "bando-isi-2025-prova-23",
    "slot": 23,
    "title": "Prova 23",
    "description": "Bando ISI 2025 - simulazione con dati completi visibili nella domanda.",
    "questions": [
      {
        "id": "p23-1",
        "type": "select",
        "label": "Codice identificativo: +3b404cb3dcf6fc253b8f9f1f6a9c1b3a18fbcff8200744739c62fff649dd50d6. Selezionare il carattere in posizione 55 del codice identificativo.",
        "options": [
          "F",
          "f"
        ],
        "answer": "f"
      },
      {
        "id": "p23-2",
        "type": "select",
        "label": "Momento 3: 22/06/2026 ore 10:00. Selezionare l'ora del Momento 3.",
        "options": [
          "11:20",
          "11:00",
          "10.00",
          "11.2",
          "10:00",
          "18:00"
        ],
        "answer": "10:00"
      },
      {
        "id": "p23-3",
        "type": "select",
        "label": "Assi di finanziamento: 5; asse domanda: Asse 1.1. Selezionare il numero dell'asse senza parola \"Asse\".",
        "options": [
          "Asse 1",
          "Asse 2",
          ".1",
          "1.1",
          "Asse 1.1",
          "5"
        ],
        "answer": "1.1"
      },
      {
        "id": "p23-4",
        "type": "select",
        "label": "Selezionare la somma delle cifre di 2026.",
        "options": [
          "10",
          "12",
          "8",
          "11",
          "9",
          "1"
        ],
        "answer": "10"
      },
      {
        "id": "p23-5",
        "type": "select",
        "label": "Selezionare \"Invio domanda\" senza spazi.",
        "options": [
          "nviodomanda",
          "Inviodomanda0",
          "INVIODOMANDA",
          "Inviodomand",
          "inviodomanda",
          "Inviodomanda"
        ],
        "answer": "Inviodomanda"
      },
      {
        "id": "p23-6",
        "type": "select",
        "label": "Sito INAIL: https://www.inail.it; ente: INAIL. Selezionare il sito con protocollo sicuro e dominio corretto.",
        "options": [
          "https://www.inail.it",
          "INPS",
          "http",
          "inail",
          "https",
          "INAIL"
        ],
        "answer": "https://www.inail.it"
      },
      {
        "id": "p23-7",
        "type": "select",
        "label": "Bandiera italiana in ordine: verde-bianco-rosso. Selezionare il numero di vocali in \"verde\".",
        "options": [
          "3",
          "4",
          "5",
          "0",
          "2",
          "1"
        ],
        "answer": "2"
      },
      {
        "id": "p23-8",
        "type": "select",
        "label": "Sito INAIL: https://www.inail.it; ente: INAIL. Partecipante: Mario Rossi; email: mario.rossi@impresa.it; telefono: +39 347 1234567. Selezionare il dominio email senza estensione.",
        "options": [
          "INPS",
          "http",
          "impresa",
          "https",
          "INAIL",
          "inail"
        ],
        "answer": "impresa"
      },
      {
        "id": "p23-9",
        "type": "checkbox",
        "label": "Dichiarazione di presa visione delle regole tecniche.",
        "options": [
          "Dichiarazione di presa visione delle regole tecniche"
        ],
        "answer": [
          "Dichiarazione di presa visione delle regole tecniche"
        ]
      },
      {
        "id": "p23-10",
        "type": "checkbox",
        "label": "Non sono un robot.",
        "options": [
          "Non sono un robot"
        ],
        "answer": [
          "Non sono un robot"
        ]
      }
    ]
  },
  {
    "id": "bando-isi-2025-prova-24",
    "slot": 24,
    "title": "Prova 24",
    "description": "Bando ISI 2025 - simulazione con dati completi visibili nella domanda.",
    "questions": [
      {
        "id": "p24-1",
        "type": "select",
        "label": "Codice identificativo: +3b404cb3dcf6fc253b8f9f1f6a9c1b3a18fbcff8200744739c62fff649dd50d6. Selezionare il carattere in posizione 60 del codice identificativo.",
        "options": [
          "D",
          "d"
        ],
        "answer": "d"
      },
      {
        "id": "p24-2",
        "type": "select",
        "label": "Momento 4: 23/06/2026 ore 10:00. Selezionare l'ora del Momento 4.",
        "options": [
          "10.00",
          "11:20",
          "11.2",
          "18:00",
          "10:00",
          "11:00"
        ],
        "answer": "10:00"
      },
      {
        "id": "p24-3",
        "type": "select",
        "label": "Bando: Bando ISI 2025; anno click day: 2026. Selezionare la cifra delle unità dell'anno del bando.",
        "options": [
          "3",
          "7",
          "0",
          "5",
          "6",
          "4"
        ],
        "answer": "5"
      },
      {
        "id": "p24-4",
        "type": "select",
        "label": "Selezionare la somma delle cifre di 2025.",
        "options": [
          "7",
          "0",
          "9",
          "10",
          "8",
          "11"
        ],
        "answer": "9"
      },
      {
        "id": "p24-5",
        "type": "select",
        "label": "Selezionare le vocali di \"Sportello informatico\".",
        "options": [
          "OEOIOAIO",
          "oeoioaio",
          "eoioaio",
          "oeoioai",
          "Oeoioaio",
          "oeoioaio0"
        ],
        "answer": "oeoioaio"
      },
      {
        "id": "p24-6",
        "type": "select",
        "label": "Browser compatibili: Chrome, Firefox, Edge; browser non compatibili: Safari, Opera. Selezionare il browser non compatibile tra Firefox e Opera.",
        "options": [
          "Opera",
          "Chrome",
          "Firefox",
          "Edge",
          "Safari",
          "Chrome e Firefox"
        ],
        "answer": "Opera"
      },
      {
        "id": "p24-7",
        "type": "select",
        "label": "Bandiera italiana in ordine: verde-bianco-rosso. Selezionare il numero di consonanti in \"rosso\".",
        "options": [
          "4",
          "2",
          "5",
          "1",
          "0",
          "3"
        ],
        "answer": "3"
      },
      {
        "id": "p24-8",
        "type": "select",
        "label": "Partecipante: Mario Rossi; email: mario.rossi@impresa.it; telefono: +39 347 1234567. Selezionare il secondo elemento di mario.rossi.",
        "options": [
          "rossi",
          "Rossi",
          "Mario Rossi",
          "Rossi Mario",
          "mario",
          "Mario"
        ],
        "answer": "rossi"
      },
      {
        "id": "p24-9",
        "type": "checkbox",
        "label": "Dichiarazione di presa visione delle regole tecniche.",
        "options": [
          "Dichiarazione di presa visione delle regole tecniche"
        ],
        "answer": [
          "Dichiarazione di presa visione delle regole tecniche"
        ]
      },
      {
        "id": "p24-10",
        "type": "checkbox",
        "label": "Non sono un robot.",
        "options": [
          "Non sono un robot"
        ],
        "answer": [
          "Non sono un robot"
        ]
      }
    ]
  },
  {
    "id": "bando-isi-2025-prova-25",
    "slot": 25,
    "title": "Prova 25",
    "description": "Bando ISI 2025 - simulazione con dati completi visibili nella domanda.",
    "questions": [
      {
        "id": "p25-1",
        "type": "select",
        "label": "Codice identificativo: +3b404cb3dcf6fc253b8f9f1f6a9c1b3a18fbcff8200744739c62fff649dd50d6. Selezionare il carattere in posizione 65 del codice identificativo.",
        "options": [
          "8",
          "6",
          "7",
          "5",
          "0",
          "4"
        ],
        "answer": "6"
      },
      {
        "id": "p25-2",
        "type": "select",
        "label": "Sportello simulato: apertura 24/06/2026 ore 11:00, chiusura 24/06/2026 ore 11:20. Selezionare l'ora di apertura dello sportello.",
        "options": [
          "10.00",
          "10:00",
          "11:20",
          "18:00",
          "11:00",
          "11.2"
        ],
        "answer": "11:00"
      },
      {
        "id": "p25-3",
        "type": "select",
        "label": "Bando: Bando ISI 2025; anno click day: 2026. Selezionare la cifra delle decine dell'anno del bando.",
        "options": [
          "0",
          "1",
          "4",
          "5",
          "3",
          "2"
        ],
        "answer": "2"
      },
      {
        "id": "p25-4",
        "type": "select",
        "label": "Selezionare il risultato di 24 meno 6.",
        "options": [
          "18",
          "16",
          "20",
          "81",
          "17",
          "19"
        ],
        "answer": "18"
      },
      {
        "id": "p25-5",
        "type": "select",
        "label": "Selezionare le consonanti di \"Sportello\".",
        "options": [
          "prtll",
          "Sprtll",
          "Sprtll0",
          "SPRTLL",
          "sprtll",
          "Sprtl"
        ],
        "answer": "Sprtll"
      },
      {
        "id": "p25-6",
        "type": "select",
        "label": "Sito INAIL: https://www.inail.it; ente: INAIL. Selezionare l'acronimo in minuscolo dell'ente.",
        "options": [
          "INPS",
          "INAIL",
          "inail",
          "https://www.inail.it",
          "http",
          "https"
        ],
        "answer": "inail"
      },
      {
        "id": "p25-7",
        "type": "select",
        "label": "Bandiera italiana in ordine: verde-bianco-rosso. Selezionare il colore che contiene più lettere tra verde e rosso.",
        "options": [
          "rosso",
          "giallo",
          "bianco",
          "verde-bianco-rosso",
          "verde",
          "blu"
        ],
        "answer": "verde"
      },
      {
        "id": "p25-8",
        "type": "select",
        "label": "Partecipante: Mario Rossi; email: mario.rossi@impresa.it; telefono: +39 347 1234567. Selezionare il numero di cifre del telefono incluso il prefisso 39, senza simboli.",
        "options": [
          "12",
          "14",
          "11",
          "10",
          "13",
          "21"
        ],
        "answer": "12"
      },
      {
        "id": "p25-9",
        "type": "checkbox",
        "label": "Dichiarazione di presa visione delle regole tecniche.",
        "options": [
          "Dichiarazione di presa visione delle regole tecniche"
        ],
        "answer": [
          "Dichiarazione di presa visione delle regole tecniche"
        ]
      },
      {
        "id": "p25-10",
        "type": "checkbox",
        "label": "Non sono un robot.",
        "options": [
          "Non sono un robot"
        ],
        "answer": [
          "Non sono un robot"
        ]
      }
    ]
  },
  {
    "id": "bando-isi-2025-prova-26",
    "slot": 26,
    "title": "Prova 26",
    "description": "Bando ISI 2025 - simulazione con dati completi visibili nella domanda.",
    "questions": [
      {
        "id": "p26-1",
        "type": "select",
        "label": "Codice identificativo: +3b404cb3dcf6fc253b8f9f1f6a9c1b3a18fbcff8200744739c62fff649dd50d6. Selezionare la lunghezza totale del codice identificativo, compreso il segno.",
        "options": [
          "66",
          "65",
          "67",
          "56",
          "63",
          "64"
        ],
        "answer": "65"
      },
      {
        "id": "p26-2",
        "type": "select",
        "label": "Sportello simulato: apertura 24/06/2026 ore 11:00, chiusura 24/06/2026 ore 11:20. Selezionare l'ora di chiusura dello sportello.",
        "options": [
          "11:00",
          "10:00",
          "10.00",
          "11.2",
          "11:20",
          "18:00"
        ],
        "answer": "11:20"
      },
      {
        "id": "p26-3",
        "type": "select",
        "label": "Momento 6: 24/06/2026 ore 11:20. Momento 5: 24/06/2026 ore 11:00. Selezionare la differenza tra Momento 6 e Momento 5 in minuti.",
        "options": [
          "19",
          "22",
          "2",
          "20",
          "21",
          "18"
        ],
        "answer": "20"
      },
      {
        "id": "p26-4",
        "type": "select",
        "label": "Stanziamento: 508.000.000,00. Selezionare la prima cifra diversa da zero dello stanziamento.",
        "options": [
          "5",
          "7",
          "3",
          "6",
          "4",
          "0"
        ],
        "answer": "5"
      },
      {
        "id": "p26-5",
        "type": "select",
        "label": "Selezionare il numero di parole in \"Sportello informatico\".",
        "options": [
          "3",
          "0",
          "5",
          "1",
          "4",
          "2"
        ],
        "answer": "2"
      },
      {
        "id": "p26-6",
        "type": "select",
        "label": "Sito INAIL: https://www.inail.it; ente: INAIL. Selezionare il dominio completo del sito senza https.",
        "options": [
          "www.inail.it",
          "INPS",
          "http",
          "inail",
          "https",
          "INAIL"
        ],
        "answer": "www.inail.it"
      },
      {
        "id": "p26-7",
        "type": "select",
        "label": "Bandiera italiana in ordine: verde-bianco-rosso. Selezionare il colore con 6 lettere nel tricolore.",
        "options": [
          "verde",
          "giallo",
          "verde-bianco-rosso",
          "blu",
          "bianco",
          "rosso"
        ],
        "answer": "bianco"
      },
      {
        "id": "p26-8",
        "type": "select",
        "label": "Sito INAIL: https://www.inail.it; ente: INAIL. Partecipante: Mario Rossi; email: mario.rossi@impresa.it; telefono: +39 347 1234567. Selezionare l'email senza dominio.",
        "options": [
          "INPS",
          "http",
          "mario.rossi",
          "https",
          "INAIL",
          "inail"
        ],
        "answer": "mario.rossi"
      },
      {
        "id": "p26-9",
        "type": "checkbox",
        "label": "Dichiarazione di presa visione delle regole tecniche.",
        "options": [
          "Dichiarazione di presa visione delle regole tecniche"
        ],
        "answer": [
          "Dichiarazione di presa visione delle regole tecniche"
        ]
      },
      {
        "id": "p26-10",
        "type": "checkbox",
        "label": "Non sono un robot.",
        "options": [
          "Non sono un robot"
        ],
        "answer": [
          "Non sono un robot"
        ]
      }
    ]
  },
  {
    "id": "bando-isi-2025-prova-27",
    "slot": 27,
    "title": "Prova 27",
    "description": "Bando ISI 2025 - simulazione con dati completi visibili nella domanda.",
    "questions": [
      {
        "id": "p27-1",
        "type": "select",
        "label": "Codice identificativo: +3b404cb3dcf6fc253b8f9f1f6a9c1b3a18fbcff8200744739c62fff649dd50d6. Selezionare la lunghezza del codice identificativo senza il segno iniziale.",
        "options": [
          "65",
          "66",
          "46",
          "63",
          "62",
          "64"
        ],
        "answer": "64"
      },
      {
        "id": "p27-2",
        "type": "select",
        "label": "Momento 5: 24/06/2026 ore 11:00. Selezionare la data del Momento 5 senza separatori.",
        "options": [
          "24062024",
          "24062025",
          "62026042",
          "24062028",
          "24062026",
          "24062027"
        ],
        "answer": "24062026"
      },
      {
        "id": "p27-3",
        "type": "select",
        "label": "Selezionare il numero dei Momenti elencati.",
        "options": [
          "4",
          "8",
          "0",
          "6",
          "7",
          "5"
        ],
        "answer": "6"
      },
      {
        "id": "p27-4",
        "type": "select",
        "label": "Stanziamento: 508.000.000,00. Selezionare il numero di cifre diverse da zero nello stanziamento 508.000.000,00.",
        "options": [
          "1",
          "0",
          "3",
          "4",
          "2",
          "5"
        ],
        "answer": "3"
      },
      {
        "id": "p27-5",
        "type": "select",
        "label": "Partecipante: Mario Rossi; email: mario.rossi@impresa.it; telefono: +39 347 1234567. Selezionare le vocali di \"Partecipante\".",
        "options": [
          "mario",
          "aeiae",
          "Mario",
          "Rossi",
          "Mario Rossi",
          "Rossi Mario"
        ],
        "answer": "aeiae"
      },
      {
        "id": "p27-6",
        "type": "select",
        "label": "Browser compatibili: Chrome, Firefox, Edge; browser non compatibili: Safari, Opera. Selezionare il browser compatibile tra Edge e Safari.",
        "options": [
          "Edge",
          "Chrome",
          "Firefox",
          "Safari",
          "Opera",
          "Chrome e Firefox"
        ],
        "answer": "Edge"
      },
      {
        "id": "p27-7",
        "type": "select",
        "label": "Bandiera italiana in ordine: verde-bianco-rosso. Selezionare il colore con 5 lettere nel tricolore.",
        "options": [
          "bianco",
          "rosso",
          "giallo",
          "blu",
          "verde-bianco-rosso",
          "verde"
        ],
        "answer": "verde"
      },
      {
        "id": "p27-8",
        "type": "select",
        "label": "Partecipante: Mario Rossi; email: mario.rossi@impresa.it; telefono: +39 347 1234567. Selezionare il primo nome del partecipante.",
        "options": [
          "Mario",
          "Mario Rossi",
          "Rossi Mario",
          "mario",
          "rossi",
          "Rossi"
        ],
        "answer": "Mario"
      },
      {
        "id": "p27-9",
        "type": "checkbox",
        "label": "Dichiarazione di presa visione delle regole tecniche.",
        "options": [
          "Dichiarazione di presa visione delle regole tecniche"
        ],
        "answer": [
          "Dichiarazione di presa visione delle regole tecniche"
        ]
      },
      {
        "id": "p27-10",
        "type": "checkbox",
        "label": "Non sono un robot.",
        "options": [
          "Non sono un robot"
        ],
        "answer": [
          "Non sono un robot"
        ]
      }
    ]
  },
  {
    "id": "bando-isi-2025-prova-28",
    "slot": 28,
    "title": "Prova 28",
    "description": "Bando ISI 2025 - simulazione con dati completi visibili nella domanda.",
    "questions": [
      {
        "id": "p28-1",
        "type": "select",
        "label": "Codice identificativo: +3b404cb3dcf6fc253b8f9f1f6a9c1b3a18fbcff8200744739c62fff649dd50d6. Selezionare il numero di cifre numeriche presenti nel codice identificativo.",
        "options": [
          "38",
          "36",
          "37",
          "35",
          "63",
          "34"
        ],
        "answer": "36"
      },
      {
        "id": "p28-2",
        "type": "select",
        "label": "Momento 6: 24/06/2026 ore 11:20. Selezionare la data del Momento 6 senza separatori.",
        "options": [
          "24062024",
          "24062027",
          "24062025",
          "24062028",
          "24062026",
          "62026042"
        ],
        "answer": "24062026"
      },
      {
        "id": "p28-3",
        "type": "select",
        "label": "Sito INAIL: https://www.inail.it; ente: INAIL. Selezionare il Momento corrispondente alle ore 11:20.",
        "options": [
          "Momento 4",
          "Momento 2",
          "Momento 3",
          "Momento 5",
          "Momento 1",
          "Momento 6"
        ],
        "answer": "Momento 6"
      },
      {
        "id": "p28-4",
        "type": "select",
        "label": "Stanziamento: 508.000.000,00. Selezionare il numero di zeri in 508000000.",
        "options": [
          "6",
          "4",
          "8",
          "0",
          "5",
          "7"
        ],
        "answer": "6"
      },
      {
        "id": "p28-5",
        "type": "select",
        "label": "Partecipante: Mario Rossi; email: mario.rossi@impresa.it; telefono: +39 347 1234567. Selezionare le consonanti di \"Partecipante\".",
        "options": [
          "Mario",
          "Prtcpnt",
          "Rossi Mario",
          "mario",
          "Mario Rossi",
          "Rossi"
        ],
        "answer": "Prtcpnt"
      },
      {
        "id": "p28-6",
        "type": "select",
        "label": "Sito INAIL: https://www.inail.it; ente: INAIL. Selezionare il sito con estensione italiana.",
        "options": [
          "INPS",
          "INAIL",
          "https://www.inail.it",
          "http",
          "https",
          "inail"
        ],
        "answer": "https://www.inail.it"
      },
      {
        "id": "p28-7",
        "type": "select",
        "label": "Bandiera italiana in ordine: verde-bianco-rosso. Selezionare il colore con 5 lettere tra bianco e rosso.",
        "options": [
          "bianco",
          "giallo",
          "verde",
          "verde-bianco-rosso",
          "rosso",
          "blu"
        ],
        "answer": "rosso"
      },
      {
        "id": "p28-8",
        "type": "select",
        "label": "Partecipante: Mario Rossi; email: mario.rossi@impresa.it; telefono: +39 347 1234567. Selezionare il cognome in minuscolo.",
        "options": [
          "rossi",
          "Mario Rossi",
          "Rossi",
          "Rossi Mario",
          "Mario",
          "mario"
        ],
        "answer": "rossi"
      },
      {
        "id": "p28-9",
        "type": "checkbox",
        "label": "Dichiarazione di presa visione delle regole tecniche.",
        "options": [
          "Dichiarazione di presa visione delle regole tecniche"
        ],
        "answer": [
          "Dichiarazione di presa visione delle regole tecniche"
        ]
      },
      {
        "id": "p28-10",
        "type": "checkbox",
        "label": "Non sono un robot.",
        "options": [
          "Non sono un robot"
        ],
        "answer": [
          "Non sono un robot"
        ]
      }
    ]
  },
  {
    "id": "bando-isi-2025-prova-29",
    "slot": 29,
    "title": "Prova 29",
    "description": "Bando ISI 2025 - simulazione con dati completi visibili nella domanda.",
    "questions": [
      {
        "id": "p29-1",
        "type": "select",
        "label": "Codice identificativo: +3b404cb3dcf6fc253b8f9f1f6a9c1b3a18fbcff8200744739c62fff649dd50d6. Selezionare il numero di lettere presenti nel codice identificativo.",
        "options": [
          "29",
          "28",
          "30",
          "82",
          "26",
          "27"
        ],
        "answer": "28"
      },
      {
        "id": "p29-2",
        "type": "select",
        "label": "Sito INAIL: https://www.inail.it; ente: INAIL. Selezionare il Momento corrispondente alle ore 11:00.",
        "options": [
          "Momento 2",
          "Momento 1",
          "Momento 4",
          "Momento 6",
          "Momento 5",
          "Momento 3"
        ],
        "answer": "Momento 5"
      },
      {
        "id": "p29-3",
        "type": "select",
        "label": "Assi di finanziamento: 5; asse domanda: Asse 1.1. Selezionare il numero di assi meno uno.",
        "options": [
          "3",
          "6",
          "0",
          "4",
          "5",
          "2"
        ],
        "answer": "4"
      },
      {
        "id": "p29-4",
        "type": "select",
        "label": "Stanziamento: 508.000.000,00. Selezionare il prodotto delle cifre diverse da zero dello stanziamento 508.",
        "options": [
          "40",
          "42",
          "38",
          "41",
          "39",
          "4"
        ],
        "answer": "40"
      },
      {
        "id": "p29-5",
        "type": "select",
        "label": "Codice identificativo: +3b404cb3dcf6fc253b8f9f1f6a9c1b3a18fbcff8200744739c62fff649dd50d6. Assi di finanziamento: 5; asse domanda: Asse 1.1. Selezionare le iniziali di \"Codice identificativo asse\".",
        "options": [
          "Asse 1.1",
          "Asse 2",
          "5",
          "Asse 1",
          "1.1",
          "CIA"
        ],
        "answer": "CIA"
      },
      {
        "id": "p29-6",
        "type": "select",
        "label": "Sito INAIL: https://www.inail.it; ente: INAIL. Selezionare il protocollo presente nel sito ufficiale.",
        "options": [
          "https",
          "INPS",
          "https://www.inail.it",
          "inail",
          "http",
          "INAIL"
        ],
        "answer": "https"
      },
      {
        "id": "p29-7",
        "type": "select",
        "label": "Sito INAIL: https://www.inail.it; ente: INAIL. Bandiera italiana in ordine: verde-bianco-rosso. Selezionare il colore non presente tra giallo, bianco e rosso.",
        "options": [
          "verde",
          "rosso",
          "verde-bianco-rosso",
          "blu",
          "giallo",
          "bianco"
        ],
        "answer": "giallo"
      },
      {
        "id": "p29-8",
        "type": "select",
        "label": "Partecipante: Mario Rossi; email: mario.rossi@impresa.it; telefono: +39 347 1234567. Selezionare le iniziali del nome e cognome in minuscolo.",
        "options": [
          "Rossi",
          "mario",
          "mr",
          "Rossi Mario",
          "Mario",
          "Mario Rossi"
        ],
        "answer": "mr"
      },
      {
        "id": "p29-9",
        "type": "checkbox",
        "label": "Dichiarazione di presa visione delle regole tecniche.",
        "options": [
          "Dichiarazione di presa visione delle regole tecniche"
        ],
        "answer": [
          "Dichiarazione di presa visione delle regole tecniche"
        ]
      },
      {
        "id": "p29-10",
        "type": "checkbox",
        "label": "Non sono un robot.",
        "options": [
          "Non sono un robot"
        ],
        "answer": [
          "Non sono un robot"
        ]
      }
    ]
  },
  {
    "id": "bando-isi-2025-prova-30",
    "slot": 30,
    "title": "Prova 30",
    "description": "Bando ISI 2025 - simulazione con dati completi visibili nella domanda.",
    "questions": [
      {
        "id": "p30-1",
        "type": "select",
        "label": "Codice identificativo: +3b404cb3dcf6fc253b8f9f1f6a9c1b3a18fbcff8200744739c62fff649dd50d6. Selezionare la somma di tutte le cifre del codice identificativo.",
        "options": [
          "159",
          "160",
          "851",
          "157",
          "156",
          "158"
        ],
        "answer": "158"
      },
      {
        "id": "p30-2",
        "type": "select",
        "label": "Selezionare il Momento con data 18/05/2026.",
        "options": [
          "Momento 5",
          "Momento 3",
          "Momento 6",
          "Momento 4",
          "Momento 1",
          "Momento 2"
        ],
        "answer": "Momento 1"
      },
      {
        "id": "p30-3",
        "type": "select",
        "label": "Bando: Bando ISI 2025; anno click day: 2026. Partecipante: Mario Rossi; email: mario.rossi@impresa.it; telefono: +39 347 1234567. Selezionare il nome del bando senza la parola \"Bando\".",
        "options": [
          "Rossi Mario",
          "Mario Rossi",
          "mario",
          "ISI 2025",
          "Mario",
          "Rossi"
        ],
        "answer": "ISI 2025"
      },
      {
        "id": "p30-4",
        "type": "select",
        "label": "Stanziamento: 508.000.000,00. Selezionare la differenza tra 508 e 8.",
        "options": [
          "498",
          "5",
          "500",
          "501",
          "499",
          "502"
        ],
        "answer": "500"
      },
      {
        "id": "p30-5",
        "type": "select",
        "label": "Bando: Bando ISI 2025; anno click day: 2026. Selezionare \"Bando ISI 2025\" senza spazi.",
        "options": [
          "2025",
          "BandoISI2025",
          "Bando ISI 2025",
          "Bando ISI 2026",
          "Bando ISI",
          "ISI 2025"
        ],
        "answer": "BandoISI2025"
      },
      {
        "id": "p30-6",
        "type": "select",
        "label": "Browser compatibili: Chrome, Firefox, Edge; browser non compatibili: Safari, Opera. Selezionare il browser non compatibile tra Opera e Chrome.",
        "options": [
          "Opera",
          "Chrome",
          "Firefox",
          "Edge",
          "Safari",
          "Chrome e Firefox"
        ],
        "answer": "Opera"
      },
      {
        "id": "p30-7",
        "type": "select",
        "label": "Bandiera italiana in ordine: verde-bianco-rosso. Selezionare la sequenza corretta tra verde-bianco-rosso e bianco-verde-rosso.",
        "options": [
          "verde",
          "bianco",
          "rosso",
          "giallo",
          "blu",
          "verde-bianco-rosso"
        ],
        "answer": "verde-bianco-rosso"
      },
      {
        "id": "p30-8",
        "type": "select",
        "label": "Partecipante: Mario Rossi; email: mario.rossi@impresa.it; telefono: +39 347 1234567. Selezionare il nome e cognome senza spazi.",
        "options": [
          "MarioRossi",
          "Rossi",
          "Mario Rossi",
          "Rossi Mario",
          "mario",
          "Mario"
        ],
        "answer": "MarioRossi"
      },
      {
        "id": "p30-9",
        "type": "checkbox",
        "label": "Dichiarazione di presa visione delle regole tecniche.",
        "options": [
          "Dichiarazione di presa visione delle regole tecniche"
        ],
        "answer": [
          "Dichiarazione di presa visione delle regole tecniche"
        ]
      },
      {
        "id": "p30-10",
        "type": "checkbox",
        "label": "Non sono un robot.",
        "options": [
          "Non sono un robot"
        ],
        "answer": [
          "Non sono un robot"
        ]
      }
    ]
  },
  {
    "id": "bando-isi-2025-prova-31",
    "slot": 31,
    "title": "Prova 31",
    "description": "Bando ISI 2025 - simulazione con dati completi visibili nella domanda.",
    "questions": [
      {
        "id": "p31-1",
        "type": "select",
        "label": "Codice identificativo: +3b404cb3dcf6fc253b8f9f1f6a9c1b3a18fbcff8200744739c62fff649dd50d6. Selezionare il numero di zeri nel codice identificativo.",
        "options": [
          "6",
          "4",
          "5",
          "3",
          "0",
          "2"
        ],
        "answer": "4"
      },
      {
        "id": "p31-2",
        "type": "select",
        "label": "Selezionare il Momento con data 19/06/2026.",
        "options": [
          "Momento 5",
          "Momento 1",
          "Momento 3",
          "Momento 4",
          "Momento 2",
          "Momento 6"
        ],
        "answer": "Momento 2"
      },
      {
        "id": "p31-3",
        "type": "select",
        "label": "Bando: Bando ISI 2025; anno click day: 2026. Selezionare l'anno bando scritto con ultime due cifre.",
        "options": [
          "23",
          "24",
          "27",
          "52",
          "26",
          "25"
        ],
        "answer": "25"
      },
      {
        "id": "p31-4",
        "type": "select",
        "label": "Selezionare il risultato di 13 più 5.",
        "options": [
          "18",
          "16",
          "20",
          "81",
          "17",
          "19"
        ],
        "answer": "18"
      },
      {
        "id": "p31-5",
        "type": "select",
        "label": "Selezionare il numero di parole in \"Regole tecniche\".",
        "options": [
          "3",
          "2",
          "0",
          "5",
          "4",
          "1"
        ],
        "answer": "2"
      },
      {
        "id": "p31-6",
        "type": "select",
        "label": "Sito INAIL: https://www.inail.it; ente: INAIL. Selezionare il sito senza www.",
        "options": [
          "INPS",
          "INAIL",
          "inail.it",
          "http",
          "https",
          "inail"
        ],
        "answer": "inail.it"
      },
      {
        "id": "p31-7",
        "type": "select",
        "label": "Bandiera italiana in ordine: verde-bianco-rosso. Selezionare il tricolore in ordine alfabetico dei colori.",
        "options": [
          "bianco",
          "rosso",
          "verde",
          "blu",
          "bianco-rosso-verde",
          "giallo"
        ],
        "answer": "bianco-rosso-verde"
      },
      {
        "id": "p31-8",
        "type": "select",
        "label": "Partecipante: Mario Rossi; email: mario.rossi@impresa.it; telefono: +39 347 1234567. Selezionare il telefono senza spazi e senza simbolo più.",
        "options": [
          "393471234567",
          "393471234569",
          "393471234566",
          "393471234565",
          "393471234568",
          "765432174393"
        ],
        "answer": "393471234567"
      },
      {
        "id": "p31-9",
        "type": "checkbox",
        "label": "Dichiarazione di presa visione delle regole tecniche.",
        "options": [
          "Dichiarazione di presa visione delle regole tecniche"
        ],
        "answer": [
          "Dichiarazione di presa visione delle regole tecniche"
        ]
      },
      {
        "id": "p31-10",
        "type": "checkbox",
        "label": "Non sono un robot.",
        "options": [
          "Non sono un robot"
        ],
        "answer": [
          "Non sono un robot"
        ]
      }
    ]
  },
  {
    "id": "bando-isi-2025-prova-32",
    "slot": 32,
    "title": "Prova 32",
    "description": "Bando ISI 2025 - simulazione con dati completi visibili nella domanda.",
    "questions": [
      {
        "id": "p32-1",
        "type": "select",
        "label": "Codice identificativo: +3b404cb3dcf6fc253b8f9f1f6a9c1b3a18fbcff8200744739c62fff649dd50d6. Selezionare il numero di lettere f nel codice identificativo.",
        "options": [
          "12",
          "11",
          "13",
          "2011",
          "9",
          "10"
        ],
        "answer": "11"
      },
      {
        "id": "p32-2",
        "type": "select",
        "label": "Selezionare il Momento con data 22/06/2026.",
        "options": [
          "Momento 2",
          "Momento 1",
          "Momento 5",
          "Momento 6",
          "Momento 3",
          "Momento 4"
        ],
        "answer": "Momento 3"
      },
      {
        "id": "p32-3",
        "type": "select",
        "label": "Bando: Bando ISI 2025; anno click day: 2026. Selezionare l'anno click day scritto con ultime due cifre.",
        "options": [
          "25",
          "28",
          "62",
          "26",
          "27",
          "24"
        ],
        "answer": "26"
      },
      {
        "id": "p32-4",
        "type": "select",
        "label": "Selezionare il risultato di 93 meno 13.",
        "options": [
          "80",
          "82",
          "78",
          "81",
          "79",
          "8"
        ],
        "answer": "80"
      },
      {
        "id": "p32-5",
        "type": "select",
        "label": "Bando: Bando ISI 2025; anno click day: 2026. Selezionare le vocali di \"Bando\".",
        "options": [
          "Bando ISI 2025",
          "ISI 2025",
          "2025",
          "Bando ISI 2026",
          "Bando ISI",
          "ao"
        ],
        "answer": "ao"
      },
      {
        "id": "p32-6",
        "type": "select",
        "label": "Browser compatibili: Chrome, Firefox, Edge; browser non compatibili: Safari, Opera. Selezionare il browser compatibile tra Chrome e Opera.",
        "options": [
          "Chrome",
          "Edge",
          "Chrome e Firefox",
          "Safari",
          "Opera",
          "Firefox"
        ],
        "answer": "Chrome"
      },
      {
        "id": "p32-7",
        "type": "select",
        "label": "Bandiera italiana in ordine: verde-bianco-rosso. Selezionare il numero di lettere di \"bianco\".",
        "options": [
          "7",
          "8",
          "0",
          "4",
          "6",
          "5"
        ],
        "answer": "6"
      },
      {
        "id": "p32-8",
        "type": "select",
        "label": "Sito INAIL: https://www.inail.it; ente: INAIL. Partecipante: Mario Rossi; email: mario.rossi@impresa.it; telefono: +39 347 1234567. Selezionare il dominio email con chiocciola esclusa.",
        "options": [
          "INPS",
          "http",
          "impresa.it",
          "https",
          "INAIL",
          "inail"
        ],
        "answer": "impresa.it"
      },
      {
        "id": "p32-9",
        "type": "checkbox",
        "label": "Dichiarazione di presa visione delle regole tecniche.",
        "options": [
          "Dichiarazione di presa visione delle regole tecniche"
        ],
        "answer": [
          "Dichiarazione di presa visione delle regole tecniche"
        ]
      },
      {
        "id": "p32-10",
        "type": "checkbox",
        "label": "Non sono un robot.",
        "options": [
          "Non sono un robot"
        ],
        "answer": [
          "Non sono un robot"
        ]
      }
    ]
  },
  {
    "id": "bando-isi-2025-prova-33",
    "slot": 33,
    "title": "Prova 33",
    "description": "Bando ISI 2025 - simulazione con dati completi visibili nella domanda.",
    "questions": [
      {
        "id": "p33-1",
        "type": "select",
        "label": "Codice identificativo: +3b404cb3dcf6fc253b8f9f1f6a9c1b3a18fbcff8200744739c62fff649dd50d6. Selezionare il numero di caratteri 3 nel codice identificativo.",
        "options": [
          "6",
          "7",
          "0",
          "4",
          "3",
          "5"
        ],
        "answer": "5"
      },
      {
        "id": "p33-2",
        "type": "select",
        "label": "Selezionare il Momento con data 23/06/2026.",
        "options": [
          "Momento 5",
          "Momento 2",
          "Momento 6",
          "Momento 3",
          "Momento 4",
          "Momento 1"
        ],
        "answer": "Momento 4"
      },
      {
        "id": "p33-3",
        "type": "select",
        "label": "Bando: Bando ISI 2025; anno click day: 2026. Selezionare il bando con anno in formato completo.",
        "options": [
          "2025",
          "ISI 2025",
          "2026",
          "Bando ISI 2025",
          "Bando ISI 2026",
          "Bando ISI"
        ],
        "answer": "Bando ISI 2025"
      },
      {
        "id": "p33-4",
        "type": "select",
        "label": "Selezionare il risultato di 26 meno 25.",
        "options": [
          "4",
          "5",
          "1",
          "2",
          "0",
          "3"
        ],
        "answer": "1"
      },
      {
        "id": "p33-5",
        "type": "select",
        "label": "Bando: Bando ISI 2025; anno click day: 2026. Selezionare le consonanti di \"Bando\".",
        "options": [
          "2025",
          "Bnd",
          "Bando ISI 2025",
          "Bando ISI 2026",
          "Bando ISI",
          "ISI 2025"
        ],
        "answer": "Bnd"
      },
      {
        "id": "p33-6",
        "type": "select",
        "label": "Sito INAIL: https://www.inail.it; ente: INAIL. Selezionare l'ente erogatore scritto in minuscolo.",
        "options": [
          "inail",
          "INAIL",
          "INPS",
          "https",
          "http",
          "https://www.inail.it"
        ],
        "answer": "inail"
      },
      {
        "id": "p33-7",
        "type": "select",
        "label": "Bandiera italiana in ordine: verde-bianco-rosso. Selezionare il numero di lettere di \"rosso\".",
        "options": [
          "6",
          "4",
          "7",
          "3",
          "0",
          "5"
        ],
        "answer": "5"
      },
      {
        "id": "p33-8",
        "type": "select",
        "label": "Partecipante: Mario Rossi; email: mario.rossi@impresa.it; telefono: +39 347 1234567. Selezionare l'ultima lettera del cognome Rossi.",
        "options": [
          "i",
          "Rossi",
          "Mario Rossi",
          "Rossi Mario",
          "mario",
          "Mario"
        ],
        "answer": "i"
      },
      {
        "id": "p33-9",
        "type": "checkbox",
        "label": "Dichiarazione di presa visione delle regole tecniche.",
        "options": [
          "Dichiarazione di presa visione delle regole tecniche"
        ],
        "answer": [
          "Dichiarazione di presa visione delle regole tecniche"
        ]
      },
      {
        "id": "p33-10",
        "type": "checkbox",
        "label": "Non sono un robot.",
        "options": [
          "Non sono un robot"
        ],
        "answer": [
          "Non sono un robot"
        ]
      }
    ]
  },
  {
    "id": "bando-isi-2025-prova-34",
    "slot": 34,
    "title": "Prova 34",
    "description": "Bando ISI 2025 - simulazione con dati completi visibili nella domanda.",
    "questions": [
      {
        "id": "p34-1",
        "type": "select",
        "label": "Codice identificativo: +3b404cb3dcf6fc253b8f9f1f6a9c1b3a18fbcff8200744739c62fff649dd50d6. Sito INAIL: https://www.inail.it; ente: INAIL. Selezionare la prima cifra numerica presente nel codice identificativo.",
        "options": [
          "5",
          "3",
          "4",
          "2",
          "0",
          "1"
        ],
        "answer": "3"
      },
      {
        "id": "p34-2",
        "type": "select",
        "label": "Selezionare il Momento con data 24/06/2026 ore 11:00.",
        "options": [
          "Momento 4",
          "Momento 1",
          "Momento 2",
          "Momento 3",
          "Momento 5",
          "Momento 6"
        ],
        "answer": "Momento 5"
      },
      {
        "id": "p34-3",
        "type": "select",
        "label": "Bando: Bando ISI 2025; anno click day: 2026. Selezionare il numero dell'anno bando meno 2000.",
        "options": [
          "23",
          "24",
          "27",
          "52",
          "26",
          "25"
        ],
        "answer": "25"
      },
      {
        "id": "p34-4",
        "type": "select",
        "label": "Selezionare il risultato di 2026 meno 2025.",
        "options": [
          "1",
          "4",
          "3",
          "5",
          "0",
          "2"
        ],
        "answer": "1"
      },
      {
        "id": "p34-5",
        "type": "select",
        "label": "Selezionare le vocali di \"ISI\".",
        "options": [
          "Bando ISI 2025",
          "ii",
          "ISI 2025",
          "2025",
          "Bando ISI",
          "Bando ISI 2026"
        ],
        "answer": "ii"
      },
      {
        "id": "p34-6",
        "type": "select",
        "label": "Sito INAIL: https://www.inail.it; ente: INAIL. Selezionare il dominio errato tra www.inail.it e www.inail.com.",
        "options": [
          "INPS",
          "INAIL",
          "www.inail.com",
          "http",
          "https",
          "inail"
        ],
        "answer": "www.inail.com"
      },
      {
        "id": "p34-7",
        "type": "select",
        "label": "Bandiera italiana in ordine: verde-bianco-rosso. Selezionare il numero di lettere di \"verde\".",
        "options": [
          "4",
          "7",
          "6",
          "0",
          "5",
          "3"
        ],
        "answer": "5"
      },
      {
        "id": "p34-8",
        "type": "select",
        "label": "Partecipante: Mario Rossi; email: mario.rossi@impresa.it; telefono: +39 347 1234567. Selezionare la prima lettera del nome Mario.",
        "options": [
          "M",
          "Mario Rossi",
          "Rossi",
          "Rossi Mario",
          "Mario",
          "mario"
        ],
        "answer": "M"
      },
      {
        "id": "p34-9",
        "type": "checkbox",
        "label": "Dichiarazione di presa visione delle regole tecniche.",
        "options": [
          "Dichiarazione di presa visione delle regole tecniche"
        ],
        "answer": [
          "Dichiarazione di presa visione delle regole tecniche"
        ]
      },
      {
        "id": "p34-10",
        "type": "checkbox",
        "label": "Non sono un robot.",
        "options": [
          "Non sono un robot"
        ],
        "answer": [
          "Non sono un robot"
        ]
      }
    ]
  },
  {
    "id": "bando-isi-2025-prova-35",
    "slot": 35,
    "title": "Prova 35",
    "description": "Bando ISI 2025 - simulazione con dati completi visibili nella domanda.",
    "questions": [
      {
        "id": "p35-1",
        "type": "select",
        "label": "Codice identificativo: +3b404cb3dcf6fc253b8f9f1f6a9c1b3a18fbcff8200744739c62fff649dd50d6. Sito INAIL: https://www.inail.it; ente: INAIL. Selezionare l'ultima cifra numerica presente nel codice identificativo.",
        "options": [
          "7",
          "6",
          "8",
          "0",
          "4",
          "5"
        ],
        "answer": "6"
      },
      {
        "id": "p35-2",
        "type": "select",
        "label": "Selezionare il Momento con data 24/06/2026 ore 11:20.",
        "options": [
          "Momento 2",
          "Momento 1",
          "Momento 4",
          "Momento 5",
          "Momento 6",
          "Momento 3"
        ],
        "answer": "Momento 6"
      },
      {
        "id": "p35-3",
        "type": "select",
        "label": "Bando: Bando ISI 2025; anno click day: 2026. Selezionare il numero dell'anno click day meno 2000.",
        "options": [
          "25",
          "28",
          "62",
          "26",
          "27",
          "24"
        ],
        "answer": "26"
      },
      {
        "id": "p35-4",
        "type": "select",
        "label": "Selezionare il risultato di 6 per 5.",
        "options": [
          "30",
          "32",
          "28",
          "31",
          "29",
          "3"
        ],
        "answer": "30"
      },
      {
        "id": "p35-5",
        "type": "select",
        "label": "Selezionare le consonanti di \"ISI\".",
        "options": [
          "Bando ISI 2025",
          "ISI 2025",
          "2025",
          "Bando ISI 2026",
          "Bando ISI",
          "nessuna"
        ],
        "answer": "nessuna"
      },
      {
        "id": "p35-6",
        "type": "select",
        "label": "Browser compatibili: Chrome, Firefox, Edge; browser non compatibili: Safari, Opera. Selezionare il browser non compatibile tra Safari e Firefox.",
        "options": [
          "Safari",
          "Firefox",
          "Chrome e Firefox",
          "Edge",
          "Opera",
          "Chrome"
        ],
        "answer": "Safari"
      },
      {
        "id": "p35-7",
        "type": "select",
        "label": "Bandiera italiana in ordine: verde-bianco-rosso. Selezionare il colore più lungo del tricolore.",
        "options": [
          "verde",
          "giallo",
          "verde-bianco-rosso",
          "blu",
          "bianco",
          "rosso"
        ],
        "answer": "bianco"
      },
      {
        "id": "p35-8",
        "type": "select",
        "label": "Partecipante: Mario Rossi; email: mario.rossi@impresa.it; telefono: +39 347 1234567. Selezionare la prima lettera del cognome Rossi.",
        "options": [
          "Rossi",
          "mario",
          "R",
          "Rossi Mario",
          "Mario",
          "Mario Rossi"
        ],
        "answer": "R"
      },
      {
        "id": "p35-9",
        "type": "checkbox",
        "label": "Dichiarazione di presa visione delle regole tecniche.",
        "options": [
          "Dichiarazione di presa visione delle regole tecniche"
        ],
        "answer": [
          "Dichiarazione di presa visione delle regole tecniche"
        ]
      },
      {
        "id": "p35-10",
        "type": "checkbox",
        "label": "Non sono un robot.",
        "options": [
          "Non sono un robot"
        ],
        "answer": [
          "Non sono un robot"
        ]
      }
    ]
  },
  {
    "id": "bando-isi-2025-prova-36",
    "slot": 36,
    "title": "Prova 36",
    "description": "Bando ISI 2025 - simulazione con dati completi visibili nella domanda.",
    "questions": [
      {
        "id": "p36-1",
        "type": "select",
        "label": "Codice identificativo: +3b404cb3dcf6fc253b8f9f1f6a9c1b3a18fbcff8200744739c62fff649dd50d6. Sito INAIL: https://www.inail.it; ente: INAIL. Selezionare la prima lettera presente nel codice identificativo.",
        "options": [
          "INAIL",
          "inail",
          "http",
          "INPS",
          "https",
          "b"
        ],
        "answer": "b"
      },
      {
        "id": "p36-2",
        "type": "select",
        "label": "Selezionare il mese dell'apertura sportello.",
        "options": [
          "Maggio",
          "giu",
          "06",
          "maggio",
          "giugno",
          "Giugno"
        ],
        "answer": "giugno"
      },
      {
        "id": "p36-3",
        "type": "select",
        "label": "Bando: Bando ISI 2025; anno click day: 2026. Selezionare la parola centrale in \"Bando ISI 2025\".",
        "options": [
          "ISI 2025",
          "Bando ISI",
          "2025",
          "ISI",
          "Bando ISI 2025",
          "Bando ISI 2026"
        ],
        "answer": "ISI"
      },
      {
        "id": "p36-4",
        "type": "select",
        "label": "Selezionare il risultato di 100 diviso 4.",
        "options": [
          "23",
          "52",
          "25",
          "26",
          "24",
          "27"
        ],
        "answer": "25"
      },
      {
        "id": "p36-5",
        "type": "select",
        "label": "Sito INAIL: https://www.inail.it; ente: INAIL. Selezionare il numero di vocali in \"INAIL\".",
        "options": [
          "0",
          "3",
          "4",
          "2",
          "5",
          "1"
        ],
        "answer": "3"
      },
      {
        "id": "p36-6",
        "type": "select",
        "label": "Sito INAIL: https://www.inail.it; ente: INAIL. Selezionare l'estensione non corretta tra .it e .com per INAIL.",
        "options": [
          ".com",
          "INAIL",
          "INPS",
          "inail",
          "https",
          "http"
        ],
        "answer": ".com"
      },
      {
        "id": "p36-7",
        "type": "select",
        "label": "Bandiera italiana in ordine: verde-bianco-rosso. Selezionare il colore più corto tra verde, bianco e rosso.",
        "options": [
          "verde",
          "bianco",
          "rosso",
          "giallo",
          "blu",
          "verde e rosso"
        ],
        "answer": "verde e rosso"
      },
      {
        "id": "p36-8",
        "type": "select",
        "label": "Partecipante: Mario Rossi; email: mario.rossi@impresa.it; telefono: +39 347 1234567. Selezionare l'ultima lettera del nome Mario.",
        "options": [
          "o",
          "Rossi",
          "Mario Rossi",
          "Rossi Mario",
          "mario",
          "Mario"
        ],
        "answer": "o"
      },
      {
        "id": "p36-9",
        "type": "checkbox",
        "label": "Dichiarazione di presa visione delle regole tecniche.",
        "options": [
          "Dichiarazione di presa visione delle regole tecniche"
        ],
        "answer": [
          "Dichiarazione di presa visione delle regole tecniche"
        ]
      },
      {
        "id": "p36-10",
        "type": "checkbox",
        "label": "Non sono un robot.",
        "options": [
          "Non sono un robot"
        ],
        "answer": [
          "Non sono un robot"
        ]
      }
    ]
  },
  {
    "id": "bando-isi-2025-prova-37",
    "slot": 37,
    "title": "Prova 37",
    "description": "Bando ISI 2025 - simulazione con dati completi visibili nella domanda.",
    "questions": [
      {
        "id": "p37-1",
        "type": "select",
        "label": "Codice identificativo: +3b404cb3dcf6fc253b8f9f1f6a9c1b3a18fbcff8200744739c62fff649dd50d6. Sito INAIL: https://www.inail.it; ente: INAIL. Selezionare l'ultima lettera presente nel codice identificativo.",
        "options": [
          "inail",
          "d",
          "INAIL",
          "INPS",
          "http",
          "https"
        ],
        "answer": "d"
      },
      {
        "id": "p37-2",
        "type": "select",
        "label": "Selezionare il mese della chiusura sportello.",
        "options": [
          "Maggio",
          "Giugno",
          "giu",
          "maggio",
          "giugno",
          "06"
        ],
        "answer": "giugno"
      },
      {
        "id": "p37-3",
        "type": "select",
        "label": "Bando: Bando ISI 2025; anno click day: 2026. Selezionare il numero di parole in \"Bando ISI 2025\".",
        "options": [
          "1",
          "2",
          "5",
          "0",
          "4",
          "3"
        ],
        "answer": "3"
      },
      {
        "id": "p37-4",
        "type": "select",
        "label": "Selezionare il risultato di 65 meno 5.",
        "options": [
          "60",
          "58",
          "62",
          "6",
          "59",
          "61"
        ],
        "answer": "60"
      },
      {
        "id": "p37-5",
        "type": "select",
        "label": "Sito INAIL: https://www.inail.it; ente: INAIL. Selezionare il numero di consonanti in \"INAIL\".",
        "options": [
          "3",
          "2",
          "0",
          "5",
          "4",
          "1"
        ],
        "answer": "2"
      },
      {
        "id": "p37-6",
        "type": "select",
        "label": "Browser compatibili: Chrome, Firefox, Edge; browser non compatibili: Safari, Opera. Selezionare il browser compatibile tra Edge e Opera.",
        "options": [
          "Firefox",
          "Chrome",
          "Edge",
          "Chrome e Firefox",
          "Opera",
          "Safari"
        ],
        "answer": "Edge"
      },
      {
        "id": "p37-7",
        "type": "select",
        "label": "Bandiera italiana in ordine: verde-bianco-rosso. Selezionare i colori del tricolore senza trattini.",
        "options": [
          "bianco",
          "rosso",
          "verde",
          "blu",
          "verde bianco rosso",
          "giallo"
        ],
        "answer": "verde bianco rosso"
      },
      {
        "id": "p37-8",
        "type": "select",
        "label": "Partecipante: Mario Rossi; email: mario.rossi@impresa.it; telefono: +39 347 1234567. Selezionare la parte dopo il punto nello username email.",
        "options": [
          "rossi",
          "Mario Rossi",
          "Rossi",
          "Rossi Mario",
          "Mario",
          "mario"
        ],
        "answer": "rossi"
      },
      {
        "id": "p37-9",
        "type": "checkbox",
        "label": "Dichiarazione di presa visione delle regole tecniche.",
        "options": [
          "Dichiarazione di presa visione delle regole tecniche"
        ],
        "answer": [
          "Dichiarazione di presa visione delle regole tecniche"
        ]
      },
      {
        "id": "p37-10",
        "type": "checkbox",
        "label": "Non sono un robot.",
        "options": [
          "Non sono un robot"
        ],
        "answer": [
          "Non sono un robot"
        ]
      }
    ]
  },
  {
    "id": "bando-isi-2025-prova-38",
    "slot": 38,
    "title": "Prova 38",
    "description": "Bando ISI 2025 - simulazione con dati completi visibili nella domanda.",
    "questions": [
      {
        "id": "p38-1",
        "type": "select",
        "label": "Codice identificativo: +3b404cb3dcf6fc253b8f9f1f6a9c1b3a18fbcff8200744739c62fff649dd50d6. Selezionare dall'ottavo al quattordicesimo carattere del codice identificativo.",
        "options": [
          "3dcf6f",
          "b3dcf6f",
          "B3dcf6f",
          "b3dcf6",
          "b3dcf6f0"
        ],
        "answer": "b3dcf6f"
      },
      {
        "id": "p38-2",
        "type": "select",
        "label": "Sportello simulato: apertura 24/06/2026 ore 11:00, chiusura 24/06/2026 ore 11:20. Selezionare il giorno di apertura dello sportello.",
        "options": [
          "23",
          "25",
          "22",
          "42",
          "24",
          "26"
        ],
        "answer": "24"
      },
      {
        "id": "p38-3",
        "type": "select",
        "label": "Bando: Bando ISI 2025; anno click day: 2026. Selezionare l'ultima parola in \"Bando ISI 2025\".",
        "options": [
          "2024",
          "2027",
          "5202",
          "2025",
          "2026",
          "2023"
        ],
        "answer": "2025"
      },
      {
        "id": "p38-4",
        "type": "select",
        "label": "Momento 1: 18/05/2026 ore 10:00. Assi di finanziamento: 5; asse domanda: Asse 1.1. Selezionare la somma tra numero assi e giorno del Momento 1.",
        "options": [
          "23",
          "25",
          "21",
          "24",
          "22",
          "32"
        ],
        "answer": "23"
      },
      {
        "id": "p38-5",
        "type": "select",
        "label": "Partecipante: Mario Rossi; email: mario.rossi@impresa.it; telefono: +39 347 1234567. Selezionare \"Portale partecipante\" senza spazi.",
        "options": [
          "Mario",
          "Rossi Mario",
          "mario",
          "Rossi",
          "Mario Rossi",
          "Portalepartecipante"
        ],
        "answer": "Portalepartecipante"
      },
      {
        "id": "p38-6",
        "type": "select",
        "label": "Sito INAIL: https://www.inail.it; ente: INAIL. Partecipante: Mario Rossi; email: mario.rossi@impresa.it; telefono: +39 347 1234567. Selezionare il dominio email errato tra impresa.it e impresa.ti.",
        "options": [
          "impresa.ti",
          "INPS",
          "http",
          "inail",
          "https",
          "INAIL"
        ],
        "answer": "impresa.ti"
      },
      {
        "id": "p38-7",
        "type": "select",
        "label": "Bandiera italiana in ordine: verde-bianco-rosso. Selezionare la prima vocale di \"verde\".",
        "options": [
          "verde",
          "rosso",
          "blu",
          "giallo",
          "e",
          "bianco"
        ],
        "answer": "e"
      },
      {
        "id": "p38-8",
        "type": "select",
        "label": "Partecipante: Mario Rossi; email: mario.rossi@impresa.it; telefono: +39 347 1234567. Selezionare il partecipante scritto cognome-nome senza spazi.",
        "options": [
          "Rossi",
          "mario",
          "RossiMario",
          "Rossi Mario",
          "Mario",
          "Mario Rossi"
        ],
        "answer": "RossiMario"
      },
      {
        "id": "p38-9",
        "type": "checkbox",
        "label": "Dichiarazione di presa visione delle regole tecniche.",
        "options": [
          "Dichiarazione di presa visione delle regole tecniche"
        ],
        "answer": [
          "Dichiarazione di presa visione delle regole tecniche"
        ]
      },
      {
        "id": "p38-10",
        "type": "checkbox",
        "label": "Non sono un robot.",
        "options": [
          "Non sono un robot"
        ],
        "answer": [
          "Non sono un robot"
        ]
      }
    ]
  },
  {
    "id": "bando-isi-2025-prova-39",
    "slot": 39,
    "title": "Prova 39",
    "description": "Bando ISI 2025 - simulazione con dati completi visibili nella domanda.",
    "questions": [
      {
        "id": "p39-1",
        "type": "select",
        "label": "Codice identificativo: +3b404cb3dcf6fc253b8f9f1f6a9c1b3a18fbcff8200744739c62fff649dd50d6. Sito INAIL: https://www.inail.it; ente: INAIL. Selezionare dal decimo al ventesimo carattere del codice identificativo.",
        "options": [
          "INAIL",
          "inail",
          "http",
          "INPS",
          "https",
          "dcf6fc253b8"
        ],
        "answer": "dcf6fc253b8"
      },
      {
        "id": "p39-2",
        "type": "select",
        "label": "Sportello simulato: apertura 24/06/2026 ore 11:00, chiusura 24/06/2026 ore 11:20. Selezionare il giorno di chiusura dello sportello.",
        "options": [
          "22",
          "23",
          "42",
          "26",
          "24",
          "25"
        ],
        "answer": "24"
      },
      {
        "id": "p39-3",
        "type": "select",
        "label": "Bando: Bando ISI 2025; anno click day: 2026. Selezionare la prima parola in \"Bando ISI 2025\".",
        "options": [
          "ISI 2025",
          "Bando ISI",
          "2025",
          "Bando",
          "Bando ISI 2025",
          "Bando ISI 2026"
        ],
        "answer": "Bando"
      },
      {
        "id": "p39-4",
        "type": "select",
        "label": "Assi di finanziamento: 5; asse domanda: Asse 1.1. Selezionare la differenza tra giorno odierno e numero assi.",
        "options": [
          "17",
          "91",
          "19",
          "20",
          "18",
          "21"
        ],
        "answer": "19"
      },
      {
        "id": "p39-5",
        "type": "select",
        "label": "Selezionare \"Portale amministratore\" senza spazi.",
        "options": [
          "PORTALEAMMINISTRATORE",
          "Portaleamministratore",
          "ortaleamministratore",
          "Portaleamministrator",
          "portaleamministratore",
          "Portaleamministratore0"
        ],
        "answer": "Portaleamministratore"
      },
      {
        "id": "p39-6",
        "type": "select",
        "label": "Dati browser: compatibili Chrome, Firefox, Edge; non compatibili Safari, Opera. Selezionare i browser errati per compatibilita tra Safari e Opera.",
        "options": [
          "Safari e Opera",
          "Chrome",
          "Firefox",
          "Edge",
          "Safari",
          "Opera"
        ],
        "answer": "Safari e Opera"
      },
      {
        "id": "p39-7",
        "type": "select",
        "label": "Bandiera italiana in ordine: verde-bianco-rosso. Selezionare l'ultima vocale di \"rosso\".",
        "options": [
          "verde",
          "bianco",
          "rosso",
          "giallo",
          "blu",
          "o"
        ],
        "answer": "o"
      },
      {
        "id": "p39-8",
        "type": "select",
        "label": "Partecipante: Mario Rossi; email: mario.rossi@impresa.it; telefono: +39 347 1234567. Selezionare l'email tutta in minuscolo.",
        "options": [
          "mario.rossi@impresa.it",
          "Rossi",
          "Mario Rossi",
          "Rossi Mario",
          "mario",
          "Mario"
        ],
        "answer": "mario.rossi@impresa.it"
      },
      {
        "id": "p39-9",
        "type": "checkbox",
        "label": "Dichiarazione di presa visione delle regole tecniche.",
        "options": [
          "Dichiarazione di presa visione delle regole tecniche"
        ],
        "answer": [
          "Dichiarazione di presa visione delle regole tecniche"
        ]
      },
      {
        "id": "p39-10",
        "type": "checkbox",
        "label": "Non sono un robot.",
        "options": [
          "Non sono un robot"
        ],
        "answer": [
          "Non sono un robot"
        ]
      }
    ]
  },
  {
    "id": "bando-isi-2025-prova-40",
    "slot": 40,
    "title": "Prova 40",
    "description": "Bando ISI 2025 - simulazione con dati completi visibili nella domanda.",
    "questions": [
      {
        "id": "p40-1",
        "type": "select",
        "label": "Codice identificativo: +3b404cb3dcf6fc253b8f9f1f6a9c1b3a18fbcff8200744739c62fff649dd50d6. Selezionare dal dodicesimo al diciottesimo carattere del codice identificativo.",
        "options": [
          "F6fc253",
          "f6fc253",
          "6fc253",
          "f6fc25",
          "f6fc2530"
        ],
        "answer": "f6fc253"
      },
      {
        "id": "p40-2",
        "type": "select",
        "label": "Sportello simulato: apertura 24/06/2026 ore 11:00, chiusura 24/06/2026 ore 11:20. Selezionare la durata dello sportello in minuti.",
        "options": [
          "18",
          "21",
          "19",
          "22",
          "20",
          "2"
        ],
        "answer": "20"
      },
      {
        "id": "p40-3",
        "type": "select",
        "label": "Bando: Bando ISI 2025; anno click day: 2026. Selezionare il numero di cifre dell'anno del bando.",
        "options": [
          "2",
          "3",
          "6",
          "0",
          "5",
          "4"
        ],
        "answer": "4"
      },
      {
        "id": "p40-4",
        "type": "select",
        "label": "Selezionare la somma tra 11 e 20.",
        "options": [
          "31",
          "29",
          "33",
          "13",
          "30",
          "32"
        ],
        "answer": "31"
      },
      {
        "id": "p40-5",
        "type": "select",
        "label": "Partecipante: Mario Rossi; email: mario.rossi@impresa.it; telefono: +39 347 1234567. Selezionare le iniziali di \"Portale partecipante amministratore\".",
        "options": [
          "Mario",
          "PPA",
          "Rossi Mario",
          "mario",
          "Mario Rossi",
          "Rossi"
        ],
        "answer": "PPA"
      },
      {
        "id": "p40-6",
        "type": "select",
        "label": "Sito INAIL: https://www.inail.it; ente: INAIL. Selezionare il sito ufficiale tutto in minuscolo.",
        "options": [
          "INPS",
          "INAIL",
          "https://www.inail.it",
          "http",
          "https",
          "inail"
        ],
        "answer": "https://www.inail.it"
      },
      {
        "id": "p40-7",
        "type": "select",
        "label": "Bandiera italiana in ordine: verde-bianco-rosso. Selezionare l'ultima consonante di \"bianco\".",
        "options": [
          "bianco",
          "rosso",
          "verde",
          "blu",
          "c",
          "giallo"
        ],
        "answer": "c"
      },
      {
        "id": "p40-8",
        "type": "select",
        "label": "Partecipante: Mario Rossi; email: mario.rossi@impresa.it; telefono: +39 347 1234567. Selezionare il telefono nazionale senza spazi.",
        "options": [
          "3471234567",
          "3471234569",
          "3471234566",
          "3471234565",
          "3471234568",
          "7654321743"
        ],
        "answer": "3471234567"
      },
      {
        "id": "p40-9",
        "type": "checkbox",
        "label": "Dichiarazione di presa visione delle regole tecniche.",
        "options": [
          "Dichiarazione di presa visione delle regole tecniche"
        ],
        "answer": [
          "Dichiarazione di presa visione delle regole tecniche"
        ]
      },
      {
        "id": "p40-10",
        "type": "checkbox",
        "label": "Non sono un robot.",
        "options": [
          "Non sono un robot"
        ],
        "answer": [
          "Non sono un robot"
        ]
      }
    ]
  },
  {
    "id": "bando-isi-2025-prova-41",
    "slot": 41,
    "title": "Prova 41",
    "description": "Bando ISI 2025 - simulazione con dati completi visibili nella domanda.",
    "questions": [
      {
        "id": "p41-1",
        "type": "select",
        "label": "Codice identificativo: +3b404cb3dcf6fc253b8f9f1f6a9c1b3a18fbcff8200744739c62fff649dd50d6. Sito INAIL: https://www.inail.it; ente: INAIL. Selezionare dal ventesimo al ventisettesimo carattere del codice identificativo.",
        "options": [
          "INAIL",
          "8f9f1f6a",
          "inail",
          "http",
          "https",
          "INPS"
        ],
        "answer": "8f9f1f6a"
      },
      {
        "id": "p41-2",
        "type": "select",
        "label": "Data odierna simulata: 24/06/2026, mercoledi. Selezionare la data odierna con trattini.",
        "options": [
          "Bando ISI 2026",
          "Bando ISI 2025",
          "ISI 2025",
          "2025",
          "24-06-2026",
          "Bando ISI"
        ],
        "answer": "24-06-2026"
      },
      {
        "id": "p41-3",
        "type": "select",
        "label": "Bando: Bando ISI 2025; anno click day: 2026. Selezionare il numero di cifre dell'anno click day.",
        "options": [
          "3",
          "6",
          "0",
          "4",
          "5",
          "2"
        ],
        "answer": "4"
      },
      {
        "id": "p41-4",
        "type": "select",
        "label": "Stanziamento: 508.000.000,00. Selezionare il risultato di 508 meno 500 più 5.",
        "options": [
          "13",
          "15",
          "11",
          "14",
          "12",
          "31"
        ],
        "answer": "13"
      },
      {
        "id": "p41-5",
        "type": "select",
        "label": "Selezionare le vocali di \"finanziamento\".",
        "options": [
          "aiaeo",
          "iaiaeo0",
          "IAIAEO",
          "iaiae",
          "Iaiaeo",
          "iaiaeo"
        ],
        "answer": "iaiaeo"
      },
      {
        "id": "p41-6",
        "type": "select",
        "label": "Dati browser: compatibili Chrome, Firefox, Edge; non compatibili Safari, Opera. Selezionare i browser compatibili tra Edge, Chrome e Safari.",
        "options": [
          "Edge e Chrome",
          "Firefox",
          "Opera",
          "Edge",
          "Safari",
          "Chrome"
        ],
        "answer": "Edge e Chrome"
      },
      {
        "id": "p41-7",
        "type": "select",
        "label": "Bandiera italiana in ordine: verde-bianco-rosso. Selezionare la prima consonante di \"bianco\".",
        "options": [
          "verde",
          "rosso",
          "blu",
          "giallo",
          "b",
          "bianco"
        ],
        "answer": "b"
      },
      {
        "id": "p41-8",
        "type": "select",
        "label": "Partecipante: Mario Rossi; email: mario.rossi@impresa.it; telefono: +39 347 1234567. Selezionare le vocali del nome Mario.",
        "options": [
          "Rossi",
          "mario",
          "aio",
          "Rossi Mario",
          "Mario",
          "Mario Rossi"
        ],
        "answer": "aio"
      },
      {
        "id": "p41-9",
        "type": "checkbox",
        "label": "Dichiarazione di presa visione delle regole tecniche.",
        "options": [
          "Dichiarazione di presa visione delle regole tecniche"
        ],
        "answer": [
          "Dichiarazione di presa visione delle regole tecniche"
        ]
      },
      {
        "id": "p41-10",
        "type": "checkbox",
        "label": "Non sono un robot.",
        "options": [
          "Non sono un robot"
        ],
        "answer": [
          "Non sono un robot"
        ]
      }
    ]
  },
  {
    "id": "bando-isi-2025-prova-42",
    "slot": 42,
    "title": "Prova 42",
    "description": "Bando ISI 2025 - simulazione con dati completi visibili nella domanda.",
    "questions": [
      {
        "id": "p42-1",
        "type": "select",
        "label": "Codice identificativo: +3b404cb3dcf6fc253b8f9f1f6a9c1b3a18fbcff8200744739c62fff649dd50d6. Sito INAIL: https://www.inail.it; ente: INAIL. Selezionare dal trentesimo al trentasettesimo carattere del codice identificativo.",
        "options": [
          "INAIL",
          "inail",
          "http",
          "INPS",
          "https",
          "1b3a18fb"
        ],
        "answer": "1b3a18fb"
      },
      {
        "id": "p42-2",
        "type": "select",
        "label": "Data odierna simulata: 24/06/2026, mercoledi. Selezionare la data odierna con anno a due cifre.",
        "options": [
          "ISI 2025",
          "Bando ISI 2026",
          "2025",
          "Bando ISI",
          "24/06/26",
          "Bando ISI 2025"
        ],
        "answer": "24/06/26"
      },
      {
        "id": "p42-3",
        "type": "select",
        "label": "Momento 2: 19/06/2026 ore 18:00. Momento 1: 18/05/2026 ore 10:00. Selezionare la differenza tra Momento 2 e Momento 1 in giorni.",
        "options": [
          "30",
          "34",
          "23",
          "32",
          "33",
          "31"
        ],
        "answer": "32"
      },
      {
        "id": "p42-4",
        "type": "select",
        "label": "Selezionare il risultato di 25 più 26.",
        "options": [
          "49",
          "15",
          "51",
          "52",
          "50",
          "53"
        ],
        "answer": "51"
      },
      {
        "id": "p42-5",
        "type": "select",
        "label": "Selezionare le consonanti di \"finanziamento\".",
        "options": [
          "FNNZMNT",
          "fnnzmnt",
          "nnzmnt",
          "fnnzmn",
          "Fnnzmnt",
          "fnnzmnt0"
        ],
        "answer": "fnnzmnt"
      },
      {
        "id": "p42-6",
        "type": "select",
        "label": "Sito INAIL: https://www.inail.it; ente: INAIL. Selezionare il sito senza protocollo e senza www.",
        "options": [
          "inail.it",
          "INAIL",
          "INPS",
          "inail",
          "https",
          "http"
        ],
        "answer": "inail.it"
      },
      {
        "id": "p42-7",
        "type": "select",
        "label": "Bandiera italiana in ordine: verde-bianco-rosso. Selezionare le vocali di \"rosso\".",
        "options": [
          "verde",
          "bianco",
          "rosso",
          "giallo",
          "blu",
          "oo"
        ],
        "answer": "oo"
      },
      {
        "id": "p42-8",
        "type": "select",
        "label": "Partecipante: Mario Rossi; email: mario.rossi@impresa.it; telefono: +39 347 1234567. Selezionare le consonanti del cognome Rossi.",
        "options": [
          "Rss",
          "Rossi",
          "Mario Rossi",
          "Rossi Mario",
          "mario",
          "Mario"
        ],
        "answer": "Rss"
      },
      {
        "id": "p42-9",
        "type": "checkbox",
        "label": "Dichiarazione di presa visione delle regole tecniche.",
        "options": [
          "Dichiarazione di presa visione delle regole tecniche"
        ],
        "answer": [
          "Dichiarazione di presa visione delle regole tecniche"
        ]
      },
      {
        "id": "p42-10",
        "type": "checkbox",
        "label": "Non sono un robot.",
        "options": [
          "Non sono un robot"
        ],
        "answer": [
          "Non sono un robot"
        ]
      }
    ]
  },
  {
    "id": "bando-isi-2025-prova-43",
    "slot": 43,
    "title": "Prova 43",
    "description": "Bando ISI 2025 - simulazione con dati completi visibili nella domanda.",
    "questions": [
      {
        "id": "p43-1",
        "type": "select",
        "label": "Codice identificativo: +3b404cb3dcf6fc253b8f9f1f6a9c1b3a18fbcff8200744739c62fff649dd50d6. Selezionare dal cinquantesimo al cinquantasettesimo carattere del codice identificativo.",
        "options": [
          "9c62fff60",
          "9c62fff6",
          "c62fff6",
          "9c62fff"
        ],
        "answer": "9c62fff6"
      },
      {
        "id": "p43-2",
        "type": "select",
        "label": "Data odierna simulata: 24/06/2026, mercoledi. Selezionare il mese odierno abbreviato.",
        "options": [
          "ISI 2025",
          "Bando ISI 2025",
          "Bando ISI 2026",
          "Bando ISI",
          "giu",
          "2025"
        ],
        "answer": "giu"
      },
      {
        "id": "p43-3",
        "type": "select",
        "label": "Momento 5: 24/06/2026 ore 11:00. Momento 4: 23/06/2026 ore 10:00. Selezionare la differenza tra Momento 5 e Momento 4 in giorni.",
        "options": [
          "4",
          "0",
          "3",
          "5",
          "2",
          "1"
        ],
        "answer": "1"
      },
      {
        "id": "p43-4",
        "type": "select",
        "label": "Selezionare il risultato di 64 più 1.",
        "options": [
          "65",
          "63",
          "67",
          "56",
          "64",
          "66"
        ],
        "answer": "65"
      },
      {
        "id": "p43-5",
        "type": "select",
        "label": "Selezionare \"numero telefonico\" senza spazi.",
        "options": [
          "umerotelefonico",
          "numerotelefonico",
          "numerotelefonico0",
          "NUMEROTELEFONICO",
          "Numerotelefonico",
          "numerotelefonic"
        ],
        "answer": "numerotelefonico"
      },
      {
        "id": "p43-6",
        "type": "select",
        "label": "Dati browser: compatibili Chrome, Firefox, Edge; non compatibili Safari, Opera. Selezionare i browser non compatibili tra Opera, Safari e Chrome.",
        "options": [
          "Firefox",
          "Chrome",
          "Opera e Safari",
          "Opera",
          "Safari",
          "Edge"
        ],
        "answer": "Opera e Safari"
      },
      {
        "id": "p43-7",
        "type": "select",
        "label": "Bandiera italiana in ordine: verde-bianco-rosso. Selezionare le consonanti di \"rosso\".",
        "options": [
          "bianco",
          "rosso",
          "verde",
          "blu",
          "rss",
          "giallo"
        ],
        "answer": "rss"
      },
      {
        "id": "p43-8",
        "type": "select",
        "label": "Partecipante: Mario Rossi; email: mario.rossi@impresa.it; telefono: +39 347 1234567. Selezionare le vocali del cognome Rossi.",
        "options": [
          "oi",
          "Mario Rossi",
          "Rossi",
          "Rossi Mario",
          "Mario",
          "mario"
        ],
        "answer": "oi"
      },
      {
        "id": "p43-9",
        "type": "checkbox",
        "label": "Dichiarazione di presa visione delle regole tecniche.",
        "options": [
          "Dichiarazione di presa visione delle regole tecniche"
        ],
        "answer": [
          "Dichiarazione di presa visione delle regole tecniche"
        ]
      },
      {
        "id": "p43-10",
        "type": "checkbox",
        "label": "Non sono un robot.",
        "options": [
          "Non sono un robot"
        ],
        "answer": [
          "Non sono un robot"
        ]
      }
    ]
  },
  {
    "id": "bando-isi-2025-prova-44",
    "slot": 44,
    "title": "Prova 44",
    "description": "Bando ISI 2025 - simulazione con dati completi visibili nella domanda.",
    "questions": [
      {
        "id": "p44-1",
        "type": "select",
        "label": "Codice identificativo: +3b404cb3dcf6fc253b8f9f1f6a9c1b3a18fbcff8200744739c62fff649dd50d6. Selezionare le posizioni pari dalla 2 alla 10 del codice identificativo.",
        "options": [
          "44bd",
          "344bd",
          "344bd0",
          "344b"
        ],
        "answer": "344bd"
      },
      {
        "id": "p44-2",
        "type": "select",
        "label": "Data odierna simulata: 24/06/2026, mercoledi. Selezionare le vocali del mese odierno \"giugno\".",
        "options": [
          "Bando ISI 2026",
          "Bando ISI 2025",
          "ISI 2025",
          "2025",
          "iuo",
          "Bando ISI"
        ],
        "answer": "iuo"
      },
      {
        "id": "p44-3",
        "type": "select",
        "label": "Momento 6: 24/06/2026 ore 11:20. Momento 5: 24/06/2026 ore 11:00. Selezionare la differenza tra Momento 6 e Momento 5 in ore.",
        "options": [
          "Momento 2",
          "Momento 3",
          "Momento 5",
          "0 ore e 20 minuti",
          "Momento 1",
          "Momento 4"
        ],
        "answer": "0 ore e 20 minuti"
      },
      {
        "id": "p44-4",
        "type": "select",
        "label": "Selezionare il risultato di 36 meno 28.",
        "options": [
          "8",
          "10",
          "6",
          "9",
          "7",
          "0"
        ],
        "answer": "8"
      },
      {
        "id": "p44-5",
        "type": "select",
        "label": "Selezionare \"Dichiarazione presa visione\" senza spazi.",
        "options": [
          "Bando ISI 2025",
          "ISI 2025",
          "2025",
          "Bando ISI 2026",
          "Bando ISI",
          "Dichiarazionepresavisione"
        ],
        "answer": "Dichiarazionepresavisione"
      },
      {
        "id": "p44-6",
        "type": "select",
        "label": "Sito INAIL: https://www.inail.it; ente: INAIL. Selezionare il dominio corretto con estensione .it.",
        "options": [
          "inail.it",
          "INPS",
          "http",
          "inail",
          "https",
          "INAIL"
        ],
        "answer": "inail.it"
      },
      {
        "id": "p44-7",
        "type": "select",
        "label": "Bandiera italiana in ordine: verde-bianco-rosso. Selezionare il numero di vocali in \"verde-bianco-rosso\".",
        "options": [
          "8",
          "9",
          "0",
          "5",
          "7",
          "6"
        ],
        "answer": "7"
      },
      {
        "id": "p44-8",
        "type": "select",
        "label": "Partecipante: Mario Rossi; email: mario.rossi@impresa.it; telefono: +39 347 1234567. Selezionare il numero di parole in \"Mario Rossi\".",
        "options": [
          "1",
          "5",
          "2",
          "0",
          "3",
          "4"
        ],
        "answer": "2"
      },
      {
        "id": "p44-9",
        "type": "checkbox",
        "label": "Dichiarazione di presa visione delle regole tecniche.",
        "options": [
          "Dichiarazione di presa visione delle regole tecniche"
        ],
        "answer": [
          "Dichiarazione di presa visione delle regole tecniche"
        ]
      },
      {
        "id": "p44-10",
        "type": "checkbox",
        "label": "Non sono un robot.",
        "options": [
          "Non sono un robot"
        ],
        "answer": [
          "Non sono un robot"
        ]
      }
    ]
  },
  {
    "id": "bando-isi-2025-prova-45",
    "slot": 45,
    "title": "Prova 45",
    "description": "Bando ISI 2025 - simulazione con dati completi visibili nella domanda.",
    "questions": [
      {
        "id": "p45-1",
        "type": "select",
        "label": "Codice identificativo: +3b404cb3dcf6fc253b8f9f1f6a9c1b3a18fbcff8200744739c62fff649dd50d6. Selezionare le posizioni dispari dalla 1 alla 9 del codice identificativo.",
        "options": [
          "b0c3",
          "+b0c30",
          "+b0c3",
          "+b0c"
        ],
        "answer": "+b0c3"
      },
      {
        "id": "p45-2",
        "type": "select",
        "label": "Data odierna simulata: 24/06/2026, mercoledi. Selezionare le consonanti del mese odierno \"giugno\".",
        "options": [
          "ISI 2025",
          "Bando ISI 2026",
          "2025",
          "Bando ISI",
          "ggn",
          "Bando ISI 2025"
        ],
        "answer": "ggn"
      },
      {
        "id": "p45-3",
        "type": "select",
        "label": "Momento 6: 24/06/2026 ore 11:20. Sito INAIL: https://www.inail.it; ente: INAIL. Selezionare il Momento immediatamente precedente al Momento 6.",
        "options": [
          "Momento 4",
          "Momento 3",
          "Momento 6",
          "Momento 5",
          "Momento 1",
          "Momento 2"
        ],
        "answer": "Momento 5"
      },
      {
        "id": "p45-4",
        "type": "select",
        "label": "Selezionare il risultato di 158 meno 100.",
        "options": [
          "56",
          "85",
          "58",
          "59",
          "57",
          "60"
        ],
        "answer": "58"
      },
      {
        "id": "p45-5",
        "type": "select",
        "label": "Selezionare \"Non sono un robot\" senza spazi.",
        "options": [
          "NONSONOUNROBOT",
          "Nonsonounrobot",
          "onsonounrobot",
          "Nonsonounrobo",
          "nonsonounrobot",
          "Nonsonounrobot0"
        ],
        "answer": "Nonsonounrobot"
      },
      {
        "id": "p45-6",
        "type": "select",
        "label": "Dati browser: compatibili Chrome, Firefox, Edge; non compatibili Safari, Opera. Selezionare i browser compatibili tra Chrome, Firefox ed Edge.",
        "options": [
          "Chrome, Firefox ed Edge",
          "Chrome",
          "Firefox",
          "Edge",
          "Safari",
          "Opera"
        ],
        "answer": "Chrome, Firefox ed Edge"
      },
      {
        "id": "p45-7",
        "type": "select",
        "label": "Bandiera italiana in ordine: verde-bianco-rosso. Selezionare il numero di consonanti in \"verde-bianco-rosso\".",
        "options": [
          "10",
          "8",
          "11",
          "7",
          "0",
          "9"
        ],
        "answer": "9"
      },
      {
        "id": "p45-8",
        "type": "select",
        "label": "Partecipante: Mario Rossi; email: mario.rossi@impresa.it; telefono: +39 347 1234567. Selezionare il numero di caratteri di \"MarioRossi\".",
        "options": [
          "10",
          "9",
          "12",
          "8",
          "1",
          "11"
        ],
        "answer": "10"
      },
      {
        "id": "p45-9",
        "type": "checkbox",
        "label": "Dichiarazione di presa visione delle regole tecniche.",
        "options": [
          "Dichiarazione di presa visione delle regole tecniche"
        ],
        "answer": [
          "Dichiarazione di presa visione delle regole tecniche"
        ]
      },
      {
        "id": "p45-10",
        "type": "checkbox",
        "label": "Non sono un robot.",
        "options": [
          "Non sono un robot"
        ],
        "answer": [
          "Non sono un robot"
        ]
      }
    ]
  },
  {
    "id": "bando-isi-2025-prova-46",
    "slot": 46,
    "title": "Prova 46",
    "description": "Bando ISI 2025 - simulazione con dati completi visibili nella domanda.",
    "questions": [
      {
        "id": "p46-1",
        "type": "select",
        "label": "Codice identificativo: +3b404cb3dcf6fc253b8f9f1f6a9c1b3a18fbcff8200744739c62fff649dd50d6. Selezionare il codice identificativo senza il primo carattere.",
        "options": [
          "3b404cb3dcf6fc253b8f9f1f6a9c1b3a18fbcff8200744739c62fff649dd50d60",
          "3b404cb3dcf6fc253b8f9f1f6a9c1b3a18fbcff8200744739c62fff649dd50d6",
          "b404cb3dcf6fc253b8f9f1f6a9c1b3a18fbcff8200744739c62fff649dd50d6",
          "3b404cb3dcf6fc253b8f9f1f6a9c1b3a18fbcff8200744739c62fff649dd50d"
        ],
        "answer": "3b404cb3dcf6fc253b8f9f1f6a9c1b3a18fbcff8200744739c62fff649dd50d6"
      },
      {
        "id": "p46-2",
        "type": "select",
        "label": "Data odierna simulata: 24/06/2026, mercoledi. Selezionare il giorno del mese odierno scritto in cifre.",
        "options": [
          "22",
          "25",
          "23",
          "26",
          "24",
          "42"
        ],
        "answer": "24"
      },
      {
        "id": "p46-3",
        "type": "select",
        "label": "Momento 4: 23/06/2026 ore 10:00. Sito INAIL: https://www.inail.it; ente: INAIL. Selezionare il Momento immediatamente successivo al Momento 4.",
        "options": [
          "Momento 4",
          "Momento 2",
          "Momento 3",
          "Momento 6",
          "Momento 1",
          "Momento 5"
        ],
        "answer": "Momento 5"
      },
      {
        "id": "p46-4",
        "type": "select",
        "label": "Selezionare il risultato di 28 più 36.",
        "options": [
          "64",
          "62",
          "66",
          "46",
          "63",
          "65"
        ],
        "answer": "64"
      },
      {
        "id": "p46-5",
        "type": "select",
        "label": "Selezionare le iniziali di \"Non sono un robot\".",
        "options": [
          "SUR",
          "NSUR",
          "NSUR0",
          "nsur",
          "nSUR",
          "NSU"
        ],
        "answer": "NSUR"
      },
      {
        "id": "p46-6",
        "type": "select",
        "label": "Sito INAIL: https://www.inail.it; ente: INAIL. Selezionare il sito con dominio invertito errato.",
        "options": [
          "INPS",
          "INAIL",
          "https://www.inail.ti",
          "http",
          "https",
          "inail"
        ],
        "answer": "https://www.inail.ti"
      },
      {
        "id": "p46-7",
        "type": "select",
        "label": "Bandiera italiana in ordine: verde-bianco-rosso. Selezionare la sequenza alfabetica dei colori del tricolore.",
        "options": [
          "bianco",
          "rosso",
          "verde",
          "blu",
          "bianco-rosso-verde",
          "giallo"
        ],
        "answer": "bianco-rosso-verde"
      },
      {
        "id": "p46-8",
        "type": "select",
        "label": "Partecipante: Mario Rossi; email: mario.rossi@impresa.it; telefono: +39 347 1234567. Selezionare le iniziali del partecipante separate da punto.",
        "options": [
          "M.R.",
          "Mario Rossi",
          "Rossi",
          "Rossi Mario",
          "Mario",
          "mario"
        ],
        "answer": "M.R."
      },
      {
        "id": "p46-9",
        "type": "checkbox",
        "label": "Dichiarazione di presa visione delle regole tecniche.",
        "options": [
          "Dichiarazione di presa visione delle regole tecniche"
        ],
        "answer": [
          "Dichiarazione di presa visione delle regole tecniche"
        ]
      },
      {
        "id": "p46-10",
        "type": "checkbox",
        "label": "Non sono un robot.",
        "options": [
          "Non sono un robot"
        ],
        "answer": [
          "Non sono un robot"
        ]
      }
    ]
  },
  {
    "id": "bando-isi-2025-prova-47",
    "slot": 47,
    "title": "Prova 47",
    "description": "Bando ISI 2025 - simulazione con dati completi visibili nella domanda.",
    "questions": [
      {
        "id": "p47-1",
        "type": "select",
        "label": "Codice identificativo: +3b404cb3dcf6fc253b8f9f1f6a9c1b3a18fbcff8200744739c62fff649dd50d6. Selezionare il codice identificativo senza gli ultimi 7 caratteri.",
        "options": [
          "3b404cb3dcf6fc253b8f9f1f6a9c1b3a18fbcff8200744739c62fff64",
          "+3b404cb3dcf6fc253b8f9f1f6a9c1b3a18fbcff8200744739c62fff64",
          "+3b404cb3dcf6fc253b8f9f1f6a9c1b3a18fbcff8200744739c62fff640",
          "+3b404cb3dcf6fc253b8f9f1f6a9c1b3a18fbcff8200744739c62fff6"
        ],
        "answer": "+3b404cb3dcf6fc253b8f9f1f6a9c1b3a18fbcff8200744739c62fff64"
      },
      {
        "id": "p47-2",
        "type": "select",
        "label": "Data odierna simulata: 24/06/2026, mercoledi. Selezionare l'anno odierno senza le prime due cifre.",
        "options": [
          "25",
          "27",
          "24",
          "62",
          "26",
          "28"
        ],
        "answer": "26"
      },
      {
        "id": "p47-3",
        "type": "select",
        "label": "Momento 2: 19/06/2026 ore 18:00. Sito INAIL: https://www.inail.it; ente: INAIL. Selezionare il Momento immediatamente successivo al Momento 2.",
        "options": [
          "Momento 2",
          "Momento 4",
          "Momento 6",
          "Momento 3",
          "Momento 1",
          "Momento 5"
        ],
        "answer": "Momento 3"
      },
      {
        "id": "p47-4",
        "type": "select",
        "label": "Selezionare il risultato di 5 più 5 più 8.",
        "options": [
          "18",
          "20",
          "16",
          "19",
          "17",
          "81"
        ],
        "answer": "18"
      },
      {
        "id": "p47-5",
        "type": "select",
        "label": "Selezionare le iniziali di \"Dichiarazione di presa visione delle regole tecniche\".",
        "options": [
          "Bando ISI 2025",
          "ISI 2025",
          "2025",
          "Bando ISI 2026",
          "Bando ISI",
          "DDPVDRT"
        ],
        "answer": "DDPVDRT"
      },
      {
        "id": "p47-6",
        "type": "select",
        "label": "Sito INAIL: https://www.inail.it; ente: INAIL. Selezionare il protocollo corretto tra http e https.",
        "options": [
          "https",
          "INPS",
          "https://www.inail.it",
          "inail",
          "http",
          "INAIL"
        ],
        "answer": "https"
      },
      {
        "id": "p47-7",
        "type": "select",
        "label": "Bandiera italiana in ordine: verde-bianco-rosso. Selezionare i colori del tricolore in maiuscolo.",
        "options": [
          "verde",
          "rosso",
          "blu",
          "giallo",
          "VERDE-BIANCO-ROSSO",
          "bianco"
        ],
        "answer": "VERDE-BIANCO-ROSSO"
      },
      {
        "id": "p47-8",
        "type": "select",
        "label": "Partecipante: Mario Rossi; email: mario.rossi@impresa.it; telefono: +39 347 1234567. Selezionare l'email con nome e cognome separati da punto.",
        "options": [
          "Rossi",
          "mario",
          "mario.rossi@impresa.it",
          "Rossi Mario",
          "Mario",
          "Mario Rossi"
        ],
        "answer": "mario.rossi@impresa.it"
      },
      {
        "id": "p47-9",
        "type": "checkbox",
        "label": "Dichiarazione di presa visione delle regole tecniche.",
        "options": [
          "Dichiarazione di presa visione delle regole tecniche"
        ],
        "answer": [
          "Dichiarazione di presa visione delle regole tecniche"
        ]
      },
      {
        "id": "p47-10",
        "type": "checkbox",
        "label": "Non sono un robot.",
        "options": [
          "Non sono un robot"
        ],
        "answer": [
          "Non sono un robot"
        ]
      }
    ]
  },
  {
    "id": "bando-isi-2025-prova-48",
    "slot": 48,
    "title": "Prova 48",
    "description": "Bando ISI 2025 - simulazione con dati completi visibili nella domanda.",
    "questions": [
      {
        "id": "p48-1",
        "type": "select",
        "label": "Codice identificativo: +3b404cb3dcf6fc253b8f9f1f6a9c1b3a18fbcff8200744739c62fff649dd50d6. Selezionare il codice identificativo senza i primi 10 caratteri.",
        "options": [
          "f6fc253b8f9f1f6a9c1b3a18fbcff8200744739c62fff649dd50d6",
          "Cf6fc253b8f9f1f6a9c1b3a18fbcff8200744739c62fff649dd50d6",
          "cf6fc253b8f9f1f6a9c1b3a18fbcff8200744739c62fff649dd50d6",
          "cf6fc253b8f9f1f6a9c1b3a18fbcff8200744739c62fff649dd50d",
          "cf6fc253b8f9f1f6a9c1b3a18fbcff8200744739c62fff649dd50d60"
        ],
        "answer": "cf6fc253b8f9f1f6a9c1b3a18fbcff8200744739c62fff649dd50d6"
      },
      {
        "id": "p48-2",
        "type": "select",
        "label": "Data odierna simulata: 24/06/2026, mercoledi. Selezionare il mese odierno scritto con iniziale maiuscola.",
        "options": [
          "ISI 2025",
          "Bando ISI 2026",
          "2025",
          "Bando ISI",
          "Giugno",
          "Bando ISI 2025"
        ],
        "answer": "Giugno"
      },
      {
        "id": "p48-3",
        "type": "select",
        "label": "Momento 3: 22/06/2026 ore 10:00. Sito INAIL: https://www.inail.it; ente: INAIL. Selezionare il Momento immediatamente precedente al Momento 3.",
        "options": [
          "Momento 5",
          "Momento 4",
          "Momento 6",
          "Momento 2",
          "Momento 1",
          "Momento 3"
        ],
        "answer": "Momento 2"
      },
      {
        "id": "p48-4",
        "type": "select",
        "label": "Selezionare il risultato di 500 più 8.",
        "options": [
          "506",
          "805",
          "508",
          "509",
          "507",
          "510"
        ],
        "answer": "508"
      },
      {
        "id": "p48-5",
        "type": "select",
        "label": "Selezionare le iniziali di \"Inserimento Dati\".",
        "options": [
          "id",
          "ID",
          "D",
          "I",
          "iD",
          "ID0"
        ],
        "answer": "ID"
      },
      {
        "id": "p48-6",
        "type": "select",
        "label": "Sito INAIL: https://www.inail.it; ente: INAIL. Selezionare il dominio con punto corretto.",
        "options": [
          "inail.it",
          "INAIL",
          "INPS",
          "inail",
          "https",
          "http"
        ],
        "answer": "inail.it"
      },
      {
        "id": "p48-7",
        "type": "select",
        "label": "Bandiera italiana in ordine: verde-bianco-rosso. Selezionare i colori del tricolore in minuscolo.",
        "options": [
          "verde",
          "bianco",
          "rosso",
          "giallo",
          "blu",
          "verde-bianco-rosso"
        ],
        "answer": "verde-bianco-rosso"
      },
      {
        "id": "p48-8",
        "type": "select",
        "label": "Partecipante: Mario Rossi; email: mario.rossi@impresa.it; telefono: +39 347 1234567. Selezionare nome e cognome separati da trattino.",
        "options": [
          "Mario-Rossi",
          "Rossi",
          "Mario Rossi",
          "Rossi Mario",
          "mario",
          "Mario"
        ],
        "answer": "Mario-Rossi"
      },
      {
        "id": "p48-9",
        "type": "checkbox",
        "label": "Dichiarazione di presa visione delle regole tecniche.",
        "options": [
          "Dichiarazione di presa visione delle regole tecniche"
        ],
        "answer": [
          "Dichiarazione di presa visione delle regole tecniche"
        ]
      },
      {
        "id": "p48-10",
        "type": "checkbox",
        "label": "Non sono un robot.",
        "options": [
          "Non sono un robot"
        ],
        "answer": [
          "Non sono un robot"
        ]
      }
    ]
  },
  {
    "id": "bando-isi-2025-prova-49",
    "slot": 49,
    "title": "Prova 49",
    "description": "Bando ISI 2025 - simulazione con dati completi visibili nella domanda.",
    "questions": [
      {
        "id": "p49-1",
        "type": "select",
        "label": "Codice identificativo: +3b404cb3dcf6fc253b8f9f1f6a9c1b3a18fbcff8200744739c62fff649dd50d6. Selezionare il codice identificativo senza gli ultimi 5 caratteri.",
        "options": [
          "+3b404cb3dcf6fc253b8f9f1f6a9c1b3a18fbcff8200744739c62fff649d0",
          "+3b404cb3dcf6fc253b8f9f1f6a9c1b3a18fbcff8200744739c62fff649d",
          "3b404cb3dcf6fc253b8f9f1f6a9c1b3a18fbcff8200744739c62fff649d",
          "+3b404cb3dcf6fc253b8f9f1f6a9c1b3a18fbcff8200744739c62fff649"
        ],
        "answer": "+3b404cb3dcf6fc253b8f9f1f6a9c1b3a18fbcff8200744739c62fff649d"
      },
      {
        "id": "p49-2",
        "type": "select",
        "label": "Data odierna simulata: 24/06/2026, mercoledi. Selezionare la data odierna con mese in lettere.",
        "options": [
          "ISI 2025",
          "Bando ISI 2025",
          "Bando ISI 2026",
          "Bando ISI",
          "24 giugno 2026",
          "2025"
        ],
        "answer": "24 giugno 2026"
      },
      {
        "id": "p49-3",
        "type": "select",
        "label": "Selezionare il Momento con orario 18:00.",
        "options": [
          "Momento 5",
          "Momento 3",
          "Momento 4",
          "Momento 6",
          "Momento 1",
          "Momento 2"
        ],
        "answer": "Momento 2"
      },
      {
        "id": "p49-4",
        "type": "select",
        "label": "Selezionare il risultato di 3 più 4 più 7.",
        "options": [
          "14",
          "12",
          "16",
          "41",
          "13",
          "15"
        ],
        "answer": "14"
      },
      {
        "id": "p49-5",
        "type": "select",
        "label": "Selezionare \"Inserimento Dati\" senza spazi.",
        "options": [
          "nserimentoDati",
          "InserimentoDati",
          "InserimentoDati0",
          "INSERIMENTODATI",
          "inserimentoDati",
          "InserimentoDat"
        ],
        "answer": "InserimentoDati"
      },
      {
        "id": "p49-6",
        "type": "select",
        "label": "Browser compatibili: Chrome, Firefox, Edge; browser non compatibili: Safari, Opera. Selezionare il browser compatibile tra Firefox e Safari.",
        "options": [
          "Edge",
          "Chrome",
          "Firefox",
          "Chrome e Firefox",
          "Opera",
          "Safari"
        ],
        "answer": "Firefox"
      },
      {
        "id": "p49-7",
        "type": "select",
        "label": "Bandiera italiana in ordine: verde-bianco-rosso. Selezionare i colori del tricolore con virgole.",
        "options": [
          "bianco",
          "rosso",
          "verde",
          "blu",
          "verde, bianco, rosso",
          "giallo"
        ],
        "answer": "verde, bianco, rosso"
      },
      {
        "id": "p49-8",
        "type": "select",
        "label": "Partecipante: Mario Rossi; email: mario.rossi@impresa.it; telefono: +39 347 1234567. Selezionare il partecipante tutto in maiuscolo.",
        "options": [
          "MARIO ROSSI",
          "Mario Rossi",
          "Rossi",
          "Rossi Mario",
          "Mario",
          "mario"
        ],
        "answer": "MARIO ROSSI"
      },
      {
        "id": "p49-9",
        "type": "checkbox",
        "label": "Dichiarazione di presa visione delle regole tecniche.",
        "options": [
          "Dichiarazione di presa visione delle regole tecniche"
        ],
        "answer": [
          "Dichiarazione di presa visione delle regole tecniche"
        ]
      },
      {
        "id": "p49-10",
        "type": "checkbox",
        "label": "Non sono un robot.",
        "options": [
          "Non sono un robot"
        ],
        "answer": [
          "Non sono un robot"
        ]
      }
    ]
  },
  {
    "id": "bando-isi-2025-prova-50",
    "slot": 50,
    "title": "Prova 50",
    "description": "Bando ISI 2025 - simulazione con dati completi visibili nella domanda.",
    "questions": [
      {
        "id": "p50-1",
        "type": "select",
        "label": "Codice identificativo: +3b404cb3dcf6fc253b8f9f1f6a9c1b3a18fbcff8200744739c62fff649dd50d6. Selezionare il codice identificativo senza il segno iniziale e senza gli ultimi 7 caratteri.",
        "options": [
          "b404cb3dcf6fc253b8f9f1f6a9c1b3a18fbcff8200744739c62fff64",
          "3b404cb3dcf6fc253b8f9f1f6a9c1b3a18fbcff8200744739c62fff64",
          "3b404cb3dcf6fc253b8f9f1f6a9c1b3a18fbcff8200744739c62fff640",
          "3b404cb3dcf6fc253b8f9f1f6a9c1b3a18fbcff8200744739c62fff6"
        ],
        "answer": "3b404cb3dcf6fc253b8f9f1f6a9c1b3a18fbcff8200744739c62fff64"
      },
      {
        "id": "p50-2",
        "type": "select",
        "label": "Data odierna simulata: 24/06/2026, mercoledi. Selezionare la data odierna in formato AAAA-MM-GG.",
        "options": [
          "Bando ISI 2026",
          "Bando ISI 2025",
          "ISI 2025",
          "2025",
          "2026-06-24",
          "Bando ISI"
        ],
        "answer": "2026-06-24"
      },
      {
        "id": "p50-3",
        "type": "select",
        "label": "Selezionare il Momento con orario 10:00 e data 18/05/2026.",
        "options": [
          "Momento 3",
          "Momento 4",
          "Momento 6",
          "Momento 1",
          "Momento 2",
          "Momento 5"
        ],
        "answer": "Momento 1"
      },
      {
        "id": "p50-4",
        "type": "select",
        "label": "Bando: Bando ISI 2025; anno click day: 2026. Selezionare la somma tra anno bando breve e anno click day breve.",
        "options": [
          "51",
          "53",
          "49",
          "52",
          "50",
          "15"
        ],
        "answer": "51"
      },
      {
        "id": "p50-5",
        "type": "select",
        "label": "Selezionare \"Avanti\" scritto in maiuscolo.",
        "options": [
          "VANTI",
          "AVANTI0",
          "avanti",
          "AVANT",
          "aVANTI",
          "AVANTI"
        ],
        "answer": "AVANTI"
      },
      {
        "id": "p50-6",
        "type": "select",
        "label": "Sito INAIL: https://www.inail.it; ente: INAIL. Partecipante: Mario Rossi; email: mario.rossi@impresa.it; telefono: +39 347 1234567. Selezionare il nome ufficiale dell'ente in acronimo.",
        "options": [
          "INAIL",
          "inail",
          "https://www.inail.it",
          "https",
          "http",
          "INPS"
        ],
        "answer": "INAIL"
      },
      {
        "id": "p50-7",
        "type": "select",
        "label": "Bandiera italiana in ordine: verde-bianco-rosso. Selezionare il tricolore italiano in ordine corretto senza spazi.",
        "options": [
          "verde",
          "rosso",
          "blu",
          "giallo",
          "verde-bianco-rosso",
          "bianco"
        ],
        "answer": "verde-bianco-rosso"
      },
      {
        "id": "p50-8",
        "type": "select",
        "label": "Partecipante: Mario Rossi; email: mario.rossi@impresa.it; telefono: +39 347 1234567. Selezionare il partecipante senza spazi e tutto minuscolo.",
        "options": [
          "Rossi",
          "mario",
          "mariorossi",
          "Rossi Mario",
          "Mario",
          "Mario Rossi"
        ],
        "answer": "mariorossi"
      },
      {
        "id": "p50-9",
        "type": "checkbox",
        "label": "Dichiarazione di presa visione delle regole tecniche.",
        "options": [
          "Dichiarazione di presa visione delle regole tecniche"
        ],
        "answer": [
          "Dichiarazione di presa visione delle regole tecniche"
        ]
      },
      {
        "id": "p50-10",
        "type": "checkbox",
        "label": "Non sono un robot.",
        "options": [
          "Non sono un robot"
        ],
        "answer": [
          "Non sono un robot"
        ]
      }
    ]
  },
  {
    "id": "bando-isi-2025-prova-51",
    "slot": 51,
    "title": "Prova 51",
    "description": "Bando ISI 2025 - simulazione con dati completi visibili nella domanda.",
    "questions": [
      {
        "id": "p51-1",
        "type": "select",
        "label": "Codice identificativo: +3b404cb3dcf6fc253b8f9f1f6a9c1b3a18fbcff8200744739c62fff649dd50d6. Selezionare il codice identificativo completo, compreso il segno iniziale.",
        "options": [
          "3b404cb3dcf6fc253b8f9f1f6a9c1b3a18fbcff8200744739c62fff649dd50d6",
          "+3b404cb3dcf6fc253b8f9f1f6a9c1b3a18fbcff8200744739c62fff649dd50d60",
          "+3b404cb3dcf6fc253b8f9f1f6a9c1b3a18fbcff8200744739c62fff649dd50d6",
          "+3b404cb3dcf6fc253b8f9f1f6a9c1b3a18fbcff8200744739c62fff649dd50d"
        ],
        "answer": "+3b404cb3dcf6fc253b8f9f1f6a9c1b3a18fbcff8200744739c62fff649dd50d6"
      },
      {
        "id": "p51-2",
        "type": "select",
        "label": "Bando: Bando ISI 2025; anno click day: 2026. Selezionare il bando completo a cui si partecipa.",
        "options": [
          "2025",
          "Bando ISI",
          "2026",
          "ISI 2025",
          "Bando ISI 2025",
          "Bando ISI 2026"
        ],
        "answer": "Bando ISI 2025"
      },
      {
        "id": "p51-3",
        "type": "select",
        "label": "Data odierna simulata: 24/06/2026, mercoledi. Selezionare la data odierna simulata nel formato GG/MM/AAAA.",
        "options": [
          "23/06/2026",
          "22/06/2026",
          "24-06-2026",
          "24/06/2026",
          "18/05/2026",
          "19/06/2026"
        ],
        "answer": "24/06/2026"
      },
      {
        "id": "p51-4",
        "type": "select",
        "label": "Data odierna simulata: 24/06/2026, mercoledi. Selezionare il giorno della settimana della data odierna simulata.",
        "options": [
          "ISI 2025",
          "2025",
          "mercoledi",
          "Bando ISI 2025",
          "Bando ISI 2026",
          "Bando ISI"
        ],
        "answer": "mercoledi"
      },
      {
        "id": "p51-5",
        "type": "select",
        "label": "Assi di finanziamento: 5; asse domanda: Asse 1.1. Selezionare l'asse della domanda.",
        "options": [
          "sse 1.1",
          "Asse 1.1",
          "Asse 1",
          "1.1",
          "Asse 2",
          "5"
        ],
        "answer": "Asse 1.1"
      },
      {
        "id": "p51-6",
        "type": "select",
        "label": "Momento 6: 24/06/2026 ore 11:20. Selezionare il Momento 6 completo.",
        "options": [
          "24/06/2026 ore 11:20",
          "Momento 1",
          "Momento 2",
          "Momento 3",
          "Momento 4",
          "Momento 5"
        ],
        "answer": "24/06/2026 ore 11:20"
      },
      {
        "id": "p51-7",
        "type": "select",
        "label": "Sito INAIL: https://www.inail.it; ente: INAIL. Selezionare il sito INAIL senza protocollo.",
        "options": [
          "INAIL",
          "INPS",
          "inail",
          "https",
          "http",
          "www.inail.it"
        ],
        "answer": "www.inail.it"
      },
      {
        "id": "p51-8",
        "type": "select",
        "label": "Browser compatibili: Chrome, Firefox, Edge; browser non compatibili: Safari, Opera. Selezionare i browser compatibili in ordine indicato.",
        "options": [
          "Chrome, Firefox, Edge",
          "Firefox",
          "Edge",
          "Safari",
          "Opera",
          "Chrome"
        ],
        "answer": "Chrome, Firefox, Edge"
      },
      {
        "id": "p51-9",
        "type": "checkbox",
        "label": "Dichiarazione di presa visione delle regole tecniche.",
        "options": [
          "Dichiarazione di presa visione delle regole tecniche"
        ],
        "answer": [
          "Dichiarazione di presa visione delle regole tecniche"
        ]
      },
      {
        "id": "p51-10",
        "type": "checkbox",
        "label": "Non sono un robot.",
        "options": [
          "Non sono un robot"
        ],
        "answer": [
          "Non sono un robot"
        ]
      }
    ]
  }
];

function buildRoundQuizzes() {
  return fixedQuizzes;
}

const adminParticipants = [
  { username: "michele.antonelli", name: "Michele Antonelli" },
  { username: "umberto.verdari", name: "Umberto Verdari" },
  { username: "nicola.rossi", name: "Nicola Rossi" },
  { username: "davide.tiraboschi", name: "Davide Tiraboschi" },
  { username: "emanuele.canteri", name: "Emanuele Canteri" },
  { username: "giuseppe.defrancesco", name: "Giuseppe de Francesco" },
  { username: "lorenzo.giannotti", name: "Lorenzo Giannotti" },
  { username: "lorenzo1", name: "Lorenzo 1" },
  { username: "elia.bonetti", name: "Elia Bonetti" },
  { username: "riccardo.giannelli", name: "Riccardo Giannelli" },
  { username: "angel.toninelli", name: "Angel Toninelli" },
  { username: "pietro.dalla", name: "Pietro Dalla" },
  { username: "pietro.pioli", name: "Pietro Pioli" },
  { username: "raffaele.marotta", name: "Raffaele Marotta" },
];

const views = {
  login: document.querySelector("#loginView"),
  dashboard: document.querySelector("#dashboardView"),
  reload: document.querySelector("#reloadView"),
  quiz: document.querySelector("#quizView"),
  review: document.querySelector("#reviewView"),
  admin: document.querySelector("#adminView"),
};

const pageTitle = document.querySelector("#pageTitle");
const loginForm = document.querySelector("#loginForm");
const loginError = document.querySelector("#loginError");
const logoutButton = document.querySelector("#logoutButton");
const welcomeTitle = document.querySelector("#welcomeTitle");
const userStats = document.querySelector("#userStats");
const roundInfo = document.querySelector("#roundInfo");
const quizCards = document.querySelector("#quizCards");
const reloadQuizTitle = document.querySelector("#reloadQuizTitle");
const reloadGateButton = document.querySelector("#reloadGateButton");
const exitReloadButton = document.querySelector("#exitReloadButton");
const quizTitle = document.querySelector("#quizTitle");
const quizForm = document.querySelector("#quizForm");
const submitQuizButton = document.querySelector("#submitQuizButton");
const backToDashboardButton = document.querySelector("#backToDashboardButton");
const exitQuizButton = document.querySelector("#exitQuizButton");
const reviewList = document.querySelector("#reviewList");
const reviewAccept = document.querySelector("#reviewAccept");
const sendReviewButton = document.querySelector("#sendReviewButton");
const modifyReviewButton = document.querySelector("#modifyReviewButton");
const exitReviewButton = document.querySelector("#exitReviewButton");
const adminSummary = document.querySelector("#adminSummary");
const clickerButtons = document.querySelector("#clickerButtons");
const selectedClickerSummary = document.querySelector("#selectedClickerSummary");
const attemptTable = document.querySelector("#attemptTable");
const attemptTableTitle = document.querySelector("#attemptTableTitle");
const resetStatsButton = document.querySelector("#resetStatsButton");
const modal = document.querySelector("#modal");
const modalText = document.querySelector("#modalText");
const closeModalButton = document.querySelector("#closeModalButton");
const reviewButton = document.querySelector("#reviewButton");

let currentUser = null;
let currentRound = null;
let currentAttempts = [];
let currentQuizzes = [];
let currentQuiz = null;
let currentAnswers = {};
let currentWrongQuestions = [];
let quizStartedAt = null;
let selectedAdminUser = "all";

function showView(name) {
  Object.values(views).forEach((view) => view.classList.add("hidden"));
  views[name].classList.remove("hidden");
  logoutButton.classList.toggle("hidden", !currentUser);
}

function setTitle(text) {
  pageTitle.textContent = text;
}

function normalize(value) {
  return String(value ?? "").trim().toLowerCase();
}

function answerIsCorrect(question, value) {
  if (Array.isArray(question.answer)) {
    const selected = Array.isArray(value) ? value.map(String).sort() : [];
    const expected = question.answer.map(String).sort();
    return selected.length === expected.length && selected.every((item, index) => item === expected[index]);
  }
  if (question.type === "radio" || question.type === "select") {
    return String(value ?? "") === String(question.answer);
  }
  if (question.caseSensitive) {
    return String(value ?? "").trim() === String(question.answer).trim();
  }
  return normalize(value) === normalize(question.answer);
}

function answerIsFilled(question, value) {
  if (question.type === "checkbox") return Array.isArray(value) && value.length > 0;
  return normalize(value) !== "";
}

function formatDuration(seconds) {
  const safeSeconds = Math.max(0, Number(seconds) || 0);
  const minutes = Math.floor(safeSeconds / 60);
  const remainingSeconds = safeSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
}

async function loadSessionData() {
  currentRound = await api.getRound();
  currentAttempts = await api.getAttempts();
  currentQuizzes = buildRoundQuizzes(currentRound);
}

function activeQuizIdSet() {
  return new Set(currentQuizzes.map((quiz) => quiz.id));
}

function isCurrentQuizAttempt(attempt) {
  return activeQuizIdSet().has(attempt.quizId);
}

function currentRoundAttempts(username = currentUser?.username) {
  return currentAttempts.filter((attempt) => attempt.username === username && isCurrentQuizAttempt(attempt));
}

function completedSlots(username = currentUser?.username) {
  return new Set(currentRoundAttempts(username).map((attempt) => Number(attempt.quizSlot)));
}

async function renderDashboard() {
  await loadSessionData();
  setTitle("Prova generale");
  welcomeTitle.textContent = `Benvenuto, ${currentUser.name}`;

  const completed = completedSlots();
  const completedCount = completed.size;
  const totalQuizzes = currentQuizzes.length;
  const allDone = completedCount >= totalQuizzes;
  userStats.textContent = `${completedCount}/${totalQuizzes} prove completate`;
  roundInfo.innerHTML = `
    <div>
      <strong>Sessione prova generale</strong>
      <span>${allDone ? "Hai completato tutte le prove disponibili." : "Completa le prove disponibili."}</span>
    </div>
  `;

  quizCards.innerHTML = "";
  currentQuizzes.forEach((quiz) => {
    const done = completed.has(quiz.slot);
    const card = document.createElement("article");
    card.className = "quiz-card session-card";
    card.innerHTML = `
      <span class="status-pill ${done ? "done" : ""}">${done ? "Completato" : "Da fare"}</span>
      <h3>${quiz.title}</h3>
      <p>${quiz.description}</p>
      <button class="primary-button ${done ? "disabled" : ""}" type="button" ${done ? "disabled" : ""}>
        ${done ? "Gia inviato" : `Avvia ${quiz.title.toLowerCase()}`}
      </button>
    `;
    card.querySelector("button").addEventListener("click", () => selectQuizForReload(quiz.slot));
    quizCards.append(card);
  });

  if (allDone) {
    const block = document.createElement("article");
    block.className = "panel blocked-panel";
    block.innerHTML = `
      <h3>Sessione completata</h3>
      <p>Hai gia fatto tutte le prove disponibili. Il tentativo e stato registrato nel pannello amministratore.</p>
    `;
    quizCards.append(block);
  }

  showView("dashboard");
}

function selectQuizForReload(slot) {
  const completed = completedSlots();
  if (completed.has(slot)) return;
  currentQuiz = currentQuizzes.find((quiz) => quiz.slot === slot);
  currentAnswers = {};
  currentWrongQuestions = [];
  quizStartedAt = null;
  reloadQuizTitle.textContent = `${currentQuiz.title} selezionato`;
  setTitle("Convalida e invio della prova");
  showView("reload");
}

function openSelectedQuiz() {
  if (!currentQuiz) {
    renderDashboard();
    return;
  }
  currentAnswers = {};
  currentWrongQuestions = [];
  quizStartedAt = Date.now();
  quizTitle.textContent = currentQuiz.title;
  setTitle("Inserimento dati");
  renderQuizForm();
  showView("quiz");
}

function renderQuizForm() {
  quizForm.innerHTML = "";
  currentQuiz.questions.forEach((question) => {
    const block = document.createElement("fieldset");
    block.className = "question-block";
    block.dataset.questionId = question.id;
    if (currentWrongQuestions.includes(question.id)) block.classList.add("has-error");

    if (question.type === "radio" || question.type === "checkbox") {
      const legend = document.createElement("legend");
      legend.textContent = `* ${question.label}`;
      block.append(legend);

      const grid = document.createElement("div");
      grid.className = question.type === "radio" ? "radio-grid" : "checkbox-grid";
      question.options.forEach((option) => {
        const label = document.createElement("label");
        const input = document.createElement("input");
        input.type = question.type;
        input.name = question.id;
        input.value = option;
        if (question.type === "checkbox") {
          input.checked = (currentAnswers[question.id] ?? []).includes(option);
        } else {
          input.checked = currentAnswers[question.id] === option;
        }
        label.append(input, document.createTextNode(option));
        grid.append(label);
      });
      block.append(grid);
    }

    if (question.type === "select") {
      const label = document.createElement("label");
      label.className = "question-label";
      label.setAttribute("for", question.id);
      label.textContent = `* ${question.label}`;
      const selectEl = document.createElement("select");
      selectEl.id = question.id;
      selectEl.name = question.id;
      selectEl.innerHTML = `<option value="">- seleziona opzione -</option>`;
      question.options.forEach((option) => {
        const item = document.createElement("option");
        item.value = option;
        item.textContent = option;
        selectEl.append(item);
      });
      selectEl.value = currentAnswers[question.id] ?? "";
      block.append(label, selectEl);
    }

    if (question.type === "text") {
      const label = document.createElement("label");
      label.className = "question-label";
      label.setAttribute("for", question.id);
      label.textContent = `* ${question.label}`;
      const input = document.createElement("input");
      input.id = question.id;
      input.name = question.id;
      input.type = "text";
      input.autocomplete = "off";
      input.value = currentAnswers[question.id] ?? "";
      block.append(label, input);
    }

    const error = document.createElement("div");
    error.className = "field-error hidden";
    error.textContent = "Campo obbligatorio";
    block.append(error);

    if (currentWrongQuestions.includes(question.id)) {
      const wrong = document.createElement("div");
      wrong.className = "field-result bad";
      wrong.textContent = "ERRORE: Valore non valido";
      block.append(wrong);
    }

    quizForm.append(block);
  });
  updateSubmitState();
}

function saveField(target) {
  const question = currentQuiz.questions.find((item) => item.id === target.name);
  if (!question) return;

  if (target.type === "checkbox") {
    currentAnswers[target.name] = [...quizForm.querySelectorAll(`input[name="${target.name}"]:checked`)].map((item) => item.value);
  } else {
    currentAnswers[target.name] = target.value;
  }

  const block = quizForm.querySelector(`[data-question-id="${target.name}"]`);
  block?.classList.remove("has-error");
  block?.querySelector(".field-result.bad")?.remove();
  block?.querySelector(".field-error")?.classList.add("hidden");
  currentWrongQuestions = currentWrongQuestions.filter((id) => id !== target.name);
  updateSubmitState();
}

function updateSubmitState() {
  if (!currentQuiz) return;
  const complete = currentQuiz.questions.every((question) => answerIsFilled(question, currentAnswers[question.id]));
  submitQuizButton.disabled = !complete;
  submitQuizButton.classList.toggle("disabled", !complete);
}

function validateRequired() {
  let valid = true;
  currentQuiz.questions.forEach((question) => {
    const filled = answerIsFilled(question, currentAnswers[question.id]);
    const block = quizForm.querySelector(`[data-question-id="${question.id}"]`);
    block?.querySelector(".field-error")?.classList.toggle("hidden", filled);
    valid = valid && filled;
  });
  return valid;
}

function getAnswerText(question) {
  const value = currentAnswers[question.id];
  if (Array.isArray(value)) return value.join(", ");
  return value || "-";
}

function renderReview() {
  reviewAccept.checked = false;
  sendReviewButton.disabled = true;
  sendReviewButton.classList.add("disabled");
  reviewList.innerHTML = currentQuiz.questions.map((question) => `
    <div class="review-row">
      <strong>${question.label.replace(/^\*?\s*/, "")}</strong>
      <span>${getAnswerText(question)}</span>
    </div>
  `).join("");
  setTitle("Riepilogo dati inseriti");
  showView("review");
}

async function submitQuiz() {
  if (!validateRequired()) return;

  currentWrongQuestions = currentQuiz.questions
    .filter((question) => !answerIsCorrect(question, currentAnswers[question.id]))
    .map((question) => question.id);

  if (currentWrongQuestions.length > 0) {
    renderQuizForm();
    setTitle("Inserimento dati");
    showView("quiz");
    quizForm.querySelector(".has-error")?.scrollIntoView({ behavior: "smooth", block: "center" });
    return;
  }

  const correct = currentQuiz.questions.filter((question) => answerIsCorrect(question, currentAnswers[question.id])).length;
  const total = currentQuiz.questions.length;
  const score = Math.round((correct / total) * 100);
  const durationSeconds = quizStartedAt ? Math.max(1, Math.round((Date.now() - quizStartedAt) / 1000)) : 0;

  try {
    await api.saveAttempt({
      username: currentUser.username,
      userName: currentUser.name,
      roundId: currentRound.id,
      roundNumber: currentRound.number,
      quizSlot: currentQuiz.slot,
      quizId: currentQuiz.id,
      quizTitle: currentQuiz.title,
      correct,
      total,
      score,
      durationSeconds,
    });
  } catch (error) {
    modalText.textContent = `${error.message}. Rientra nella prova generale per vedere lo stato aggiornato.`;
    modal.classList.remove("hidden");
    return;
  }

  modalText.textContent = `Hai completato ${currentQuiz.title}: ${correct} risposte corrette su ${total} in ${formatDuration(durationSeconds)}. Il tentativo e stato registrato nel pannello admin.`;
  modal.classList.remove("hidden");
}

function renderAttemptRows(attempts) {
  return attempts.length
    ? attempts.map((attempt) => `
        <tr>
          <td>${attempt.userName || attempt.username}</td>
          <td>Fissa</td>
          <td>${attempt.quizTitle}</td>
          <td>${attempt.correct}/${attempt.total} (${attempt.score}%)</td>
          <td>${formatDuration(attempt.durationSeconds)}</td>
          <td>${new Date(attempt.createdAt).toLocaleString("it-IT")}</td>
        </tr>
      `).join("")
    : `<tr><td colspan="6">Nessun tentativo registrato.</td></tr>`;
}

async function renderAdmin() {
  await loadSessionData();
  setTitle("Pannello amministratore");
  const current = currentAttempts.filter((attempt) => isCurrentQuizAttempt(attempt));
  const activeUsers = new Set(current.map((attempt) => attempt.username));
  const averageSeconds = current.length
    ? Math.round(current.reduce((total, attempt) => total + (Number(attempt.durationSeconds) || 0), 0) / current.length)
    : 0;
  const totalQuizzes = currentQuizzes.length;
  const completedUsers = adminParticipants.filter((user) => completedSlots(user.username).size >= totalQuizzes).length;

  adminSummary.innerHTML = `
    <article class="summary-card"><strong>${totalQuizzes}</strong><span>Quiz disponibili</span></article>
    <article class="summary-card"><strong>${current.length}</strong><span>Prove inviate</span></article>
    <article class="summary-card"><strong>${completedUsers}/${adminParticipants.length}</strong><span>Utenti con tutte le prove</span></article>
    <article class="summary-card"><strong>${formatDuration(averageSeconds)}</strong><span>Tempo medio sessione</span></article>
  `;

  renderClickerButtons();
  renderAdminTable();
  showView("admin");
}

function renderClickerButtons() {
  clickerButtons.innerHTML = "";
  const buttons = [{ username: "all", name: "Tutti" }, ...adminParticipants];
  const activeAttempts = currentAttempts.filter((attempt) => isCurrentQuizAttempt(attempt));

  buttons.forEach((user) => {
    const visible = user.username === "all"
      ? activeAttempts
      : activeAttempts.filter((attempt) => attempt.username === user.username);
    const currentCount = user.username === "all"
      ? activeAttempts.length
      : completedSlots(user.username).size;
    const button = document.createElement("button");
    button.className = "clicker-button";
    button.type = "button";
    button.classList.toggle("active", selectedAdminUser === user.username);
    button.innerHTML = `
      <strong>${user.name}</strong>
      <span>${user.username === "all" ? `${currentCount} prove inviate` : `${currentCount}/${currentQuizzes.length} completate`}</span>
      <span>${visible.length} storico</span>
    `;
    button.addEventListener("click", () => {
      selectedAdminUser = user.username;
      renderClickerButtons();
      renderAdminTable();
    });
    clickerButtons.append(button);
  });
}

function renderAdminTable() {
  const selected = adminParticipants.find((user) => user.username === selectedAdminUser);
  const activeAttempts = currentAttempts.filter((attempt) => isCurrentQuizAttempt(attempt));
  const visibleAttempts = selectedAdminUser === "all"
    ? activeAttempts
    : activeAttempts.filter((attempt) => attempt.username === selectedAdminUser);
  const averageSeconds = visibleAttempts.length
    ? Math.round(visibleAttempts.reduce((total, attempt) => total + (Number(attempt.durationSeconds) || 0), 0) / visibleAttempts.length)
    : 0;

  attemptTableTitle.textContent = selected ? `Registro prove di ${selected.name}` : "Registro prove generale";
  selectedClickerSummary.textContent = selected
    ? `${selected.name}: ${completedSlots(selected.username).size}/${currentQuizzes.length} completate, ${visibleAttempts.length} prove totali, tempo medio ${formatDuration(averageSeconds)}.`
    : `Tutti i partecipanti: ${visibleAttempts.length} prove registrate nello storico.`;
  attemptTable.innerHTML = renderAttemptRows(visibleAttempts);
}

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  loginError.classList.add("hidden");
  const username = document.querySelector("#username").value.trim();
  const password = document.querySelector("#password").value;

  try {
    const data = await api.login(username, password);
    currentUser = data.user;
    loginForm.reset();
    if (currentUser.role === "admin") {
      await renderAdmin();
    } else {
      await renderDashboard();
    }
  } catch {
    loginError.classList.remove("hidden");
  }
});

reloadGateButton.addEventListener("click", openSelectedQuiz);
exitReloadButton.addEventListener("click", renderDashboard);

quizForm.addEventListener("input", (event) => {
  if (event.target.matches("input, select")) saveField(event.target);
});

quizForm.addEventListener("change", (event) => {
  if (event.target.matches("input, select")) saveField(event.target);
});

submitQuizButton.addEventListener("click", () => {
  if (validateRequired()) renderReview();
});
backToDashboardButton.addEventListener("click", renderDashboard);
exitQuizButton.addEventListener("click", renderDashboard);

reviewAccept.addEventListener("change", () => {
  sendReviewButton.disabled = !reviewAccept.checked;
  sendReviewButton.classList.toggle("disabled", !reviewAccept.checked);
});

sendReviewButton.addEventListener("click", submitQuiz);
modifyReviewButton.addEventListener("click", () => {
  setTitle("Inserimento dati");
  renderQuizForm();
  showView("quiz");
});
exitReviewButton.addEventListener("click", renderDashboard);

closeModalButton.addEventListener("click", () => {
  modal.classList.add("hidden");
  currentQuiz = null;
  if (currentUser?.role === "admin") {
    renderAdmin();
  } else {
    renderDashboard();
  }
});

reviewButton.addEventListener("click", () => {
  modal.classList.add("hidden");
});

logoutButton.addEventListener("click", () => {
  currentUser = null;
  currentRound = null;
  currentAttempts = [];
  currentQuizzes = [];
  currentQuiz = null;
  currentAnswers = {};
  setTitle("Convalida e invio della prova");
  showView("login");
});

resetStatsButton.addEventListener("click", async () => {
  const confirmed = window.confirm("Vuoi azzerare tutto lo storico dei tentativi?");
  if (!confirmed) return;
  await api.resetAttempts();
  selectedAdminUser = "all";
  await renderAdmin();
});

showView("login");
