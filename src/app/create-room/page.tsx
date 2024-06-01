import { Createroomform } from "./create-room-file";

export default function Createroom(){
  return <div className="container mx-auto flex flex-col gap-8 pt-12 pb-24">
    <h1 className="text-4xl font-bold">Create Room</h1>
    <Createroomform></Createroomform>
  </div>
}