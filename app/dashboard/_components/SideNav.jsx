"use client";
import React, { useEffect } from 'react'
import Image from 'next/image'
import { GraduationCap, Hand, LayoutIcon, Settings } from "lucide-react";
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

function SideNav() {
    
    const {user}=useKindeBrowserClient();

    const getInitial = () => {
      if (user?.picture?.includes('d=blank')) {
        return user?.given_name?.charAt(0).toUpperCase() || "?";
      }
      return user?.picture || user?.given_name?.charAt(0).toUpperCase() || "?";
    };
    const menuList = [
        {
          id: 1,
          name: "Dashboard",
          icon: LayoutIcon,
          path: "/dashboard",
        },
        {
          id: 2,
          name: "Students",
          icon: GraduationCap,
          path: "/dashboard/students",
        },
        {
          id: 3,
          name: "Attendance",
          icon: Hand,
          path: "/dashboard/attendance",
        },
        {
          id: 4,
          name: "Settings",
          icon: Settings,
          path: "/dashboard/settings",
        },
      ];
    
    const path=usePathname();
    useEffect(()=>{
        console.log(path)
    },[path])
    return (
        <div className="border shadow-md h-screen p-5">
            <div className="logo flex items-center w-full h-20">
                <Image 
                    src="/logo.svg" 
                    width={50} 
                    height={50} 
                    alt="logo" 
                    className="w-12 h-12 object-contain"
                />
                <h2 className="logo-title text-blue-600 font-bold text-xl ml-3">
                    Class Check
                </h2>
            </div>
            
            <hr className='my-5'></hr>

            {menuList.map((menu,index)=>(
                <Link href={menu.path} key={menu.id}>
                    <h2 key={menu.id} className={`flex items-center gap-3 text-md p-4 text-slate-500 hover:bg-primary hover:text-white cursor-pointer rounded-lg my-2 ${path==menu.path&&'bg-primary text-white'}`}>
                        <menu.icon/>
                        {menu.name}
                    </h2>
                </Link>
            ))}

<div className="flex gap-2 items-center bottom-5 fixed py-4">
        {user?.picture && !user.picture.includes('d=blank') ? (
          <Image
            src={user.picture}
            width={35}
            height={35}
            alt="user"
            className="rounded-full"
          />
        ) : (
          <div className="flex items-center justify-center w-9 h-9 bg-gray-300 text-gray-800 rounded-full font-bold">
            {getInitial()}
          </div>
        )}
                <div>
                    <h2 className='text-sm font-bold'>{user?.given_name} {user?.family_name}</h2>
                    <h2 className='text-xs text-slate-400 break-words'>{user?.email}</h2>
                </div>
            </div>
        </div>
    )
}

export default SideNav
