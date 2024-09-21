import express from 'express';
import controller from './peliculaCollection.js'

const PeliculaRoutes = express.Router()

PeliculaRoutes.post('/pelicula', controller.handleInsertPeliculaRequest)
PeliculaRoutes.get('/peliculas', controller.handleGetPeliculasRequest)
PeliculaRoutes.get('/pelicula/:id', controller.handleGetPeliculaByIdRequest)
PeliculaRoutes.put('/pelicula/:id', controller.handleUpdatePeliculaByIdRequest)
PeliculaRoutes.delete('/pelicula/:id', controller.handleDeletePeliculaByIdRequest)

export default PeliculaRoutes