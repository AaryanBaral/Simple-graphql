import { ApolloServer } from "@apollo/server";
import { prismaClient } from "../lib/db";
import {Users} from "../graphql/user/index"

export async function createApolloGraphQLServer(){
       
    // creating a graphql apollo server
    const gqlServer = new ApolloServer({
        typeDefs:`
        ${Users.typedefs}
            type Query{
                ${Users.queries}
                getContext:String
            }
            type Mutation{
                ${Users.mutation}
            }
        `,
        resolvers:{
            Query:{
                ...Users.resolevrs.queries,
                getContext:(_:any,parameter:any,context)=>{
                    console.log(context);
                    return ""
                }
            },
            Mutation:{
                ...Users.resolevrs.mutation
                }
            }
        }
    )
    await gqlServer.start();

    return gqlServer;
}