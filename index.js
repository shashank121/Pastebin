const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const pasteRoutes = require("./routes/pasteRoutes");

const app = express();
const PORT = 3300;

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/", pasteRoutes);

app.listen(PORT, () => console.log(`Pastebin running at http://localhost:${PORT}`));
