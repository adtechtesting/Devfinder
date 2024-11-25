import Link from "next/link";
import { GithubIcon, Video, Users, Code2 } from "lucide-react";
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

export default async function RoomPage(props: { params: { roomId: string } }) {
    unstable_noStore();
    const roomId = props.params.roomId;
    const room = await getRoom(roomId);

    if (!room) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center space-y-4">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Room Not Found
                    </h1>
                    <Link
                        href="/browse-rooms"
                        className="inline-block rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                    >
                        Browse Other Rooms
                    </Link>
                </div>
            </div>
        );
    }

    const tags = Splittags(safeString(room.tags));

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900 relative">
            {/* Background gradient effects */}
            <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
                <div 
                    className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-purple-500 to-indigo-600 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem] animate-pulse"
                    style={{
                        clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
                    }}
                />
            </div>

            <div className="grid lg:grid-cols-4 grid-cols-1 min-h-screen p-6 gap-4 relative">
                <div className="col-span-1 lg:col-span-3">
                    <div className="rounded-xl border bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm shadow-xl p-4 min-h-screen transition-all duration-300 hover:shadow-2xl">
                        <Vedioplayer room={room} />
                    </div>
                </div>

                <div className="col-span-1">
                    <div className="rounded-xl border bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm shadow-xl p-6 flex flex-col gap-6 transition-all duration-300 hover:shadow-2xl">
                        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
                            {room?.name ?? "No Room Name"}
                        </h1>

                        {room.githubRepo && (
                            <Link
                                href={room.githubRepo}
                                className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <GithubIcon className="w-5 h-5" />
                                <span className="text-sm font-medium">GitHub Project</span>
                            </Link>
                        )}

                        <p className="text-gray-600 dark:text-gray-300">
                            {room?.description ?? "No Description Available"}
                        </p>

                        <div className="space-y-4">
                            <h2 className="font-semibold text-gray-900 dark:text-white">Tags</h2>
                            <Taglist 
                                tags={tags} 
                               
                            />
                        </div>

                        <div className="mt-auto pt-4 border-t">
                            <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
                                <div className="flex items-center gap-1">
                                    <Users className="w-4 h-4" />
                                    <span>Active Users</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Code2 className="w-4 h-4" />
                                    <span>Live Coding</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom gradient effect */}
            <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
                <div 
                    className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-purple-500 to-indigo-600 opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem] animate-pulse"
                    style={{
                        clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
                    }}
                />
            </div>
        </div>
    );
}