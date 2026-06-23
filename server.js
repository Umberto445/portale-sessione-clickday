const http = require("http");
const fs = require("fs/promises");
const path = require("path");
const crypto = require("crypto");

const root = __dirname;
const dataDir = process.env.DATA_DIR || path.join(root, "data");
const usersFile = path.join(dataDir, "users.json");
const attemptsFile = path.join(dataDir, "attempts.json");
const roundFile = path.join(dataDir, "round.json");

const defaultUsers = [
  { username: "admin", password: "admin123", name: "Amministratore", role: "admin" },
  { username: "michele.antonelli", password: "prova123", name: "Michele Antonelli", role: "user" },
  { username: "umberto.verdari", password: "prova123", name: "Umberto Verdari", role: "user" },
  { username: "nicola.rossi", password: "prova123", name: "Nicola Rossi", role: "user" },
  { username: "davide.tiraboschi", password: "prova123", name: "Davide Tiraboschi", role: "user" },
  { username: "emanuele.canteri", password: "prova123", name: "Emanuele Canteri", role: "user" },
  { username: "giuseppe.defrancesco", password: "prova123", name: "Giuseppe de Francesco", role: "user" },
  { username: "lorenzo.giannotti", password: "prova123", name: "Lorenzo Giannotti", role: "user" },
  { username: "lorenzo1", password: "prova123", name: "Lorenzo 1", role: "user" },
  { username: "elia.bonetti", password: "prova123", name: "Elia Bonetti", role: "user" },
  { username: "riccardo.giannelli", password: "prova123", name: "Riccardo Giannelli", role: "user" },
  { username: "angel.toninelli", password: "prova123", name: "Angel Toninelli", role: "user" },
  { username: "pietro.dalla", password: "prova123", name: "Pietro Dalla", role: "user" },
  { username: "pietro.pioli", password: "prova123", name: "Pietro Pioli", role: "user" },
  { username: "raffaele.marotta", password: "prova123", name: "Raffaele Marotta", role: "user" },
];

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
};

async function ensureData() {
  await fs.mkdir(dataDir, { recursive: true });
  await writeJson(usersFile, defaultUsers);
  await ensureJson(attemptsFile, []);
  await ensureJson(roundFile, createRound(1));
}

async function ensureJson(file, fallback) {
  try {
    await fs.access(file);
  } catch {
    await writeJson(file, fallback);
  }
}

function createRound(number) {
  return {
    id: crypto.randomUUID(),
    number,
    seed: crypto.randomInt(100000, 999999999),
    createdAt: new Date().toISOString(),
  };
}

async function readJson(file) {
  return JSON.parse(await fs.readFile(file, "utf8"));
}

async function writeJson(file, data) {
  await fs.writeFile(file, JSON.stringify(data, null, 2));
}

function sendJson(response, status, data) {
  response.writeHead(status, { "Content-Type": "application/json; charset=utf-8" });
  response.end(JSON.stringify(data));
}

function readBody(request) {
  return new Promise((resolve, reject) => {
    let body = "";
    request.on("data", (chunk) => {
      body += chunk;
      if (body.length > 1_000_000) request.destroy();
    });
    request.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (error) {
        reject(error);
      }
    });
  });
}

async function handleApi(request, response) {
  if (request.url === "/api/login" && request.method === "POST") {
    const body = await readBody(request);
    const users = await readJson(usersFile);
    const typedUsername = String(body.username || "").trim().toLowerCase();
    const user = users.find((item) => item.username.toLowerCase() === typedUsername && item.password === body.password);
    if (!user) {
      sendJson(response, 401, { error: "Credenziali non valide" });
      return;
    }
    sendJson(response, 200, {
      user: {
        username: user.username,
        name: user.name,
        role: user.role,
      },
    });
    return;
  }

  if (request.url === "/api/round" && request.method === "GET") {
    sendJson(response, 200, await readJson(roundFile));
    return;
  }

  if (request.url === "/api/round/restart" && request.method === "POST") {
    sendJson(response, 200, await readJson(roundFile));
    return;
  }

  if (request.url === "/api/attempts" && request.method === "GET") {
    sendJson(response, 200, await readJson(attemptsFile));
    return;
  }

  if (request.url === "/api/attempts" && request.method === "POST") {
    const body = await readBody(request);
    const attempts = await readJson(attemptsFile);
    const round = await readJson(roundFile);
    const quizSlot = Number(body.quizSlot);
    if (body.roundId && body.roundId !== round.id) {
      sendJson(response, 409, { error: "La sessione e cambiata: rientra nella prova generale" });
      return;
    }
    const alreadyDone = attempts.some((attempt) =>
      attempt.username === body.username &&
      attempt.roundId === round.id &&
      Number(attempt.quizSlot) === quizSlot &&
      attempt.quizId === body.quizId
    );

    if (alreadyDone) {
      sendJson(response, 409, { error: "Questa prova e gia stata completata nella sessione attuale" });
      return;
    }

    attempts.unshift({
      id: crypto.randomUUID(),
      username: body.username,
      userName: body.userName,
      roundId: round.id,
      roundNumber: round.number,
      quizSlot,
      quizId: body.quizId,
      quizTitle: body.quizTitle,
      correct: body.correct,
      total: body.total,
      score: body.score,
      durationSeconds: Number(body.durationSeconds) || 0,
      createdAt: new Date().toISOString(),
    });

    await writeJson(attemptsFile, attempts);
    sendJson(response, 201, { ok: true });
    return;
  }

  if (request.url === "/api/attempts" && request.method === "DELETE") {
    await writeJson(attemptsFile, []);
    sendJson(response, 200, { ok: true });
    return;
  }

  sendJson(response, 404, { error: "API non trovata" });
}

async function serveStatic(request, response) {
  const urlPath = decodeURIComponent(request.url.split("?")[0]);
  const filePath = path.normalize(path.join(root, urlPath === "/" ? "index.html" : urlPath));

  if (!filePath.startsWith(root)) {
    response.writeHead(403);
    response.end("Accesso negato");
    return;
  }

  try {
    const data = await fs.readFile(filePath);
    const ext = path.extname(filePath);
    response.writeHead(200, { "Content-Type": mimeTypes[ext] || "application/octet-stream" });
    response.end(data);
  } catch {
    response.writeHead(404);
    response.end("File non trovato");
  }
}

async function main() {
  await ensureData();
  const server = http.createServer(async (request, response) => {
    try {
      if (request.url.startsWith("/api/")) {
        await handleApi(request, response);
      } else {
        await serveStatic(request, response);
      }
    } catch (error) {
      sendJson(response, 500, { error: "Errore server" });
    }
  });

  const port = process.env.PORT || 4175;
  const host = process.env.HOST || "0.0.0.0";
  server.listen(port, host, () => {
    console.log(`Portale sessione click day pronto: http://${host}:${port}`);
  });
}

main();
