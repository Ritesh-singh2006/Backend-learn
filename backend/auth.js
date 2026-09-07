import express from "express";
import cors from "cors";

const app = express();
const port = 5174;

app.use(cors());
app.use(express.json());

app.post('/login',(req,res)=>{
    console.log(req);
})

app.listen(port,()=>{
    console.log(`app listening on port ${port}`);
})