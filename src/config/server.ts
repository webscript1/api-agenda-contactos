import * as dotenv from 'dotenv';
dotenv.config();
import app from '../app'
import db from './db'






const port:number | string= process.env.PORT || 3001
const urlBackend:string= process.env.URL_BACKEND || "localHost"


db().then((event)=>{

    app.listen(port, async () => {
        console.log(`Server   running at ${urlBackend}:${port}`);
       
    })
}).catch((error)=>{
    console.log(error)
})


