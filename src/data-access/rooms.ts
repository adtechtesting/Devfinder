import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";






export async function getRooms(search: string|undefined) {
  const whereClause = search
    ? {
        tags: {
         
          array_contains: [search]
        },
      }
    : {};

  const rooms = await db.room.findMany({
    where: whereClause,
  });

  return rooms;
}





export async function getRoom(roomId:string){

    return await db.room.findFirst({
        where:{
            id:roomId
        }
    })
   
}

export async function getMyRooms(){
  const session=await getSession()
  if(!session){
    throw new Error("user not authenticated")
  }
  const rooms=await db.room.findMany({
    where:{
      userId:session.user.id
    }
  })
  return rooms
}
export async function deleteRoom(roomId:string){
     await db.room.deleteMany({
      where:{
        id:{
          equals:roomId
        }
      }
     })
}