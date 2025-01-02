'use client'
import Navbar from "@/components/Navbar";
import Popup from "@/components/Popup";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function Page(){
    const router = useRouter()
    useEffect(() => {
        const userId = sessionStorage.getItem('userId')
        if (!userId) {
            router.push('/login')
            toast.error('Unauthenticaed')
        }
    },[router])

    const isVerified = sessionStorage.getItem('isVerified')

    return(
        <>
        <Navbar />
        {
            isVerified === 'true' ? (
                <>
                    <div className="mt-14" ></div>
                </>
            ) : (
                <Popup />
            )
        }
        </>
    )
}