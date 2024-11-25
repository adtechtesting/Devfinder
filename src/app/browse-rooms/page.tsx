import React from 'react';
import Link from "next/link";
import Image from "next/image";
import { unstable_noStore } from "next/cache";

import { Button } from "@/components/ui/button";
import { SearchBar } from "./SearchBar";
import { RoomCard } from "./room-card";
import { getRooms } from "@/data-access/rooms";

export default async function EnhancedRoomBrowser({
  searchParams
}: {
  searchParams: {
    search: string
  }
}) {
  unstable_noStore();
  const rooms = await getRooms(searchParams.search);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
     
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <div 
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-purple-500 to-indigo-600 opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem] animate-pulse"
          style={{
            clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
          }}
        />
      </div>

      <main className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-6xl">
         
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 mb-4 sm:mb-0">
              Find BugFinder Rooms
            </h1>
            <Button 
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:shadow-xl transition-all duration-300 hover:scale-105"
              asChild
            >
              <Link href="/create-room">Create Room</Link>
            </Button>
          </div>

       
          <div className="mb-12">
            <SearchBar />
          </div>

       
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {rooms.map((room: any) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>

         
          {rooms.length === 0 && (
            <div className="flex flex-col gap-6 justify-center items-center mt-24 sm:mt-16 md:mt-12 lg:mt-8">
              <Image 
                src="/no-data.svg" 
                alt="no data image" 
                width="200" 
                height="200" 
                className="w-48 h-48 sm:w-40 sm:h-40 md:w-32 md:h-32 lg:w-28 lg:h-28"
              />
              <h2 className="text-2xl sm:text-xl md:text-lg lg:text-base text-gray-800 dark:text-gray-200">
                No rooms available
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-center max-w-md">
                Be the first to create a collaboration room and start coding together!
              </p>
              <Button 
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:shadow-xl transition-all duration-300 hover:scale-105"
                asChild
              >
                <Link href="/create-room">Create Room</Link>
              </Button>
            </div>
          )}
        </div>

       
        <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
          <div 
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-purple-500 to-indigo-600 opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem] animate-pulse"
            style={{
              clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
            }}
          />
        </div>
      </main>
    </div>
  );
}