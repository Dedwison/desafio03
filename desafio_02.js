const express = require("express");

const app = express();

const PORT = process.env.PORT || 8080;

app.get("/api/sumar/:num1/:num2", (req, res) => {
  const { num1, num2 } = req.params;
  res.json({ result: +num1 + +num2 });
});

app.get("/api/sumar", (req, res) => {
  const { num1, num2 } = req.query;
  res.json({ result: +num1 + +num2 });
});

app.get("/api/sumar/:operacion", (req, res) => {
  const { operacion } = req.params;
  res.json({ result: eval(operacion) });
});

const connectedServer = app.listen(PORT, () => {
  console.log(`Server is up and running on port: ${PORT}`);
});

connectedServer.on("error", (error) => {
  console.log(error.message);
});
