import express from "express";
import Database from "./database.js";

const app = express();
const port = 3000;

const db = new Database();

app.use(express.json());

// Create
app.post("/tasks", (req, res) => {
  const task = req.body;
  db.insert(task);
  res.json({ status: "OK", message: "Tarefa criada com sucesso!" });
});
// Update
app.put("/tasks/:id", (req, res) => {
  const { id } = req.params;
  const data = req.body;
  db.update(parseInt(id), data);
  res.json({ status: "OK", message: "Tarefa atualziada com sucesso!" });
});
// Delete
app.delete("/tasks/:id", (req, res) => {
  const { id } = req.params;
  db.delete(parseInt(id));
  res.send({status: "OK", message: "Tarefa excluída com sucesso!"});  
});

// Read (Buscar tarefa pelo ID)
app.get("/tasks/:id", (req, res) => {
  const { id } = req.params;
  const task = db.getById(parseInt(id));
  res.json(task);
});

// Read (Buscar todas as tarrfas)
app.get("/tasks", (req, res) => {
  const tasks = db.getAll();
  res.json(tasks);
});

app.listen(port, () => {
  console.log(`Servidor aguardando conexõs na porta ${port}...`);
});
