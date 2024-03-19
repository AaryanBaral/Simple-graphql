import { prismaClient } from "../lib/db";
import {createHmac,randomBytes} from "node:crypto";
import JWT from "jsonwebtoken";

const JWT_SECRET = "@#%ASASDV#$%@#$FHSFGHSFD";

export interface CreateUserPayload{
    firstName:string,
    lastName?:string,
    email:string,
    password:string
}
export interface UserTokenPayload{
    email:string,
    password:string
}

class UserService{

    private static  hashPasssword(salt:string,password:string){
        const hashedPassword =createHmac('sha256',salt)
        .update(password)
        .digest('hex');
        return hashedPassword;

    }

    public static async getUserByEmail(email:string){
        return await prismaClient.user.findUnique({where:{email}})
    }
    public static async getUserToken(payload:UserTokenPayload){
        const {email,password} = payload;
        const user = await UserService.getUserByEmail(email);
        if(!user) throw new Error("user Not found");
        const salt = user.salt;
        const userHashPassword = UserService.hashPasssword(salt,password);
        if (user.password!==userHashPassword) throw new Error("Incorrect Crendentials");
        const token = JWT.sign({id:user.id,email:user.email},JWT_SECRET);
        return token;

    }
    public static async createUser(payload:CreateUserPayload){
        const {firstName,lastName,email,password} = payload;
        const salt = randomBytes(32).toString('hex');
        const hashedPassword = UserService.hashPasssword(salt,password);
        return prismaClient.user.create({
            data:{
                firstName,
                lastName,
                password:hashedPassword,
                email,
                salt
            }
        })
    }
}

export default UserService