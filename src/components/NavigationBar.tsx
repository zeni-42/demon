'use client'
import Image from "next/image"
import Link from "next/link"
import pfp from "@/images/GIthub_pfp.jpeg"
import { Bell } from "lucide-react"

export default function NavigationBar(){

    const fullName = sessionStorage.getItem('fullName')

    return (
        <>
        <div className="fixed top-0 w-full h-14 backdrop-blur-3xl border-b border-zinc-800 flex justify-between items-center " >
            <div className="w-1/4 h-full flex justify-center items-center" >
                <h1 className="text-white font-semibold text-xl" > Learnify  </h1>
            </div>
            <div className="w-1/4 h-full flex justify-evenly items-center" > 
                <Link href={'/instructor/home'}> Home </Link>
                <Link href={'#'}> Explore </Link>                
                <Link href={'#'}> Manage </Link>
                <Link href={'#'}> Analytics </Link>
            </div>
            <div className="w-1/4 h-full flex justify-evenly items-center" >
                {
                    fullName ? (
                        <div className="flex gap-5" >
                            <button className="size-10 bg-zinc-900 border border-zinc-800 flex justify-center items-center rounded-full" > <Bell size={20} /> </button>
                            <Link href={'/account'} >
                                <Image alt="demo" className="size-10 rounded-full" src={pfp} />
                            </Link>
                        </div>
                    ) : (
                        <>
                            <Link className="flex justify-center items-center w-40 h-full border-x border-t bg-zinc-900 border-zinc-800 " href={"/login"} > Login </Link>
                        </>
                    )
                }
            </div>
        </div>
        </>
    )
}