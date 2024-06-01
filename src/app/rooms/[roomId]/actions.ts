"use server"


import { getSession } from "@/lib/auth";
import { StreamChat } from "stream-chat";
export async function GenerateToken(){
    const session=await getSession()
     if(!session){
        throw new Error("no session found")
     }
    
  const api_key = process.env.NEXT_PUBLIC_GET_STREAM_API_KEY!;
  const api_secret = process.env.GET_STREAM_SECRET_KEY!;

  const serverclient=StreamChat.getInstance(api_key,api_secret)
  const token=serverclient.createToken(session.user.id)

  return token
}