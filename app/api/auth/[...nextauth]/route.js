import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google'
import { signIn } from "next-auth/react";
import { connectToDB } from "@/utils/database";
import User from "@/models/user";

console.log({
    clientId:process.env.GOOGLE_ID,
    clientSecret:process.env.GOOGLE_SECRET,
   DB_URI:process.env.MONGODB_URI
});

const handler=NextAuth({
    providers:[
        GoogleProvider({
            clientId:process.env.GOOGLE_ID,
            clientSecret:process.env.GOOGLE_SECRET
        }),
    ],
    callbacks:{

   

    async session ({session}){

        const sessionUser=await User.findOne({email:session.user.email})
        session.user.id= sessionUser._id.toString();
        return session;
    },
    async  signIn({profile}){
    try{
  await connectToDB();
 
  const exists=await User.findOne({email:profile.email});
  if(!exists){
   await User.create({
        email:profile.email,
        username:profile.name.replace(" ","").toLowerCase(),
        image:profile.picture 
    })
  }



  return true;
    }
    catch(err){
 console.log(err);
 return false
    }
    }
}

 
})



export {handler as GET, handler as POST}
