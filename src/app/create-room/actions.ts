"use server"
import { getSession } from "@/lib/auth";
import { Prisma, PrismaClient, Room } from "@prisma/client";


import { revalidatePath } from "next/cache";

export async function Creatroomaction(RoomData: Omit<Room, "id" | "userId">) {
   const prisma=new PrismaClient()
  const session = await getSession();
 

  if (!session) {
    throw new Error("You must be logged in to create the room");
  }

  await prisma.room.create({
    data: {
      ...RoomData,
      userId: session.user.id,
        name: RoomData.name,
      description: RoomData.description,
      tags: RoomData.tags as Prisma.InputJsonValue,
      githubRepo: RoomData.githubRepo
    }
  });
  revalidatePath("/browse-rooms")
 

}
