import { Actor } from './actor.js';
import { ObjectId } from 'mongodb';
import client from '../common/db.js';

const actorCollection = client.db('cine-db').collection('peliculas')

async function handleInsertActorRequest(req, res) {
    let data = req.body
    let actor = Actor

    actor.idPelicula = data.idPelicula
    actor.nombre = data.nombre
    actor.edad = data.edad
    actor.estaRetirado = data.estaRetirado
    actor.premios = data.premios

    await actorCollection.insertOne(actor)
    .then((data) => {
        if(data === null) return res.status(400).send('Error al guardar registro')

            return res.status(201).send(data)
    })
    .catch((e) => { return res.status(500).send({ error: e})})

}

async function handleGetActoresRequest(req, res) {
    await actorCollection.find({}).toArray()
    .then((data) => { return res.status(200).send(data) })
    .catch((e) => { return res.status(500).send({ error: e})})
    
}

async function handleGetActorByIdRequest(req, res) {
    let id = req.params.id 

    try{
        let oid = ObjectId.createFromHexString(id)
        await actorCollection.findOne({ _id: oid })
        .then((data) => {
            if(data === null) return res.status(404).send(data)

            return res.status(200).send(data)
        })
        .catch((e) => {
            return res.status(500).send({ error: e.code })
        })

    }catch(e){
        return res.status(400).send( 'Id mal formado' )
    }
}

async function handleGetActoresByPeliculaIdRequest(req, res) {
    const { pelicula } = req.params;
  
    if (!ObjectId.isValid(pelicula)) {
      return res.status(400).json({ error: 'ID de película no válido' });
    }
  
    try {
      const db = await connectDB();
      const actores = await db.collection(actorCollection).find({ idPelicula: pelicula }).toArray();
  
      if (actores.length === 0) {
        return res.status(404).json({ error: 'No se encontraron actores para esta película' });
      }
  
      res.status(200).json(actores);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener actores' });
    }
};

export default{
    handleInsertActorRequest,
    handleGetActoresRequest,
    handleGetActorByIdRequest,
    handleGetActoresByPeliculaIdRequest
}