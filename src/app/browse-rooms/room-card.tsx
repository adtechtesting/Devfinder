"use client"
import Link from "next/link"


import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { GithubIcon } from "lucide-react"
import { Splittags, Taglist } from "@/components/tagslist"
import { Button } from "@/components/ui/button"
import {  Room } from "@prisma/client";


function safeString(value: any): string {
    if (typeof value === "string") {
        return value;
    }
    if (value === null || value === undefined) {
        return "";
    }
    return JSON.stringify(value);
}


 export function RoomCard({room}:{room:Room}){
  return (
   <Card>
  <CardHeader>
    <CardTitle>{room.name}</CardTitle>
    <CardDescription>{room.description}</CardDescription>
  </CardHeader>
  <CardContent className="flex flex-col gap-4">
  
      <Taglist tags={Splittags(safeString(room.tags))} />
      
       {room.githubRepo &&( <Link href={room.githubRepo} className="flex items-center gap-2 " target="_blank" rel="noopener noreferrer">
     <GithubIcon></GithubIcon> Githubproject</Link>)}
  </CardContent>
  <CardFooter>
   <Button asChild><Link href={`/rooms/${room.id}`}>Join Room</Link></Button>
  </CardFooter>
</Card>

  )
}