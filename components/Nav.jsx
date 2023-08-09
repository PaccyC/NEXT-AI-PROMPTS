"use client"

import Link from "next/link"
import Image from "next/image"
import { useState,useEffect } from "react"
import {signIn,signOut,useSession,
getProviders} from 'next-auth/react'
const Nav = () => {
    const {data:session}=useSession();
    const [providers,setProviders]=useState(null);
    const [toggleDropdown,setToggleDropdown]=useState(false)
    console.log(toggleDropdown);
    useEffect(()=>{
    const setAppProviders= async ()=>{
        const response=await getProviders();

        await setProviders(response);
    }
    setAppProviders();
    },[])


  return (
   <nav className=" flex-between w-full pt-3 mb-16">
    <Link href='/' className="flex gap-2 flex-center">
        <Image 
        src={'/assets/images/logo.svg'}
        alt=""
        width={30}
        height={30}
        className=" object-contain"
        />
        <p  className="logo_text">Promptopia</p>
    </Link>
    {/* DESKTOP NAVIGATION */}
    <div className=" sm:flex hidden">
   {session?.user ? (
    <div className=" flex gap-3 md:gap-5">
     <Link href='/create-prompt' className="black_btn">
        Create Post
     </Link>

     <button type="button" onClick={signOut}
     className="outline_btn"
     >Sign Out</button>
     <Link href='/profile'>
        <Image
        src={session?.user.image}
        width={37}
        height={37}
        />
     </Link>
    </div>
   ):(<>
  { providers && Object.values(providers).map((provider)=>(
  <button type="button"
  key={provider.name}
  className="black_btn"
  onClick={()=>signIn(provider.id)}
  >Sign In</button>
  ))}
   </>)
   }
    </div>
    <div className="sm:hidden flex relative">
        {session?.user ?(
            <div className="flex">
               <Image
        src='/assets/images/logo.svg'
        width={37}
        height={37}
        className="rounded-full"
        onClick={(prev)=>setToggleDropdown(!prev)}
        />
        {toggleDropdown && (
            <div className="dropdown">
                <Link href='/profile' 
                className="dropdown_link"
                onClick={()=>setToggleDropdown(false)}
                >
                  My Profile
                </Link>
            </div>
        )}
            </div>
        ):(<>
            { providers && Object.values(providers).map((provider)=>(
            <button type="button"
            key={provider.name}
            className="black_btn"
            onClick={()=>signIn(provider.id)}
            >Sign In</button>
            ))}
             </>)}
    </div>
   </nav>
  )
}

export default Nav