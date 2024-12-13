"use client"
import React from 'react'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import Image from 'next/image'

function Header() {
    const {user}=useKindeBrowserClient();
    return (
        <div className='p-4 shadow-sm border flex justify-between'>
            <div>

            </div>
            <div>
                <Image src="https://lh3.googleusercontent.com/a/ACg8ocKJJUee2JkuCGQbDFGKcRKq-bohrFqZYCeLW8NqxSyVfvz0cw=s96-c" width={35}
                height={35}
                alt='user'
                className='rounded-full' />
            </div>
        </div>
    )
}

export default Header
