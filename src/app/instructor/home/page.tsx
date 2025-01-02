'use client'
import NavigationBar from "@/components/NavigationBar";
import Popup from "@/components/Popup";
import { Upload } from "lucide-react";
import Link from "next/link";

export default function Page(){

    const isVerfied = sessionStorage.getItem('isVerified')
    const fullName = sessionStorage.getItem('fullName')

    return(
        <>
        <NavigationBar />
        {
            isVerfied === 'true' ? (
                <>
                <div className="mt-14" ></div>
                </>
            ) : (
                <Popup />
            ) 
        }
        <div className="h-24 flex px-40 justify-between items-center ">
            <div>                
                <h1 className="text-2xl font-semibold" >
                    Welcome {`${fullName}`} 
                </h1>
                <p className="text-zinc-500" >have somthing in your mind ?</p>
            </div>
            <div>
                <Link href={'/instructor/upload'} className="w-40 h-14 rounded-full border border-zinc-800 bg-zinc-900 flex justify-center items-center gap-2 " >
                    <Upload/> Upload
                </Link>
            </div>
        </div>
        <div className="w-full h-[70vh] mt-5 px-40 " >
            <div className="w-1/2 h-full px-10 py-6  bg-zinc-900 border border-zinc-800 rounded-xl " >
                <h1 className="text-xl" >Your recent videos</h1>
                <p>Video 1</p>
                <p>Video 2</p>
            </div>
            <div></div>
        </div>
        </>
    )
}