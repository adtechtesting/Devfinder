"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Room } from "@prisma/client"
import { GithubIcon, TrashIcon, PencilIcon } from "lucide-react"
import { Splittags, Taglist } from "@/components/tagslist";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { deleteRoomaction } from "./actions"
import Link from "next/link";

function safeString(value: any): string {
    if (typeof value === "string") {
        return value;
    }
    if (value === null || value === undefined) {
        return "";
    }
    return JSON.stringify(value);
}

export function UserRoomCard({room}:{room:Room}){
  return (
   <Card className="relative border border-gray-200 dark:border-gray-800 shadow-md hover:shadow-lg transition-shadow duration-300 ">

    <CardHeader className="relative pb-2">
      <CardTitle className="text-2xl font-semibold   text-purple-600 to-indigo-600 dark:text-purple-700">
        {room.name}
      </CardTitle>
      <CardDescription className="text-purple-400  mt-2">
        {room.description}
      </CardDescription>
    </CardHeader>
    <CardContent className="flex flex-col gap-4 pt-4">
      <Taglist tags={Splittags(safeString(room.tags))} />
      
      {room.githubRepo && (
        <Link 
          href={room.githubRepo} 
          className="flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:underline" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          <GithubIcon className=" transition-transform" /> 
          GitHub Project
        </Link>
      )}
    </CardContent>
    <CardFooter className="flex gap-2 pt-4">
      <Button 
        className="bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 
        text-white hover:scale-105 transition-all duration-300"
        asChild
      >
        <Link href={`/rooms/${room.id}`}>Join Room</Link>
      </Button>
   
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button 
            variant="destructive" 
            className="hover:bg-red-600 hover:scale-105 transition-all duration-300"
          >
            <TrashIcon className="w-4 h-4 mr-2" /> Delete Room
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="bg-white dark:bg-gray-900 rounded-xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-purple-700 dark:text-purple-400">
              Are you absolutely sure?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-600 dark:text-gray-300">
              This action cannot be undone. This will permanently delete your room
              and any data associated with the room.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="hover:bg-gray-100 dark:hover:bg-gray-800">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction 
              className="bg-red-600 hover:bg-red-700"
              onClick={() => deleteRoomaction(room.id)}
            >
              Yes, Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </CardFooter>
  </Card>
  )
}