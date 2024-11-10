const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const Note = require('./models/Note')
const app = express();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Conectado a mongo"))
  .catch((error) => console.error("Error en la conexión a mongo", error));

app.use(cors());
app.use(express.json());


app.post('/api/notes', async (req, res) => {
  try {
    const { title, content, date} = req.body;
    const newNote = new Note({ title, content, date});
    await newNote.save();
    res.status(201).json(newNote);
  } catch (error) {
    res.status(500).json({ error: 'No se puede guardar la nota' });
  }
});


app.get('/api/notes', async (req, res) => {
  try {
    const notes = await Note.find(); 
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ error: 'No se pueden obtener las notas' });
  }
});


app.put('/:id', (req, res) => {
  console.log(`Recibida solicitud PUT para el ID: ${req.params.id}`);
  res.send(`PUT recibido para el ID: ${req.params.id}`);
});


app.delete('/api/notes/:id', async (req, res) => {
  try {
    const { id } = req.params;  // Tengo que usar req.params esta en la url el parametro que voy a pasar no en el body
    const deleteNote = await Note.findByIdAndDelete(id);
  
    if (!deleteNote) {
      return res.status(404).json({ error: 'Nota no encontrada' });
    }
    res.status(200).json({ message: 'Nota eliminada', deleteNote });
  } catch (error) {
    res.status(400).json({ error: 'Error al borrar la nota', error });
  }
});

const port = 3001;
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
