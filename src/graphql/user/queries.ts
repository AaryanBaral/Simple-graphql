export const queries = `#graphql
    getUserToken(email:String,password:String):String
    getCurrentLoggedInUser(token:String):User
 `