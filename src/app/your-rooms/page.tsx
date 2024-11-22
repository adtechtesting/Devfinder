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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      {/* Top gradient effect */}
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-purple-500 to-indigo-600 opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem] animate-pulse"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>

      <main className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-6xl">
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 mb-4 sm:mb-0">
              Your Rooms
            </h1>
            <Button
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:shadow-xl transition-all duration-300 hover:scale-105 group"
              asChild
            >
              <Link href="/create-room" className="flex items-center gap-2">
                <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                Create Room
              </Link>
            </Button>
          </div>

          {/* Rooms Grid */}
          {rooms.length > 0 ? (
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 animate-fade-in">
              {rooms.map((room) => (
                <UserRoomCard key={room.id} room={room} />
              ))}
            </div>
          ) : (
            // Empty state
            <div className="flex flex-col items-center justify-center gap-6 mt-24 text-center">
              <div className="relative w-48 h-48">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full opacity-20 animate-pulse" />
                <Image
                  src="/no-data.svg"
                  alt="No rooms"
                  width={200}
                  height={200}
                  className="relative z-10"
                />
              </div>
              <h2 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
                No Rooms Yet
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-md">
                Create your first room to start collaborating with other developers!
              </p>
             
            </div>
          )}
        </div>

        {/* Bottom gradient effect */}
        <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-purple-500 to-indigo-600 opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem] animate-pulse"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
      </main>
    </div>
  );
}