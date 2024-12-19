const express = require("express");
const cors = require("cors")

const app = express();
const PORT = process.env.PORT;
const URI = process.env.URI;

let notes = [
  {
    id: 1,
    content: "Aprender los fundamentos de MongoDB",
    date: "2024-12-18T10:00:00.000Z",
    important: true,
  },
  {
    id: 2,
    content: "Revisar la implementación del CRUD en Express",
    date: "2024-12-18T12:00:00.000Z",
    important: false,
  },
  {
    id: 3,
    content: "Finalizar el diseño del front-end con React",
    date: "2024-12-17T16:30:00.000Z",
    important: true,
  },
  {
    id: 4,
    content: "Escribir pruebas unitarias para las rutas API",
    date: "2024-12-16T14:15:00.000Z",
    important: false,
  },
  {
    id: 5,
    content: "Integrar la base de datos con el front-end",
    date: "2024-12-15T18:45:00.000Z",
    important: true,
  },
];

const generateId = () => {
  const notesId = notes.map((note) => note.id);
  const maxId = Math.max(...notesId);
  return maxId + 1;
};

app.use(cors())

app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Esto es una API REST!</h1>");
});

app.get("/api/notes", (req, res) => {
  res.json(notes);
});

app.get("/api/notes/:id", (req, res) => {
  const id = req.params.id;
  note = notes.find((note) => note.id == id);
  if (note) {
    res.send(note);
  } else {
    res.send({ error: "La nota no existe" });
    res.status(502).end();
  }
});

app.post("/api/notes", (req, res) => {
  const newNote = {
    content: req.body.content,
    important: req.body.important || false,
    id: generateId(),
    date: new Date().toISOString(),
  };

  if (newNote.content) {
    notes = [...notes, newNote];
    res.json(newNote);
    res.status(201).end();
  } else {
    res.status(400).end();
  }
});

app.delete("/api/notes/:id", (req, res) => {
  const id = req.params.id;
  const note = notes.find((note) => note.id == id);
  if (note) {
    notes = notes.filter((note) => note.id != id);
    res.status(204).end();
  } else {
    res.status(502).send({ error: "La nota no existe" }).end();
  }
});

app.put("/api/notes/:id", (req, res) => {
  const { content, important } = req.body;
  const { id } = req.params;
  const noteIndex = notes.findIndex((note) => note.id == id);

  if (noteIndex != -1) {
    notes[noteIndex] = {
      ...notes[noteIndex],
      content: content ? content : notes[noteIndex].content,
      important: important !== undefined ? important : notes[noteIndex].important,
    };
    res.status(200).json(notes[noteIndex])
  } else {
    res.status(404).json({error: "La nota no existe"})
  }
});

app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
