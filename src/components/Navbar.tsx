'use client'
import Link from "next/link";
import pfp from "@/images/GIthub_pfp.jpeg"
import Image from "next/image";

export default function Navbar(){
    const fullName = sessionStorage.getItem('fullName')
    return(
        <>
        <div className="fixed top-0 w-full h-14 backdrop-blur-3xl border-b border-zinc-800 flex justify-between items-center " >
            <div className="w-1/4 h-full flex justify-center items-center" >
                <h1 className="text-white font-semibold text-xl" > Learnify  </h1>
            </div>
            <div className="w-1/3 h-full flex justify-evenly items-center" >
                <Link className="hover:underline" href={'#'} > Courses</Link>
                <Link className="hover:underline" href={'#'} > Blog </Link>
                <Link className="hover:underline" href={'#'} > Support </Link>
                {
                    fullName ? (
                        <div>
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