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
import { GithubIcon, TrashIcon ,PencilIcon} from "lucide-react"
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
   <Card>
  <CardHeader className="relative">
    <CardTitle>{room.name}</CardTitle>
    <CardDescription>{room.description}</CardDescription>
  </CardHeader>
  <CardContent className="flex flex-col gap-4">
  
      <Taglist tags={Splittags(safeString(room.tags))} />
      
       {room.githubRepo &&( <Link href={room.githubRepo} className="flex items-center gap-2 " target="_blank" rel="noopener noreferrer">
     <GithubIcon></GithubIcon> Githubproject</Link>)}
  </CardContent>
  <CardFooter className="flex gap-2">
   <Button asChild><Link href={`/rooms/${room.id}`}>Join Room</Link></Button>
   
  
   <AlertDialog>
     <AlertDialogTrigger asChild>
            <Button variant={"destructive"}>
              <TrashIcon className="w-4 h-4 mr-2" /> Delete Room
            </Button>
          </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete your room
        and any data associate with the room.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction  onClick={()=>{
        deleteRoomaction(room.id)
      }}>Yes,Delete</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>

  </CardFooter>
</Card>

  )
}