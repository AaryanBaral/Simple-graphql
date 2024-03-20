import UserService,{ CreateUserPayload } from "../../service/user";

const queries = {
    getUserToken:async(_:any,payload:{email:string,password:string})=>{

        const token  = await UserService.getUserToken({
            email:payload.email,
            password:payload.password
        })
        return token;
    },
    getCurrentLoggedInUser:async(_:any,parameters:any,context:any)=>{
        if(context && context.user){
            const user = await UserService.getUserByID(context.user.id);
            return user;
        }
        return "failed";
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