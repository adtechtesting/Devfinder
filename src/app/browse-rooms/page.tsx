import Link from "next/link"


import { unstable_noStore } from "next/cache"

import Image from "next/image"
import { getRooms } from "@/data-access/rooms"
import { SearchBar } from "./SearchBar"
import { Button } from "@/components/ui/button"
import { RoomCard } from "./room-card"








export default async function Home({searchParams}:{
  searchParams:{
    search:string
  }
}) {
  unstable_noStore()
   const rooms=await getRooms(searchParams.search)
   
   return  <main className=" min-h-screen  p-16 sm:p-8 lg:p-16">
    <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
          <h1 className="text-2xl sm:tex-3xl lg:text-4xl mb-4 sm:mb-0">Find BugFinder Rooms</h1>
      <Button asChild>
         <Link href="/create-room">Create Room</Link></Button>
    </div>
        <div className="mb-12">
          <SearchBar></SearchBar>
        </div>
     <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {rooms.map((room) => {
          return <RoomCard key={room.id} room={room} />;
        })}
      </div>
      {
        rooms.length===0 &&(
         <div className="flex flex-col gap-4 justify-center items-center mt-24 sm:mt-16 md:mt-12 lg:mt-8">
  <Image src="/no-data.svg" alt="no data image" width="200" height="200" className="w-48 h-48 sm:w-40 sm:h-40 md:w-32 md:h-32 lg:w-28 lg:h-28" />
  <h2 className="text-2xl sm:text-xl md:text-lg lg:text-base">No rooms yet</h2>
  <Button asChild>
    <Link href="/create-room">Create Room</Link>
  </Button>
</div>

        )
      }
   </main>
}
