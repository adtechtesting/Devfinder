"use server"

import { deleteRoom, getRoom } from "@/data-access/rooms"
import { getSession } from "@/lib/auth"
import { revalidatePath } from "next/cache"


export async function deleteRoomaction(roomId:string){
    const session=await getSession()
    if(!session){
        throw new Error("user not authentiated")
    }
   const room=await getRoom(roomId)
   
   if(room?.userId !==session.user.id){
        throw new Error("user not authenticated")
     }
    await deleteRoom(roomId)

    revalidatePath("/your-rooms")
}