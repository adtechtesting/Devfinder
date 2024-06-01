
import Link from "next/link";

import { unstable_noStore } from "next/cache";
import { UserRoomCard } from "./user-room-card";
import { Button } from "@/components/ui/button";
import { getMyRooms } from "@/data-access/rooms";





export default async function Home() {
   unstable_noStore()
   const rooms=await getMyRooms()
   
   return  <main className=" min-h-screen  p-16 sm:p-8 lg:p-16">
    <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
          <h1 className="text-2xl sm:tex-3xl lg:text-4xl mb-4 sm:mb-0">Your Rooms</h1>
      <Button asChild>
         <Link href="/create-room">Create Room</Link></Button>
    </div>
        
     <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {rooms.map((room) => {
          return <UserRoomCard key={room.id} room={room} />;
        })}
      </div>
   </main>
}
