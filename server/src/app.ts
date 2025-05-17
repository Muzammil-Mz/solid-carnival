import express, {Application,Request,Response} from "express",
import config from "config"
import { StatusCodes } from "http-status-codes"
import "./utils/dbConnect"

const app:Application=express()
const PORT=config.get("PORT")

app.use(express.json())


app.get("/",(req:Request,res:Response)=>{
    res.status(StatusCodes.OK).json({msg:"hewllo world"})
})


app.listen(PORT,()=>{
    console.log(`server is up and running ${PORT}`);
})