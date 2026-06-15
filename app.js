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

function hashSeed(value) {
  let hash = 2166136261;
  for (const character of String(value)) {
    hash ^= character.charCodeAt(0);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function createRng(seed) {
  let state = hashSeed(seed) || 1;
  return () => {
    state = Math.imul(state ^ (state >>> 15), 1 | state);
    state ^= state + Math.imul(state ^ (state >>> 7), 61 | state);
    return ((state ^ (state >>> 14)) >>> 0) / 4294967296;
  };
}

function numberBetween(rng, min, max) {
  return Math.floor(rng() * (max - min + 1)) + min;
}

function pick(rng, items) {
  return items[Math.floor(rng() * items.length)];
}

function shuffle(rng, items) {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(rng() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }
  return copy;
}

function optionSet(rng, answer, distractors) {
  const options = [answer];
  distractors.forEach((item) => {
    if (!options.includes(item)) options.push(item);
  });
  return shuffle(rng, options.slice(0, 4));
}

function letters(rng, length) {
  const alphabet = "ABCDEFGHLMNPQRSTUVZ";
  return Array.from({ length }, () => alphabet[numberBetween(rng, 0, alphabet.length - 1)]).join("");
}

const questionFactories = [
  (ctx, id) => {
    const number = numberBetween(ctx.rng, 1200, 9876);
    const code = `AX-${letters(ctx.rng, 2)}-${number}`;
    const answer = String(number).slice(-3);
    return text(id, `Scrivi le ultime tre cifre della stringa ${code}.`, answer);
  },
  (ctx, id) => {
    const number = numberBetween(ctx.rng, 10, 99);
    return exactText(id, `Scrivi solo le lettere maiuscole e minuscole della stringa Aa${number}Bb, ignorando i numeri: AaBb.`, "AaBb");
  },
  (ctx, id) => {
    const block = numberBetween(ctx.rng, 41, 89);
    return text(id, `Scrivi il blocco centrale della stringa VERDE-${block}-SOLE.`, String(block));
  },
  (ctx, id) => {
    return exactText(id, "Copia solo le lettere maiuscole della stringa abCDeF: CDF.", "CDF");
  },
  (ctx, id) => {
    return exactText(id, "Copia solo le lettere minuscole della stringa QrSTu: ru.", "ru");
  },
  (ctx, id) => {
    const number = numberBetween(ctx.rng, 10, 80);
    const answer = `Codice-${number}-OK`;
    return select(id, `Selezionare l'opzione identica a ${answer}, rispettando maiuscole e minuscole.`, optionSet(ctx.rng, answer, [`codice-${number}-ok`, `CODICE-${number}-OK`, `Codice_${number}_OK`]), answer);
  },
  (ctx, id) => {
    const first = numberBetween(ctx.rng, 3, 9);
    const second = numberBetween(ctx.rng, 4, 12);
    const answer = String(first + second);
    return radio(id, `Quanto fa ${first}+${second}?`, optionSet(ctx.rng, answer, [String(first + second + 1), String(first + second - 1), `${first}${second}`]), answer);
  },
  (ctx, id) => {
    const first = numberBetween(ctx.rng, 2, 6);
    const second = numberBetween(ctx.rng, 3, 7);
    const product = first * second;
    return radio(id, `Quanto fa ${first}x${second}?`, optionSet(ctx.rng, String(product), [String(first + second), String(product + first), String(product + first + second)]), String(product));
  },
  (ctx, id) => {
    const start = numberBetween(ctx.rng, 8, 14);
    const plus = numberBetween(ctx.rng, 2, 4);
    const answer = `${String(start + plus).padStart(2, "0")}:00`;
    return select(id, `Se ora sono le ${String(start).padStart(2, "0")}:00, tra ${plus} ore che ore saranno?`, optionSet(ctx.rng, answer, [`${String(start + plus - 1).padStart(2, "0")}:00`, `${String(start + plus + 1).padStart(2, "0")}:00`, `${String(plus).padStart(2, "0")}:00`]), answer);
  },
  (ctx, id) => radio(id, "Di che colore era il cavallo bianco di Napoleone?", ["nero", "bianco", "marrone", "grigio"], "bianco"),
  (ctx, id) => {
    const color = pick(ctx.rng, ["blu", "verde", "rosso", "giallo"]);
    return radio(id, `Nella frase “il colore corretto e ${color}”, quale colore devi selezionare?`, optionSet(ctx.rng, color, ["blu", "verde", "rosso", "giallo"]), color);
  },
  (ctx, id) => {
    const value = numberBetween(ctx.rng, 7000, 9999);
    return text(id, `Scrivi solo cio che viene dopo i due punti: RIF:${value}.`, String(value));
  },
  (ctx, id) => {
    const value = `TICKET${numberBetween(ctx.rng, 10, 99)}`;
    return text(id, `Scrivi solo cio che viene prima dello slash nella stringa ${value}/ARCHIVIO.`, value);
  },
  (ctx, id) => {
    const value = `ZZ${numberBetween(ctx.rng, 10, 90)}9`;
    return text(id, `Scrivi il codice senza il prefisso TMP- nella stringa TMP-${value}.`, value);
  },
  (ctx, id) => checkbox(id, "Seleziona solo i simboli presenti nella sequenza A@B#C.", ["@", "#", "!", "€"], ["@", "#"]),
  (ctx, id) => checkbox(id, "Seleziona le vocali presenti nella parola AIUTO.", ["A", "E", "I", "O", "U"], ["A", "I", "O", "U"]),
  (ctx, id) => radio(id, "Quante lettere maiuscole ci sono in PaLeRMo? La risposta e 4.", ["2", "3", "4", "6"], "4"),
  (ctx, id) => radio(id, "Nel numero 0039, qual e l'ultimo numero diverso da zero?", ["0", "3", "9", "39"], "9"),
  (ctx, id) => {
    const number = numberBetween(ctx.rng, 10, 99);
    return exactText(id, `Copia esattamente il blocco indicato dopo i due punti nella stringa A${number}Z9K: ${number}Z9.`, `${number}Z9`);
  },
  (ctx, id) => radio(id, "Quale parola e tutta minuscola?", ["PORTALE", "Quiz", "accesso", "Dati"], "accesso"),
  (ctx, id) => radio(id, "Se A=1, B=2 e C=3, quale numero corrisponde a C?", ["1", "2", "3", "4"], "3"),
  (ctx, id) => {
    const code = `AB-${numberBetween(ctx.rng, 10, 99)}-xy`;
    return exactText(id, `Copia il testo tra parentesi quadre: [${code}].`, code);
  },
  (ctx, id) => {
    const year = numberBetween(ctx.rng, 2027, 2042);
    return radio(id, `Quale anno compare nella data 14/06/${year}?`, optionSet(ctx.rng, String(year), [String(year - 1), String(year + 1), "14"]), String(year));
  },
  (ctx, id) => {
    const day = String(numberBetween(ctx.rng, 1, 24)).padStart(2, "0");
    const nextDay = String(Number(day) + 1).padStart(2, "0");
    return radio(id, `Quale giorno compare nella data ${day}/11/2026?`, [day, "mese 11", "2026", nextDay], day);
  },
  (ctx, id) => select(id, "Selezionare la voce che dice ESATTAMENTE “NonSelezionareQuestoToken” senza spazi.", ["Non Selezionare Questo Token", "NonSelezionareQuestoToken", "nonselezionarequestotoken", "SelezionareQuestoToken"], "NonSelezionareQuestoToken"),
  (ctx, id) => {
    const first = numberBetween(ctx.rng, 1, 8);
    const second = numberBetween(ctx.rng, 2, 9);
    const sum = first + second;
    return radio(id, `Se lo stanziamento indica ${first}0${second}.000, la somma delle cifre diverse da zero e ${first}+${second}=${sum}.`, optionSet(ctx.rng, String(sum), [String(first), String(second), `${first}${second}`]), String(sum));
  },
  (ctx, id) => {
    const key = `F${numberBetween(ctx.rng, 1, 8)}`;
    return exactText(id, `Scrivi il tasto indicato: ${key}.`, key);
  },
  (ctx, id) => radio(id, "Nella frase “La parola da scegliere e conferma”, quale parola devi selezionare?", ["conferma", "annulla", "salva", "esci"], "conferma"),
  (ctx, id) => text(id, "Scrivi le ultime quattro lettere della parola OPERAZIONE: IONE.", "IONE"),
  (ctx, id) => select(id, "Selezionare il numero scritto in lettere: dodici.", ["10", "11", "12", "13"], "12"),
  (ctx, id) => radio(id, "Se il pulsante corretto e AVANTI, quale scegli?", ["ESCI", "AVANTI", "INDIETRO", "RESET"], "AVANTI"),
  (ctx, id) => {
    const first = numberBetween(ctx.rng, 1, 9);
    const second = numberBetween(ctx.rng, 10, 99);
    return text(id, `Scrivi solo i numeri della stringa A${first}B${second}C.`, `${first}${second}`);
  },
  (ctx, id) => checkbox(id, "Seleziona solo le parole scritte in maiuscolo: SALVA, esci, DATI, prova.", ["SALVA", "esci", "DATI", "prova"], ["SALVA", "DATI"]),
  (ctx, id) => radio(id, "Qual e l'ultima parola della frase “inizio centro fine”?", ["inizio", "centro", "fine", "frase"], "fine"),
  (ctx, id) => {
    const number = numberBetween(ctx.rng, 10, 80);
    return select(id, `Selezionare il codice senza spazi: Q R ${number}.`, [`QR${number}`, `Q R ${number}`, `Q-R-${number}`, `RQ${number}`], `QR${number}`);
  },
  (ctx, id) => exactText(id, "Copia solo la parte dopo il trattino finale in AA-24-Fine: Fine.", "Fine"),
  (ctx, id) => radio(id, "Se 3+9=12, quale numero selezioni?", ["9", "12", "39", "6"], "12"),
  (ctx, id) => select(id, "Selezionare la parola con la prima lettera maiuscola e le altre minuscole: Roma.", ["ROMA", "roma", "Roma", "RoMa"], "Roma"),
  (ctx, id) => {
    const code = numberBetween(ctx.rng, 6000, 6999);
    return text(id, `Scrivi le ultime due cifre del codice cliente CLI-${code}.`, String(code).slice(-2));
  },
  (ctx, id) => radio(id, "Se la domanda dice di selezionare il numero 0, cosa selezioni?", ["0", "1", "10", "00"], "0"),
  (ctx, id) => exactText(id, "Scrivi solo la sigla in maiuscolo nella frase “codice ITA valido”: ITA.", "ITA"),
  (ctx, id) => checkbox(id, "Seleziona i caratteri che compaiono nella stringa X/7@Y.", ["/", "@", "#", "_"], ["/", "@"]),
  (ctx, id) => select(id, "Selezionare il valore identico a “ore 15:00”.", ["ore 15:00", "Ore 15:00", "ore 3:00", "15 ore"], "ore 15:00"),
];

const creativeQuestionGroups = [
  [
    (ctx, id) => {
      const code = `PR-${letters(ctx.rng, 2)}-${numberBetween(ctx.rng, 100, 999)}`;
      return exactText(id, `Copia esattamente il codice tra parentesi: (${code}).`, code);
    },
    (ctx, id) => {
      const value = `INVIO-${numberBetween(ctx.rng, 40, 99)}-OK`;
      return text(id, `Scrivi solo la parte finale dopo l'ultimo trattino nella stringa ${value}.`, "OK");
    },
    (ctx, id) => {
      const word = pick(ctx.rng, ["lampada", "registro", "modifica", "conferma"]);
      return exactText(id, `Scrivi esattamente la parola tra virgolette: “${word}”.`, word);
    },
    (ctx, id) => {
      const value = `${letters(ctx.rng, 2)}${numberBetween(ctx.rng, 10, 99)}${letters(ctx.rng, 2)}`;
      const answer = value.replace(/[0-9]/g, "");
      return exactText(id, `Scrivi solo le lettere della stringa ${value}, senza numeri: ${answer}.`, answer);
    },
  ],
  [
    (ctx, id) => {
      const first = numberBetween(ctx.rng, 4, 12);
      const second = numberBetween(ctx.rng, 5, 15);
      const answer = String(first + second);
      return radio(id, `Se ${first}+${second}=${answer}, quale numero devi selezionare?`, optionSet(ctx.rng, answer, [String(first + second + 1), String(first + second - 2), `${first}${second}`]), answer);
    },
    (ctx, id) => {
      const start = numberBetween(ctx.rng, 14, 22);
      const minus = numberBetween(ctx.rng, 2, 5);
      const answer = String(start - minus);
      return select(id, `Se ${start}-${minus}=${answer}, seleziona il risultato corretto.`, optionSet(ctx.rng, answer, [String(start + minus), String(start - minus + 1), String(minus)]), answer);
    },
    (ctx, id) => {
      const hour = numberBetween(ctx.rng, 8, 15);
      const add = numberBetween(ctx.rng, 1, 4);
      const answer = `${String(hour + add).padStart(2, "0")}:30`;
      return select(id, `Se ora sono le ${String(hour).padStart(2, "0")}:30, tra ${add} ore saranno le ${answer}.`, optionSet(ctx.rng, answer, [`${String(hour + add - 1).padStart(2, "0")}:30`, `${String(hour + add + 1).padStart(2, "0")}:30`, `${String(add).padStart(2, "0")}:30`]), answer);
    },
    (ctx, id) => {
      const first = numberBetween(ctx.rng, 2, 7);
      const second = numberBetween(ctx.rng, 2, 7);
      const answer = String(first * second);
      return radio(id, `Il testo dice che ${first}x${second}=${answer}. Quale valore scegli?`, optionSet(ctx.rng, answer, [String(first + second), String(first * second + 1), String(first * second + first)]), answer);
    },
  ],
  [
    (ctx, id) => radio(id, "La frase dice: seleziona la parola NO. Quale parola devi selezionare?", ["SI", "NO", "FORSE", "OK"], "NO"),
    (ctx, id) => radio(id, "Non selezionare rosso: seleziona verde. Quale colore scegli?", ["rosso", "verde", "blu", "nero"], "verde"),
    (ctx, id) => radio(id, "Di che colore era il cavallo bianco di Napoleone?", ["nero", "bianco", "marrone", "grigio"], "bianco"),
    (ctx, id) => {
      const answer = pick(ctx.rng, ["seconda", "terza", "quarta"]);
      return radio(id, `La risposta corretta e scritta qui: ${answer}.`, ["prima", "seconda", "terza", "quarta"].filter((item, index, list) => list.indexOf(item) === index), answer);
    },
  ],
  [
    (ctx, id) => {
      const answer = pick(ctx.rng, ["D", "E", "F"]);
      const sequences = { D: "A B C _", E: "B C D _", F: "C D E _" };
      return radio(id, `Completa la sequenza ${sequences[answer]}.`, optionSet(ctx.rng, answer, ["A", "B", "C", "G"]), answer);
    },
    (ctx, id) => {
      const start = numberBetween(ctx.rng, 2, 8);
      const answer = String(start + 6);
      return radio(id, `Completa la sequenza ${start}, ${start + 2}, ${start + 4}, __.`, optionSet(ctx.rng, answer, [String(start + 5), String(start + 8), String(start + 4)]), answer);
    },
    (ctx, id) => {
      const word = pick(ctx.rng, ["PORTALE", "SESSIONE", "DOMANDA"]);
      const answer = `${word[0]}${word[word.length - 1]}`;
      return exactText(id, `Scrivi prima e ultima lettera della parola ${word}: ${answer}.`, answer);
    },
    (ctx, id) => {
      const value = `A-${numberBetween(ctx.rng, 10, 99)}-B-${numberBetween(ctx.rng, 10, 99)}`;
      const parts = value.split("-");
      return text(id, `Scrivi il terzo elemento della sequenza ${value}.`, parts[2]);
    },
  ],
  [
    (ctx, id) => {
      const symbol = pick(ctx.rng, ["@", "#", "+", "-"]);
      const distractors = ["@", "#", "+", "-", "§"].filter((item) => item !== symbol).slice(0, 3);
      return radio(id, `Selezionare il simbolo indicato tra parentesi: (${symbol}).`, optionSet(ctx.rng, symbol, distractors), symbol);
    },
    (ctx, id) => checkbox(id, "Seleziona solo i caratteri che compaiono nella stringa Q/7@K.", ["/", "@", "#", "_"], ["/", "@"]),
    (ctx, id) => {
      const key = pick(ctx.rng, ["TAB", "INVIO", "F5", "ESC"]);
      return exactText(id, `Scrivi il tasto indicato nella domanda: ${key}.`, key);
    },
    (ctx, id) => select(id, "Selezionare il simbolo usato per indicare un campo obbligatorio: *", ["#", "*", "@", "+"], "*"),
  ],
  [
    (ctx, id) => select(id, "Per entrare nel quiz dopo la schermata di attesa, quale pulsante va cliccato?", ["ESCI", "RICARICA", "ANNULLA", "SALVA"], "RICARICA"),
    (ctx, id) => radio(id, "Per confermare il riepilogo, quale pulsante e indicato dal portale?", ["MODIFICA", "INVIA", "ESCI", "INDIETRO"], "INVIA"),
    (ctx, id) => select(id, "Se devi correggere i dati dal riepilogo, quale pulsante scegli?", ["INVIA", "MODIFICA", "RICARICA", "PROVA"], "MODIFICA"),
    (ctx, id) => radio(id, "La domanda dice di spuntare Non sono un robot. Quale casella selezioni?", ["Non sono un robot", "Sono un robot", "Newsletter", "Esci"], "Non sono un robot"),
  ],
  [
    (ctx, id) => checkbox(id, "Seleziona solo i numeri pari.", ["2", "5", "8", "11"], ["2", "8"]),
    (ctx, id) => checkbox(id, "Seleziona solo le parole scritte tutte in maiuscolo.", ["DATI", "porta", "INVIO", "Quiz"], ["DATI", "INVIO"]),
    (ctx, id) => checkbox(id, "Seleziona le due parole che contengono la lettera R.", ["Riga", "Tavolo", "Portale", "Sole"], ["Riga", "Portale"]),
    (ctx, id) => checkbox(id, "Seleziona solo le opzioni che terminano con 7.", ["A17", "B18", "C27", "D30"], ["A17", "C27"]),
  ],
  [
    (ctx, id) => {
      const code = `AZ-${numberBetween(ctx.rng, 200, 999)}-${letters(ctx.rng, 2)}`;
      return exactText(id, `Informazione aziendale di esercizio: codice pratica ${code}. Copialo esattamente.`, code);
    },
    (ctx, id) => select(id, "Informazione aziendale di esercizio: referente indicato = Ufficio Gare.", ["Ufficio Gare", "Magazzino", "Reception", "Assistenza"], "Ufficio Gare"),
    (ctx, id) => radio(id, "Informazione aziendale di esercizio: reparto indicato = Amministrazione.", ["Tecnico", "Amministrazione", "Vendite", "Logistica"], "Amministrazione"),
    (ctx, id) => {
      const value = `CLI-${numberBetween(ctx.rng, 5000, 8999)}`;
      return text(id, `Informazione aziendale di esercizio: scrivi solo le quattro cifre del codice cliente ${value}.`, value.replace("CLI-", ""));
    },
  ],
  [
    (ctx, id) => radio(id, "Nel testo “Mario apre il portale e clicca RICARICA”, quale parola e scritta in maiuscolo?", ["Mario", "portale", "RICARICA", "clicca"], "RICARICA"),
    (ctx, id) => select(id, "Nel testo “prima controlla, poi invia”, quale parola viene dopo “poi”?", ["prima", "controlla", "invia", "poi"], "invia"),
    (ctx, id) => text(id, "Nel testo “codice: ZETA”, scrivi la parola dopo i due punti.", "ZETA"),
    (ctx, id) => radio(id, "Nel testo “uno due tre”, qual e la seconda parola?", ["uno", "due", "tre", "testo"], "due"),
  ],
  [
    (ctx, id) => exactText(id, "Scrivi il valore rispettando maiuscole e minuscole: Roma2026.", "Roma2026"),
    (ctx, id) => select(id, "Selezionare la voce identica a “ore 15:00”.", ["ore 15:00", "Ore 15:00", "ore 3:00", "15 ore"], "ore 15:00"),
    (ctx, id) => {
      const value = `Q R ${numberBetween(ctx.rng, 10, 99)}`;
      return select(id, `Selezionare il codice senza spazi: ${value}.`, [value.replaceAll(" ", ""), value, value.replaceAll(" ", "-"), value.split(" ").reverse().join("")], value.replaceAll(" ", ""));
    },
    (ctx, id) => exactText(id, "Scrivi solo la parola finale della stringa CLICK-DAY-Fine: Fine.", "Fine"),
  ],
];

const fixedQuizzes = [
  {
    id: "sessione-fissa-quiz-1",
    slot: 1,
    title: "Quiz 1",
    description: "Logica su sequenze, parole e codici",
    questions: [
      radio("quiz1-1", "Selezionare la seconda lettera della parola “Finanziamento”.", ["F", "i", "n", "a"], "i"),
      radio("quiz1-2", "Selezionare il numero che si ottiene contando le vocali nella parola “Domanda”.", ["2", "3", "4", "6"], "3"),
      exactText("quiz1-3", "Scrivere il codice “AB 47 CD” senza considerare gli spazi.", "AB47CD"),
      radio("quiz1-4", "Selezionare il risultato dell'operazione: 14 + 6 - 3.", ["15", "17", "20", "23"], "17"),
      radio("quiz1-5", "Selezionare la parola scritta interamente in maiuscolo.", ["portale", "Domanda", "INAIL", "utente"], "INAIL"),
      select("quiz1-6", "Selezionare il terzo elemento della sequenza: rosso - bianco - verde - blu.", ["rosso", "bianco", "verde", "blu"], "verde"),
      exactText("quiz1-7", "Scrivere i primi cinque caratteri del codice “M9K2P7X4”.", "M9K2P"),
      radio("quiz1-8", "Selezionare il numero pari tra i seguenti valori.", ["37", "51", "64", "79"], "64"),
      checkbox("quiz1-9", "Dichiarazione di presa visione delle regole tecniche.", ["Dichiarazione di presa visione delle regole tecniche"], ["Dichiarazione di presa visione delle regole tecniche"]),
      checkbox("quiz1-10", "Non sono un robot.", ["Non sono un robot"], ["Non sono un robot"]),
    ],
  },
  {
    id: "sessione-fissa-quiz-2",
    slot: 2,
    title: "Quiz 2",
    description: "Logica su ordine, simboli e trasformazioni",
    questions: [
      radio("quiz2-1", "Selezionare il simbolo presente alla fine del codice “R82K!”.", ["R", "K", "!", "82"], "!"),
      radio("quiz2-2", "Selezionare il numero ottenuto invertendo le cifre di 407.", ["470", "704", "074", "407"], "704"),
      exactText("quiz2-3", "Scrivere la parola “Accesso Riservato” eliminando gli spazi.", "AccessoRiservato"),
      select("quiz2-4", "Selezionare il risultato dell'operazione: 90 diviso 3.", ["20", "30", "60", "93"], "30"),
      radio("quiz2-5", "Selezionare la prima cifra diversa da zero nel numero 004850.", ["0", "4", "8", "5"], "4"),
      select("quiz2-6", "Selezionare la combinazione corretta delle prime tre lettere della parola “Partecipazione”.", ["Par", "par", "Pat", "Parte"], "Par"),
      radio("quiz2-7", "Selezionare l'unico valore scritto correttamente in formato euro.", ["1500,00 euro", "euro 1500", "1.500,00 euro", "1,500.00 euro"], "1.500,00 euro"),
      exactText("quiz2-8", "Scrivere il codice “X-25-Z” senza considerare i trattini.", "X25Z"),
      checkbox("quiz2-9", "Dichiarazione di presa visione delle regole tecniche.", ["Dichiarazione di presa visione delle regole tecniche"], ["Dichiarazione di presa visione delle regole tecniche"]),
      checkbox("quiz2-10", "Non sono un robot.", ["Non sono un robot"], ["Non sono un robot"]),
    ],
  },
  {
    id: "sessione-fissa-quiz-3",
    slot: 3,
    title: "Quiz 3",
    description: "Logica su confronto, conteggio e riconoscimento",
    questions: [
      radio("quiz3-1", "Selezionare il numero maggiore tra i seguenti.", ["128", "812", "281", "182"], "812"),
      select("quiz3-2", "Selezionare il numero di lettere della parola “Utente”.", ["5", "6", "7", "8"], "6"),
      exactText("quiz3-3", "Scrivere solo le lettere presenti nel codice “A7B9C2”, ignorando i numeri.", "ABC"),
      radio("quiz3-4", "Selezionare il risultato dell'operazione: 45 - 18.", ["26", "27", "28", "63"], "27"),
      radio("quiz3-5", "Selezionare il carattere centrale del codice “P4L”.", ["P", "4", "L", "PL"], "4"),
      select("quiz3-6", "Selezionare la parola che viene prima in ordine alfabetico.", ["Sistema", "Portale", "Bando", "Utente"], "Bando"),
      exactText("quiz3-7", "Scrivere il testo “Conferma Finale” tutto in minuscolo e senza spazi.", "confermafinale"),
      radio("quiz3-8", "Selezionare il risultato della somma delle cifre del numero 3412.", ["8", "9", "10", "12"], "10"),
      checkbox("quiz3-9", "Dichiarazione di presa visione delle regole tecniche.", ["Dichiarazione di presa visione delle regole tecniche"], ["Dichiarazione di presa visione delle regole tecniche"]),
      checkbox("quiz3-10", "Non sono un robot.", ["Non sono un robot"], ["Non sono un robot"]),
    ],
  },
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

function currentRoundAttempts(username = currentUser?.username) {
  return currentAttempts.filter((attempt) => attempt.username === username && attempt.roundId === currentRound.id);
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
  const allDone = completedCount >= 3;
  userStats.textContent = `${completedCount}/3 prove completate`;
  roundInfo.innerHTML = `
    <div>
      <strong>Sessione prova generale</strong>
      <span>${allDone ? "Hai completato tutte le prove disponibili." : "Completa Quiz 1, Quiz 2 e Quiz 3."}</span>
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
      <p>Hai gia fatto le 3 prove disponibili. Il tentativo e stato registrato nel pannello amministratore.</p>
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
  const current = currentAttempts.filter((attempt) => attempt.roundId === currentRound.id);
  const activeUsers = new Set(current.map((attempt) => attempt.username));
  const averageSeconds = current.length
    ? Math.round(current.reduce((total, attempt) => total + (Number(attempt.durationSeconds) || 0), 0) / current.length)
    : 0;
  const completedUsers = adminParticipants.filter((user) => completedSlots(user.username).size >= 3).length;

  adminSummary.innerHTML = `
    <article class="summary-card"><strong>3</strong><span>Quiz fissi disponibili</span></article>
    <article class="summary-card"><strong>${current.length}</strong><span>Prove inviate</span></article>
    <article class="summary-card"><strong>${completedUsers}/${adminParticipants.length}</strong><span>Utenti con 3/3</span></article>
    <article class="summary-card"><strong>${formatDuration(averageSeconds)}</strong><span>Tempo medio sessione</span></article>
  `;

  renderClickerButtons();
  renderAdminTable();
  showView("admin");
}

function renderClickerButtons() {
  clickerButtons.innerHTML = "";
  const buttons = [{ username: "all", name: "Tutti" }, ...adminParticipants];

  buttons.forEach((user) => {
    const visible = user.username === "all"
      ? currentAttempts
      : currentAttempts.filter((attempt) => attempt.username === user.username);
    const currentCount = user.username === "all"
      ? currentAttempts.filter((attempt) => attempt.roundId === currentRound.id).length
      : completedSlots(user.username).size;
    const button = document.createElement("button");
    button.className = "clicker-button";
    button.type = "button";
    button.classList.toggle("active", selectedAdminUser === user.username);
    button.innerHTML = `
      <strong>${user.name}</strong>
      <span>${user.username === "all" ? `${currentCount} prove inviate` : `${currentCount}/3 completate`}</span>
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
  const visibleAttempts = selectedAdminUser === "all"
    ? currentAttempts
    : currentAttempts.filter((attempt) => attempt.username === selectedAdminUser);
  const averageSeconds = visibleAttempts.length
    ? Math.round(visibleAttempts.reduce((total, attempt) => total + (Number(attempt.durationSeconds) || 0), 0) / visibleAttempts.length)
    : 0;

  attemptTableTitle.textContent = selected ? `Registro prove di ${selected.name}` : "Registro prove generale";
  selectedClickerSummary.textContent = selected
    ? `${selected.name}: ${completedSlots(selected.username).size}/3 completate, ${visibleAttempts.length} prove totali, tempo medio ${formatDuration(averageSeconds)}.`
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
