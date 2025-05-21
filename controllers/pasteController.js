const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");

const dataPath = path.join(__dirname, "..", "snippets", "snippets.json");

function loadSnippets() {
  if (!fs.existsSync(dataPath)) return [];
  const raw = fs.readFileSync(dataPath);
  return JSON.parse(raw);
}

function saveSnippets(snippets) {
  fs.writeFileSync(dataPath, JSON.stringify(snippets, null, 2));
}

function homePage(req, res) {
  res.render("home");
}

function createPaste(req, res) {
  const { content, isPrivate, expiry } = req.body;
  const id = uuidv4();
  const snippets = loadSnippets();

  const expiresAt = expiry ? Date.now() + parseInt(expiry) * 60000 : null;

  snippets.push({
    id,
    content,
    isPrivate: isPrivate === "on",
    createdAt: Date.now(),
    expiresAt
  });

  saveSnippets(snippets);
  res.redirect(`/paste/${id}`);
}

function getPaste(req, res) {
  const { id } = req.params;
  const snippets = loadSnippets();
  const paste = snippets.find(s => s.id === id);

  if (!paste) return res.render("error", { message: "Paste not found." });
  if (paste.expiresAt && Date.now() > paste.expiresAt) {
    return res.render("error", { message: "Paste has expired." });
  }
  if (paste.isPrivate) {
    return res.render("error", { message: "This paste is private." });
  }

  res.render("paste", { paste });
}

module.exports = { homePage, createPaste, getPaste };
