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

const TOTAL_QUIZZES = 51;
const CURRENT_QUIZ_PREFIX = "clickday-51-facile-";

function seededShuffle(seed, items) {
  const copy = [...items];
  let state = seed * 1103515245 + 12345;
  for (let index = copy.length - 1; index > 0; index -= 1) {
    state = (state * 1103515245 + 12345) & 0x7fffffff;
    const swapIndex = state % (index + 1);
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }
  return copy;
}

function uniqueOptions(answer, distractors, seed, limit = 4) {
  const options = [String(answer)];
  distractors.map(String).forEach((item) => {
    if (!options.includes(item)) options.push(item);
  });
  return seededShuffle(seed, options.slice(0, limit));
}

function itemAt(items, slot, offset = 0) {
  return items[(slot + offset) % items.length];
}

function sumDigits(value) {
  return String(value).split("").reduce((total, digit) => total + Number(digit), 0);
}

function countVowels(word) {
  return String(word).toLowerCase().split("").filter((letter) => "aeiou".includes(letter)).length;
}

const simpleWords = [
  "Portale", "Bando", "Domanda", "Codice", "Modulo", "Pratica", "Scheda", "Importo", "Accesso", "Verifica",
  "Conferma", "Registro", "Utente", "Risultato", "Sezione", "Pagina", "Valore", "Archivio", "Invio", "Casella",
  "Opzione", "Riepilogo", "Campo", "Sequenza", "Simbolo", "Numero", "Lettera", "Controllo", "Dichiarazione", "Pulsante",
];

const lowerWords = [
  "portale", "bando", "domanda", "codice", "modulo", "pratica", "scheda", "importo", "accesso", "verifica",
  "conferma", "registro", "utente", "risultato", "sezione", "pagina", "valore", "archivio", "invio", "casella",
];

const uppercaseWords = [
  "DATI", "INVIO", "BANDO", "CODICE", "PORTALE", "ACCESSO", "CAMPO", "REGISTRO", "VALORE", "MODULO",
  "SCHEDA", "PRATICA", "ESCI", "AVANTI", "RICARICA", "CONFERMA", "UTENTE", "SEZIONE", "OPZIONE", "SIMBOLO",
];

const colors = ["rosso", "verde", "bianco", "blu", "giallo", "nero", "grigio", "viola", "arancio", "azzurro"];
const symbols = ["@", "#", "+", "-", "/", "*", "!", "?", "_", "%"];
const numberWords = [
  ["otto", "8"], ["nove", "9"], ["dieci", "10"], ["undici", "11"], ["dodici", "12"], ["tredici", "13"],
  ["quattordici", "14"], ["quindici", "15"], ["sedici", "16"], ["diciassette", "17"], ["diciotto", "18"], ["diciannove", "19"],
  ["venti", "20"], ["ventuno", "21"], ["ventidue", "22"], ["ventitre", "23"], ["ventiquattro", "24"],
];

function qLastCharacters(slot, index, id) {
  const code = "CD" + String(1200 + slot * 17 + index).padStart(4, "0") + "XZ";
  const answer = code.slice(-3);
  return exactText(id, "Scrivere gli ultimi tre caratteri del codice " + code + ".", answer);
}

function qRemoveSpaces(slot, index, id) {
  const first = itemAt(uppercaseWords, slot, index);
  const second = String(20 + ((slot + index) % 70));
  const third = itemAt(uppercaseWords, slot, index + 4);
  const visible = first + " " + second + " " + third;
  return exactText(id, "Scrivere il codice " + visible + " senza considerare gli spazi.", first + second + third);
}

function qArithmetic(slot, index, id) {
  const first = 8 + ((slot * 2 + index) % 18);
  const second = 3 + ((slot + index) % 9);
  const third = 1 + ((slot + index * 2) % 5);
  const answer = String(first + second - third);
  return radio(id, "Selezionare il risultato dell'operazione: " + first + " + " + second + " - " + third + ".", uniqueOptions(answer, [Number(answer) + 1, Number(answer) - 1, first + second], slot + index), answer);
}

