"use client"
import React, { useEffect } from 'react'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  

function Header() {
    const {user}=useKindeBrowserClient();

    const getInitial = () => {
        return user?.given_name?.charAt(0).toUpperCase() || "?";
    };

    return (
        <div className='p-4 shadow-sm border flex justify-between'>
            <div>

            </div>
            <div className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-300 text-gray-800 font-bold">
                {user?.picture ? (
                    <img
                        src={user.picture}
                        alt="User"
                        className="rounded-full w-full h-full object-cover"
                    />
                ) : (
                    <span>{getInitial()}</span>
                )}
            </div>
        </div>
    )
}

export default Header
