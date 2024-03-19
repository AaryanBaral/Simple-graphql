import UserService,{ CreateUserPayload } from "../../service/user";

const queries = {
    getUserToken:async(_:any,payload:{email:string,password:string})=>{

        const token  = await UserService.getUserToken({
            email:payload.email,
            password:payload.password
        })
        return token;
    }
}

const mutation =
{
    createUser: async(_:any,
       payload:CreateUserPayload 
    ) =>
        { 
            const result = await UserService.createUser(payload);
            return result.id;
        }
}

export const resolevrs = {queries,mutation};