function qVowelCount(slot, index, id) {
  const word = itemAt(simpleWords, slot, index);
  const answer = String(countVowels(word));
  return select(id, "Selezionare il numero di vocali presenti nella parola " + word + ".", uniqueOptions(answer, [Number(answer) + 1, Math.max(0, Number(answer) - 1), word.length], slot * 3 + index), answer);
}

function qLetterPosition(slot, index, id) {
  const word = itemAt(simpleWords, slot, index + 3);
  const position = 1 + ((slot + index) % Math.min(5, word.length));
  const answer = word[position - 1];
  const distractors = word.split("").filter((letter) => letter !== answer).slice(0, 5);
  return radio(id, "Selezionare la " + position + " lettera della parola " + word + ".", uniqueOptions(answer, distractors, slot * 5 + index), answer);
}

function qNumberSequence(slot, index, id) {
  const start = 2 + ((slot + index) % 8);
  const step = 2 + ((slot + index) % 3);
  const answer = String(start + step * 3);
  return select(id, "Completare la sequenza: " + start + " - " + (start + step) + " - " + (start + step * 2) + " - __.", uniqueOptions(answer, [Number(answer) + step, Number(answer) - 1, start + step], slot * 7 + index), answer);
}

function qUppercaseWord(slot, index, id) {
  const answer = itemAt(uppercaseWords, slot, index);
  const low = itemAt(lowerWords, slot, index + 1);
  const title = itemAt(simpleWords, slot, index + 2);
  const mixed = answer[0] + answer.slice(1).toLowerCase();
  return radio(id, "Selezionare la parola scritta interamente in maiuscolo.", seededShuffle(slot * 11 + index, [low, title, answer, mixed]), answer);
}

function qSymbolEnd(slot, index, id) {
  const symbol = itemAt(symbols, slot, index);
  const code = "R" + (30 + slot) + "K" + symbol;
  return radio(id, "Selezionare il simbolo presente alla fine del codice " + code + ".", uniqueOptions(symbol, symbols.filter((item) => item !== symbol).slice(0, 5), slot * 13 + index), symbol);
}

function qWithoutHyphens(slot, index, id) {
  const code = itemAt(uppercaseWords, slot, index).slice(0, 2) + "-" + (40 + slot + index) + "-" + itemAt(uppercaseWords, slot, index + 5).slice(0, 2);
  return exactText(id, "Scrivere il codice " + code + " senza considerare i trattini.", code.replaceAll("-", ""));
}

function qSumDigits(slot, index, id) {
  const number = 2100 + slot * 31 + index * 7;
  const answer = String(sumDigits(number));
  return select(id, "Selezionare la somma delle cifre del numero " + number + ".", uniqueOptions(answer, [Number(answer) + 1, Number(answer) - 1, String(number).slice(0, 2)], slot * 17 + index), answer);
}

function qEvenNumber(slot, index, id) {
  const answer = String(40 + ((slot + index) % 20) * 2);
  const options = [String(Number(answer) - 3), String(Number(answer) + 5), answer, String(Number(answer) + 9)];
  return radio(id, "Selezionare il numero pari tra i seguenti valori.", seededShuffle(slot * 19 + index, options), answer);
}

function qDatePiece(slot, index, id) {
  const day = String(1 + ((slot + index) % 28)).padStart(2, "0");
  const month = String(1 + ((slot * 2 + index) % 12)).padStart(2, "0");
  const year = String(2026 + ((slot + index) % 3));
  const date = day + "/" + month + "/" + year;
  const mode = (slot + index) % 3;
  if (mode === 0) return select(id, "Selezionare il giorno della data " + date + ".", uniqueOptions(day, [month, year, String(Number(day) + 1).padStart(2, "0")], slot * 23 + index), day);
  if (mode === 1) return select(id, "Selezionare il mese della data " + date + ".", uniqueOptions(month, [day, year, String(Number(month) + 1).padStart(2, "0")], slot * 23 + index), month);
  return select(id, "Selezionare l'anno della data " + date + ".", uniqueOptions(year, [day, month, String(Number(year) + 1)], slot * 23 + index), year);
}

