import Link from "next/link";

import { GithubIcon } from "lucide-react";

import { Splittags, Taglist } from "@/components/tagslist";
import { Vedioplayer } from "./vedioplayer";
import { unstable_noStore } from "next/cache";
import { getRoom } from "@/data-access/rooms";

function safeString(value: any): string {
    if (typeof value === "string") {
        return value;
    }
    if (value === null || value === undefined) {
        return "";
    }
    return JSON.stringify(value);
}

export default async function Roompage(props: { params: { roomId: string } }) {
     unstable_noStore()
    const roomId = props.params.roomId;
    const room = await getRoom(roomId);

    if (!room) {
        return <div>No room with this ID is found</div>;
    }

    const tags = Splittags(safeString(room.tags));

    return (
        <div className="grid lg:grid-cols-4 grid-cols-1 min-h-screen">
            <div className="col-span-1 lg:col-span-3 p-4 pr-2">
                <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4 min-h-screen ">
                 <Vedioplayer room={room}></Vedioplayer>
                </div>
            </div>

            <div className="col-span-1 p-4 pl-2">
                <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4 flex flex-col gap-4">
                    <h1 className="text-base">{room?.name ?? "No Room Name"}</h1>

                    {room.githubRepo && (
                        <Link
                            href={room.githubRepo}
                            className="flex items-center gap-2 text-center text-sm"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <GithubIcon />
                            GitHub Project
                        </Link>
                    )}

                    <p className="text-base text-gray-600">{room?.description ?? "No Description Available"}</p>

                    <Taglist tags={tags} />
                </div>
            </div>
        </div>
    );
}
