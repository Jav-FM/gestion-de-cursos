const { Pool } = require('pg');
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  password: 'postgres',
  database: 'cursos',
  post: 5432,
});

const postCurso = async (nombre, nivelTecnico, fechaInicio, duracion) => {
  const client = await pool.connect();
  const postQuery = {
    text: `INSERT INTO cursos (nombre, nivel, fecha, duracion) values ($1, $2, $3, $4) RETURNING *`,
    values: [nombre, nivelTecnico, fechaInicio, duracion],
  };
  try {
    const response = await client.query(postQuery);
    return response.rows;
  } catch (e) {
    return e;
  } finally {
    client.release();
  }
};

const getCurso = async () => {
  const client = await pool.connect();
  try {
    const response = await client.query('SELECT * FROM cursos');
    return response.rows;
  } catch (e) {
    return e;
  } finally {
    client.release();
  }
};

const editCurso = async (id, nombre, nivelTecnico, fechaInicio, duracion) => {
  const client = await pool.connect();
  const editQuery = {
    text: `UPDATE cursos SET nombre = $2, nivel = $3, fecha = $4, duracion = $5 WHERE id = $1 RETURNING *`,
    values: [id, nombre, nivelTecnico, fechaInicio, duracion],
  };
  try {
    const response = await client.query(editQuery);
    return response.rows;
  } catch (e) {
    return e;
  } finally {
    client.release();
  }
};

const deleteCurso = async (id) => {
  const client = await pool.connect();
  const deleteQuery = {
    text: `DELETE FROM cursos WHERE id = $1 RETURNING *`,
    values: [id],
  };
  try {
    const response = await client.query(deleteQuery);
    return response.rows;
  } catch (e) {
    return e;
  } finally {
    client.release();
  }
};

module.exports = { getCurso, postCurso, editCurso, deleteCurso };