function qPortalButton(slot, index, id) {
  const cases = [
    ["Per proseguire dopo aver compilato i campi, quale pulsante bisogna premere?", "AVANTI", ["ESCI", "AVANTI", "ANNULLA", "INDIETRO"]],
    ["Per confermare i dati nella schermata di riepilogo, quale pulsante bisogna premere?", "INVIA", ["INVIA", "MODIFICA", "ESCI", "RICARICA"]],
    ["Per cambiare i dati dalla schermata di riepilogo, quale pulsante bisogna premere?", "MODIFICA", ["INVIA", "MODIFICA", "AVANTI", "SALVA"]],
    ["Per entrare nella prova dalla schermata di attesa, quale pulsante bisogna premere?", "RICARICA", ["ESCI", "RICARICA", "MODIFICA", "INVIA"]],
  ];
  const selected = itemAt(cases, slot, index);
  return radio(id, selected[0], seededShuffle(slot * 29 + index, selected[2]), selected[1]);
}

function qGreaterOrSmaller(slot, index, id) {
  const base = 100 + slot * 9 + index;
  const values = [base, base + 207, base + 42, base + 81].map(String);
  const answer = String(Math.max(...values.map(Number)));
  return radio(id, "Selezionare il numero maggiore tra i seguenti.", seededShuffle(slot * 31 + index, values), answer);
}

function qExtractAfterColon(slot, index, id) {
  const value = itemAt(uppercaseWords, slot, index).slice(0, 3) + String(70 + slot + index);
  const full = "RIF:" + value + "/FINE";
  return exactText(id, "Scrivere solo il testo dopo i due punti e prima dello slash nella stringa " + full + ".", value);
}

function qSymbolsPresent(slot, index, id) {
  const first = itemAt(symbols, slot, index);
  const second = itemAt(symbols, slot, index + 3);
  const shown = "A" + first + "7" + second + "B";
  const options = seededShuffle(slot * 37 + index, [first, second, itemAt(symbols, slot, index + 5), itemAt(symbols, slot, index + 7)]);
  return checkbox(id, "Selezionare solo i simboli presenti nella stringa " + shown + ".", options, [first, second]);
}

function qUppercaseChoices(slot, index, id) {
  const first = itemAt(uppercaseWords, slot, index);
  const second = itemAt(uppercaseWords, slot, index + 6);
  const options = seededShuffle(slot * 41 + index, [first, itemAt(lowerWords, slot, index), second, itemAt(simpleWords, slot, index + 2)]);
  return checkbox(id, "Selezionare solo le parole scritte tutte in maiuscolo.", options, [first, second]);
}

function qNumberWord(slot, index, id) {
  const selected = itemAt(numberWords, slot, index);
  return select(id, "Selezionare il numero scritto in lettere: " + selected[0] + ".", uniqueOptions(selected[1], [Number(selected[1]) - 1, Number(selected[1]) + 1, Number(selected[1]) + 2], slot * 43 + index), selected[1]);
}

function qColorFromText(slot, index, id) {
  const answer = itemAt(colors, slot, index);
  return radio(id, "Nella frase 'il colore corretto e " + answer + "', quale colore devi selezionare?", uniqueOptions(answer, colors.filter((item) => item !== answer).slice(0, 6), slot * 47 + index), answer);
}

function qFirstLastLetters(slot, index, id) {
  const word = itemAt(uppercaseWords, slot, index + 4);
  const answer = word[0] + word[word.length - 1];
  return exactText(id, "Scrivere la prima e l'ultima lettera della parola " + word + ".", answer);
}

function qReverseDigits(slot, index, id) {
  const number = String(300 + slot * 6 + index * 3);
  const answer = number.split("").reverse().join("");
  return select(id, "Selezionare il numero ottenuto invertendo le cifre di " + number + ".", uniqueOptions(answer, [number, answer.slice(1), number.slice(1)], slot * 53 + index), answer);
}

function qAlphabeticalFirst(slot, index, id) {
  const groups = [
    ["Bando", "Portale", "Utente", "Sistema"],
    ["Codice", "Domanda", "Modulo", "Valore"],
    ["Archivio", "Registro", "Scheda", "Verifica"],
    ["Accesso", "Campo", "Invio", "Sezione"],
  ];
  const options = itemAt(groups, slot, index);
  const answer = [...options].sort((a, b) => a.localeCompare(b, "it"))[0];
  return select(id, "Selezionare la parola che viene prima in ordine alfabetico.", seededShuffle(slot * 59 + index, options), answer);
}

