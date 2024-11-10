const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Conectado a mongo"))
  .catch((error) => console.error("Error en la conexión a mongo", error));

app.use(cors());
app.use(express.json());

app.post('/', (req, res) => {
  console.log('Recibida solicitud POST');
  res.send('POST recibido');
});


app.get('/', (req, res) => {
  console.log('Recibida solicitud GET');
  res.send('GET recibido');
});

app.put('/:id', (req, res) => {
  console.log(`Recibida solicitud PUT para el ID: ${req.params.id}`);
  res.send(`PUT recibido para el ID: ${req.params.id}`);
});


app.delete('/:id', (req, res) => {
  console.log(`Recibida solicitud DELETE para el ID: ${req.params.id}`);
  res.send(`DELETE recibido para el ID: ${req.params.id}`);
});

const port = 3001;
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
