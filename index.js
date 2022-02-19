const express = require("express");

const app = express();

const PORT = process.env.PORT || 8080;
let frase = "Frase inicial";

// Middleware
app.use(express.json());
app.get("/api/frase", (req, res) => {
  res.json({ frase });
});

app.get("/api/palabras/:pos", (req, res) => {
  const { pos } = req.params;
  const palabras = frase.split(" ");
  const buscada = palabras[+pos - 1];
  res.json({ buscada });
});

app.post("/api/palabras", (req, res) => {
  const { palabra } = req.body;
  const palabras = frase.split(" ");
  palabras.push(palabra);
  frase = palabras.join(" ");
  res.json({ agragada: palabra, pos: palabras.length });
});

app.put("/api/palabras/:pos", (req, res) => {
  const { palabra } = req.body;
  const { pos } = req.params;
  const palabras = frase.split(" ");
  const palabraAModificar = palabras[+pos - 1];
  palabras[+pos - 1] = palabra;
  frase = palabras.join(" ");
  res.json({
    actualizada: palabra,
    anterior: palabraAModificar,
  });
});

app.delete("api/palabras/:pos", (req, res) => {
  const { pos } = req.params;
  const palabras = frase.split(" ");
  // const position = +pos - 1;
  palabras.splice(+pos - 1, 1);
  frase = palabras.join(" ");
  res.json({ mensaje: "ok" });
});

const connectedServer = app.listen(PORT, () => {
  console.log(`Server is up and running on port: ${PORT}`);
});

connectedServer.on("error", (error) => {
  console.log(error.message);
});