const questionBuilders = [
  qLastCharacters,
  qRemoveSpaces,
  qArithmetic,
  qVowelCount,
  qLetterPosition,
  qNumberSequence,
  qUppercaseWord,
  qSymbolEnd,
  qWithoutHyphens,
  qSumDigits,
  qEvenNumber,
  qDatePiece,
  qPortalButton,
  qGreaterOrSmaller,
  qExtractAfterColon,
  qSymbolsPresent,
  qUppercaseChoices,
  qNumberWord,
  qColorFromText,
  qFirstLastLetters,
  qReverseDigits,
  qAlphabeticalFirst,
];

function consentQuestions(slot) {
  return [
    checkbox("quiz" + slot + "-regole", "Dichiarazione di presa visione delle regole tecniche.", ["Dichiarazione di presa visione delle regole tecniche"], ["Dichiarazione di presa visione delle regole tecniche"]),
    checkbox("quiz" + slot + "-robot", "Non sono un robot.", ["Non sono un robot"], ["Non sono un robot"]),
  ];
}

function createQuiz(slot) {
  const start = (slot * 3) % questionBuilders.length;
  const questions = Array.from({ length: 8 }, (_, index) => {
    const builder = questionBuilders[(start + index * 7) % questionBuilders.length];
    return builder(slot, index, "quiz" + slot + "-" + (index + 1));
  });

  return {
    id: CURRENT_QUIZ_PREFIX + String(slot).padStart(2, "0"),
    slot,
    title: "Prova " + slot,
    description: "Logica elementare su codici, parole, numeri e campi del portale.",
    questions: [...questions, ...consentQuestions(slot)],
  };
}

const fixedQuizzes = Array.from({ length: TOTAL_QUIZZES }, (_, index) => createQuiz(index + 1));

function buildRoundQuizzes() {
  return fixedQuizzes;
}

function isCurrentQuizAttempt(attempt) {
  return String(attempt.quizId || "").startsWith(CURRENT_QUIZ_PREFIX);
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
  return currentAttempts.filter((attempt) => attempt.username === username && attempt.roundId === currentRound.id && isCurrentQuizAttempt(attempt));
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
  const allDone = completedCount >= TOTAL_QUIZZES;
  userStats.textContent = `${completedCount}/${TOTAL_QUIZZES} prove completate`;
  roundInfo.innerHTML = `
    <div>
      <strong>Sessione prova generale</strong>
      <span>${allDone ? "Hai completato tutte le prove disponibili." : "Scegli una delle 51 prove disponibili."}</span>
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
      <p>Hai gia completato tutte le 51 prove disponibili. I tentativi sono registrati nel pannello amministratore.</p>
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
  const current = currentAttempts.filter((attempt) => attempt.roundId === currentRound.id && isCurrentQuizAttempt(attempt));
  const activeUsers = new Set(current.map((attempt) => attempt.username));
  const averageSeconds = current.length
    ? Math.round(current.reduce((total, attempt) => total + (Number(attempt.durationSeconds) || 0), 0) / current.length)
    : 0;
  const completedUsers = adminParticipants.filter((user) => completedSlots(user.username).size >= TOTAL_QUIZZES).length;

  adminSummary.innerHTML = `
    <article class="summary-card"><strong>${TOTAL_QUIZZES}</strong><span>Prove disponibili</span></article>
    <article class="summary-card"><strong>${current.length}</strong><span>Prove inviate</span></article>
    <article class="summary-card"><strong>${completedUsers}/${adminParticipants.length}</strong><span>Utenti con 51/51</span></article>
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
      <span>${user.username === "all" ? `${currentCount} prove inviate` : `${currentCount}/${TOTAL_QUIZZES} completate`}</span>
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
    ? `${selected.name}: ${completedSlots(selected.username).size}/${TOTAL_QUIZZES} completate, ${visibleAttempts.length} prove totali, tempo medio ${formatDuration(averageSeconds)}.`
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
