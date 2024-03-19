import express from "express";
import {expressMiddleware} from "@apollo/server/express4"
import { createApolloGraphQLServer } from "./graphql";

const PORT = Number(process.env.PORT) || 3000


async function init(){

    const app = express();

    app.use(express.json());
    app.use("/graphql",expressMiddleware(await createApolloGraphQLServer()));
    
    app.get("/",(req,res)=>{
        res.send("Server is running");
    })

    app.listen(PORT,()=>{
        console.log(`server runing on PORT:  ${PORT}`);
        
    })


}
init();