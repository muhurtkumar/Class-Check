"use client";
import React from "react";
import { LogoutLink, useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@radix-ui/react-dialog";

function Header() {
  const { user } = useKindeBrowserClient();
  console.log(user);

  const getInitial = () => {
    if (user?.picture?.includes('d=blank')) {
      return user?.given_name?.charAt(0).toUpperCase() || "?";
    }
    return user?.picture || user?.given_name?.charAt(0).toUpperCase() || "?";
  };

  return (
    <div className="p-4 shadow-sm border flex justify-between">
      <div className="flex items-center">
        <h2 className="text-m font-bold">Welcome, {user?.given_name} {user?.family_name}</h2>
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <div className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-300 text-gray-800 font-bold cursor-pointer">
            {user?.picture && !user.picture.includes('d=blank') ? (
              <img
                src={user.picture}
                alt="User"
                className="rounded-full w-full h-full object-cover"
              />
            ) : (
              <span>{getInitial()}</span>
            )}
          </div>
        </DialogTrigger>
        <DialogContent className="">
          <DialogHeader>
            <div className="py-3">
              <DialogTitle>You are about to log out</DialogTitle>
              <DialogDescription className="py-3">
                Click the log out button to log out, or click Cancel to continue browsing
              </DialogDescription>
            </div>
            <div className="flex gap-3 items-center justify-end mt-5">
              <DialogClose asChild>
                <Button variant="ghost">Cancel</Button>
              </DialogClose>
              <Button asChild variant="destructive">
                <LogoutLink postLogoutRedirectURL="https://class-check-eight.vercel.app">Log out</LogoutLink>
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Header;
