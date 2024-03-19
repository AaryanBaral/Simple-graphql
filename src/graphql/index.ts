import { ApolloServer } from "@apollo/server";
import { prismaClient } from "../lib/db";
import {Users} from "../graphql/user/index"

export async function createApolloGraphQLServer(){
       
    // creating a graphql apollo server
    const gqlServer = new ApolloServer({
        typeDefs:`
            type Query{
                ${Users.queries}
            }
            type Mutation{
                ${Users.mutation}
            }
        `,
        resolvers:{
            Query:{
                ...Users.resolevrs.queries
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