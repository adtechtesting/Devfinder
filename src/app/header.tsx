"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Code2, Users, LogInIcon, LogOutIcon, DeleteIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { deleteaccountaction } from "./actions";

function AccountDropdown() {
  const session = useSession();
  const [open, setOpen] = useState(false);

  return (
    <>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg border border-purple-500/20">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently remove your
              account and any data you have.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700"
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
          <Button
            variant="ghost"
            className="relative group flex items-center gap-2 hover:bg-white/10 dark:hover:bg-gray-800/50 transition-all duration-300"
          >
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <Avatar className="h-8 w-8 ring-2 ring-purple-500/20 transition-all duration-300 group-hover:ring-purple-500/40">
              <AvatarImage src={session.data?.user?.image ?? ""} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <span className="hidden sm:inline font-semibold text-gray-900 dark:text-white">
              {session.data?.user?.name}
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg border border-purple-500/20">
          <DropdownMenuItem
            onClick={() => signOut({ callbackUrl: "/" })}
            className="text-gray-700 dark:text-gray-200 hover:bg-purple-500/10 transition-colors duration-200"
          >
            <LogOutIcon className="mr-2 h-4 w-4" /> Sign Out
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-purple-500/20" />
          <DropdownMenuItem
            onClick={() => setOpen(true)}
            className="text-red-600 dark:text-red-400 hover:bg-red-500/10 transition-colors duration-200"
          >
            <DeleteIcon className="mr-2 h-4 w-4" /> Delete account
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

export function Header() {
  const session = useSession();
  const isLoggedIn = !!session.data;

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-lg">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-indigo-500/5 opacity-80 pointer-events-none" />
      <div className="container mx-auto relative">
        <div className="flex h-16 items-center px-4">
          <Link href="/" className="flex items-center gap-3 mr-8 group">
            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg opacity-20 group-hover:opacity-30 blur transition-opacity duration-300" />
            </div>
            <span className="hidden sm:inline text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
              Devfinder
            </span>
          </Link>

          <nav className="flex gap-8 flex-1">
            {isLoggedIn && (
              <>
                <Link
                  href="/browse-rooms"
                  className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300"
                >
                  <Users className="h-4 w-4" />
                  Browse Rooms
                </Link>
                <Link
                  href="/your-rooms"
                  className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300"
                >
                  <Code2 className="h-4 w-4" />
                  Your Rooms
                </Link>
              </>
            )}
          </nav>

          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <AccountDropdown />
            ) : (
              <Button
                onClick={() => signIn()}
                className="relative group overflow-hidden rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-2 transition-all duration-300 hover:scale-105"
              >
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                <LogInIcon className="mr-2 h-4 w-4" /> Sign in
              </Button>
            )}
            <ModeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
