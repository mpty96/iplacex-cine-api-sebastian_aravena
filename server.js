import express, { urlencoded } from 'express'
import cors from 'cors'
import client from './src/common/db.js'
import PeliculaRoutes from './src/pelicula/routes.js'
import ActorRoutes from './src/actor/routes.js'

const PORTS = 3000 || 4000
const app = express()

app.use(express.json())
app.use(urlencoded({ extended: true}))
app.use(cors())

app.use('/api', PeliculaRoutes)
app.use('/api', ActorRoutes)

app.get('/', (req, res) => { return res.status(200).send('Bienvenido al cine Iplacex!')})

await client.connect()
.then(() => {
    console.log('Conectado al clúster')
    app.listen(PORTS, () => {console.log(`Servidor corriendo en http://localhost:${PORTS}`)})

})
.catch(() => {
    console.log('Error al conectarse al clúster de Atlas')

})


