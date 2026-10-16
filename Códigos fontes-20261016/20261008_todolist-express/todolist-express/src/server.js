import express from "express";
import Database from "./database.js";

const app = express();
const port = 3000;

const db = new Database();

app.use(express.json());

// Create
app.post("/tasks", (req, res) => {
  
  if(req.body == undefined) {
    res
      .status(400)
      .json(
          {
            status: "error",
            message: "JSON com os dados da tarefa é obrigatório"
          }
      );
      return;
  }
  
  const { id, name, done } = req.body;

  console.log(`id: ${id}, name: ${name}, done: ${done}`)

  if (id === undefined || name === undefined || done === undefined) {
    res
      .status(400)
      .json(
          {
            status: "error",
            message: "Os atributos obrigatórios (id, name, done) não foram enviados no JSON"
          }
      );
      return;
  }

  db.insert({id, name, done});
  res.status(201).json({ status: "OK", message: "Tarefa criada com sucesso!" });

});

// Update
app.put("/tasks/:id", (req, res) => {
  const { id } = req.params;

  const task = db.getById(parseInt(id));
  if( task == undefined) {
    res
      .status(404)
      .json(
          {
            status: "error",
            message: "O id informado não corresponde a nenhuma tarefa cadastrada."
          }
      );
    return;
  }

  if(req.body == undefined) {
    res
      .status(400)
      .json(
          {
            status: "error",
            message: "JSON com os dados da tarefa é obrigatório"
          }
      );
    return;
  }
  
  const { name, done } = req.body;

  if ( name === undefined || done === undefined) {
    res
      .status(400)
      .json(
          {
            status: "error",
            message: "Os atributos obrigatórios (name, done) não foram enviados no JSON"
          }
      );
      return;
  }

  db.update(parseInt(id), { name, done});
  res.status.apply(200).json({ status: "OK", message: "Tarefa atualziada com sucesso!" });
});

// Delete
app.delete("/tasks/:id", (req, res) => {
  const { id } = req.params;
  db.delete(parseInt(id));
  res.status(204).send({status: "OK", message: "Tarefa excluída com sucesso!"});  
});

// Read (Buscar tarefa pelo ID)
app.get("/tasks/:id", (req, res) => {
  const { id } = req.params;
  const task = db.getById(parseInt(id));
  if( task == undefined) {
    res
      .status(404)
      .json(
          {
            status: "error",
            message: "O id informado não corresponde a nenhuma tarefa cadastrada."
          }
      );
    return;
  }
  res.status(200).json(task);
});

// Read (Buscar todas as tarrfas)
app.get("/tasks", (req, res) => {
  const tasks = db.getAll();
  res.status(200).json(tasks);
});

app.listen(port, () => {
  console.log(`Servidor aguardando conexõs na porta ${port}...`);
});
