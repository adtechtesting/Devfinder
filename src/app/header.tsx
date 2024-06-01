"use client"
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
 
} from "@/components/ui/alert-dialog"
import { DeleteIcon, LogInIcon, LogOutIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { deleteaccountaction } from "./actions";

function Accountdropdown(){
    const session=useSession()
    const [open,setopen]=useState(false)
   return (
    <>
        <AlertDialog open={open} onOpenChange={setopen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently remove your
              account and any data your have.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                await deleteaccountaction();
                signOut({ callbackUrl: "/" });
              }}
            >
              Yes, delete my account
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
     <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"link"} className="flex items-center gap-2">
            <Avatar className="mr-2">
              <AvatarImage src={session.data?.user?.image ?? ""} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>

           <span className="hidden sm:inline"> {session.data?.user?.name}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            onClick={() =>
              signOut({
                callbackUrl: "/",
              })
            }
          >
            <LogOutIcon className="mr-2" /> Sign Out
          </DropdownMenuItem>
           <DropdownMenuSeparator></DropdownMenuSeparator>
          <DropdownMenuItem onClick={()=>{
            setopen(true)
          }}>
          <DeleteIcon className="mr-2"></DeleteIcon>Delete account
          </DropdownMenuItem>
        
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}



export function Header(){
     const session=useSession()
    const isLoggedIn=!!session.data

    return <header className="bg-gray-100 container mx-auto dark:bg-gray-900 py-2 px-4 sm:px-6 lg:px-8 z-10 relative">
        
        <div className="flex justify-between items-center">
         <Link href="/" className="flex gap-2 items-center text-xl hover:underline">
                 <Image src="/icon.png" width="60" height="60" alt="the application icon of magnifiying glass" className="w-10 h-10 sm:w-12 sm:h-12"></Image>   <span className="hidden sm:inline">Bugfinder</span>
            </Link>
               <nav className="flex gap-4 sm:gap-8">
                {isLoggedIn&&( 
                <>
                <Link href="/browse-rooms" className="hover:underline">Browse Rooms</Link>
                 <Link href="/your-rooms" className="hover:underline">Your Rooms</Link>
                </>
                )}
               </nav>
           
              <div className="flex items-center gap-4">
     
    
     {isLoggedIn&& <Accountdropdown></Accountdropdown>}
      {!isLoggedIn &&(
        <Button onClick={()=>signIn()} variant="link"  >
         <LogInIcon className="mr-2"></LogInIcon> Sign in
        </Button>
      )}

    <ModeToggle></ModeToggle>
        </div>
        </div>
    </header>

}