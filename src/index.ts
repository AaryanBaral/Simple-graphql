import express from "express";
import {expressMiddleware} from "@apollo/server/express4"
import { createApolloGraphQLServer } from "./graphql";
import UserService from "./service/user";

const PORT = Number(process.env.PORT) || 3000


async function init(){

    const app = express();

    app.use(express.json());
    app.use("/graphql"
    ,expressMiddleware(await createApolloGraphQLServer(),
    {context: async ({req})=>{
        const token = req.headers["token"];
        try {
        const user = UserService.decodeToken(token as string);
        return {user}
       } catch (err) {
           return {}
       }
    }}
    ));
    
    app.get("/",(req,res)=>{
        res.send("Server is running");
    })

    app.listen(PORT,()=>{
        console.log(`server runing on PORT:  ${PORT}`);
        
    })


}
init();