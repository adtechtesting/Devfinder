import { db } from "@/lib/db";


export async function deleteuser(userId:string){
     await db.user.delete({
        where:{
            id:userId,
        }
     })
}