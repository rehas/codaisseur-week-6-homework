import 'reflect-metadata'
import {createKoaServer} from "routing-controllers"
import setupDb from './db'

const port = process.env.PORT || 4000

const app = createKoaServer({
  cors: true,
})

setupDb()
  .then(_=>{
    console.log("Connected to the tictactoe DB successfully")
    app.listen(port, () => console.log('Listening on port 4000'))
  })
  .catch(err=>{
    console.log('Error connecting to db')
    console.log(err);
  })
