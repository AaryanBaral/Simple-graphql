import express from "express";
import { ApolloServer } from "@apollo/server";
import {expressMiddleware} from "@apollo/server/express4"
import bodyParser from "body-parser";

const PORT = Number(process.env.PORT) || 3000


async function init(){

    const app = express();

    
    // creating a graphql apollo server
    const gqlServer = new ApolloServer({
        typeDefs:`
            type Query{
                hello:String
                say(name:String):String
            }
        `,
        resolvers:{
            Query:{
                hello:()=>  ("hey there i am a graph ql server"),
                say:(_,{name}:{name:string})=> `hey ${name} how are you!`
            }
        }
    })
    await gqlServer.start();
    app.use(express.json());
    app.use("/graphql",expressMiddleware(gqlServer));
    
    app.get("/",(req,res)=>{
        res.send("Server is running");
    })

    app.listen(PORT,()=>{
        console.log(`server runing on PORT:  ${PORT}`);
        
    })


}
init();