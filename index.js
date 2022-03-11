const express = require('express');
const app = express();
const {
  getCurso,
  postCurso,
  editCurso,
  deleteCurso,
} = require('./database/db');

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 1. Crear una ruta POST /curso que reciba un payload desde el cliente con los datos de un nuevo curso y los ingrese a la tabla cursos.
app.post('/curso', async (req, res) => {
  const { nombre, nivelTecnico, fechaInicio, duracion } = req.body;
  const response = await postCurso(nombre, nivelTecnico, fechaInicio, duracion);
  return res.status(201).json(response);
});

// 2. Crear una ruta GET /cursos que consulte y devuelva los registros almacenados en la tabla cursos
app.get('/cursos', async (req, res) => {
  const response = await getCurso();
  return res.json(response);
});

//3. Crear una ruta PUT /curso que reciba un payload desde el cliente con los datos de un curso ya existente y actualice su registro en la tabla cursos.
app.put('/curso', async (req, res) => {
  const { id, nombre, nivelTecnico, fechaInicio, duracion } = req.body;
  const response = await editCurso(
    id,
    nombre,
    nivelTecnico,
    fechaInicio,
    duracion
  );
  if (response.length === 0) {
    return res
      .status(404)
      .json({ message: `No hay ningun registro con id ${id}` });
  }
  return res.json(response);
});

//4. Crear una ruta DELETE /cursos que reciba el id de un curso como parámetro de la ruta y elimine el registro relacionado en la tabla cursos
app.delete('/curso/:nombre', async (req, res) => {
  const { nombre } = req.params;
  const response = await deleteCurso(nombre);
  if (response.length === 0) {
    return res
      .status(404)
      .json({ message: `No hay ningun registro con id ${id}` });
  }
  return res.json(response);
});

app.listen(3000, () => console.log('Server ON'));
