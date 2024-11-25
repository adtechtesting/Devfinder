"use client";

import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GithubIcon } from "lucide-react";
import { Splittags, Taglist } from "@/components/tagslist";
import { Button } from "@/components/ui/button";
import { Room } from "@prisma/client";

function safeString(value: any): string {
  if (typeof value === "string") {
    return value;
  }
  if (value === null || value === undefined) {
    return "";
  }
  return JSON.stringify(value);
}

export function RoomCard({ room }: { room: Room }) {
  return (
    <Card className="relative border border-gray-200 dark:border-gray-800 shadow-md hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold   text-purple-600 to-indigo-600 dark:text-purple-700">
          {room.name}
        </CardTitle>
        <CardDescription className="text-purple-400  mt-2">
          {room.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-wrap gap-2">
          <Taglist tags={Splittags(safeString(room.tags))} />
        </div>
        {room.githubRepo && (
          <Link
            href={room.githubRepo}
            className="flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GithubIcon className="w-5 h-5" />
            <span>GitHub Project</span>
          </Link>
        )}
      </CardContent>
      <CardFooter>
        <Button
          className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-indigo-600 hover:to-purple-600 text-white font-medium"
          asChild
        >
          <Link href={`/rooms/${room.id}`}>Join Room</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
