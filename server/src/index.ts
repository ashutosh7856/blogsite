import express from "express"
import cors from "cors"
import Approuter from "./router/index.js"

const app = express()
const PORT = 3000
app.use(express.json())
app.use(cors())

app.use('/api/v1', Approuter)


app.listen(PORT, ()=>{
    console.log("Server started at: ", PORT)
})