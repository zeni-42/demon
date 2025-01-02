'use client'
import Image from "next/image"
import background from '@/images/background.jpg'
import { ArrowUpRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useForm } from "react-hook-form"
import axios from "axios"
import toast from "react-hot-toast"

export default function Page(){
    const { register, handleSubmit, reset } = useForm()

    const onSubmit = async (data: object) => {
        try {
            const res = await axios.post("/api/user/register", { ...data })
            if (res.status === 200 ) {
                console.log(res);
                toast.success("User registed")
                reset()
            } 
            else {
                console.log(res);
                const extractText: string = res?.data?.message
                toast.error(extractText)
            }
        } catch (error: unknown) {
            const errorMessage = axios.isAxiosError(error) ? error.response?.data?.message || error.message: "Somthing went wrong";
            toast.error(errorMessage)
        }
    }

    return(
        <main>  
        <div className="w-full h-screen flex " >
            <div className="w-1/2 h-full ">
                <h1 className="absolute p-10 font-semibold text-xl" >Learnify</h1>
                <a href="mailto:mailzeni42@gmial.com" className="absolute bottom-0 p-10 flex justify-center items-center underline"> contact <ArrowUpRight size={20} /> </a>
                <Image alt="background" src={background} className="w-full h-full object-cover rounded-r-lg"/>
            </div>
            <div className="w-1/2 h-full p-10">
                <div className="w-full h-20 flex justify-end">
                    <Link href={'/login'} className="w-40 h-12" >Login</Link>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="w-full h-5/6 flex justify-center items-center flex-col" action="">
                    <div className="w-1/2 flex justify-center items-start flex-col gap-2">
                        <h1 className="text-2xl font-bold">Create an account</h1>
                        <p className="text-sm text-zinc-500">Enter your details to create an account</p>
                    </div>
                    <div className="w-1/2 h-1/2 flex justify-start items-center gap-5 pt-5 flex-col">
                        <Input {...register("fullName", {required: true})} autoComplete="off" className="w-full h-14 px-7" type="name" placeholder="Name" />
                        <Input {...register("email", {required: true})} autoComplete="off" className="w-full h-14 px-7" type="email" placeholder="Email" />
                        <Input {...register("password", {required: true})} autoComplete="off" className="w-full h-14 px-7" type="password" placeholder="Password" />
                        <Button type="submit" className="w-full h-12 text-white hover:text-white bg-orange-500 hover:bg-orange-600" > Submit </Button>
                        <div className="text-zinc-500" >By creating account you agree to our <Link className="underline" href={'#'}>Terms & Conditions</Link></div>
                    </div>
                </form>
            </div>
        </div>
        </main>
    )
}