import React from "react";
import Link from "next/link";
import Image from "next/image";
import { unstable_noStore } from "next/cache";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserRoomCard } from "./user-room-card";
import { getMyRooms } from "@/data-access/rooms";

export default async function Home() {
  unstable_noStore();
  const rooms = await getMyRooms();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 overflow-x-hidden relative">
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-indigo-500/10 animate-gradient-slow opacity-50 -z-20" />

      {/* Dynamic Blob Backgrounds */}
      <div className="absolute -top-40 -left-20 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-3xl animate-blob opacity-30 -z-10" />
      <div className="absolute -bottom-40 -right-20 w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-3xl animate-blob-reverse opacity-30 -z-10" />

      <main className="relative px-6 pt-14 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-12 relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-transparent to-indigo-500/10 blur-xl -z-10 group-hover:opacity-50 transition-opacity duration-500" />
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 mb-4 sm:mb-0 animate-gradient-text">
            Your Rooms
          </h1>
          
          <Button
            className="bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 
            text-white hover:shadow-xl hover:shadow-purple-500/30 
            transition-all duration-300 transform hover:scale-105 
            group animate-gradient-button"
            asChild
          >
            <Link href="/create-room" className="flex items-center gap-2">
              <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
              Create Room
            </Link>
          </Button>
        </div>

        <div className="relative">
          {rooms.length > 0 ? (
            <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 
           p-4  
            rounded-2xl  ">
              {rooms.map((room) => (
                <div key={room.id} >
                  <UserRoomCard room={room} />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-8 mt-24 text-center 
              backdrop-blur-lg rounded-2xl p-12 
            shadow-2xl ">
              <div className="relative w-56 h-56 group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-indigo-500 to-purple-500 
                rounded-full opacity-20 animate-ping group-hover:opacity-40 transition-opacity" />
                <Image
                  src="/no-data.svg"
                  alt="No rooms"
                  width={250}
                  height={250}
                  className="relative z-10 group-hover:scale-110 transition-transform"
                />
              </div>
              <h2 className="text-3xl font-bold bg-clip-text text-transparent 
              bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 
              animate-gradient-text">
                No Rooms Yet
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-md">
                Create your first room to start collaborating with other developers!
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}