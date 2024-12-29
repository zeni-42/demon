import Link from "next/link";

export default function Navbar(){
    return(
        <>
        <div className="fixed top-0 w-full h-14 backdrop-blur-3xl border-b border-zinc-800 flex justify-between items-center " >
            <div className="w-1/4 h-full flex justify-center items-center" >
                <h1 className="text-white uppercase font-semibold text-lg" > Academa </h1>
            </div>
            <div className="w-1/3 h-full flex justify-evenly items-center" >
                <Link className="hover:underline" href={'#'}> Instructors </Link>
                <Link className="hover:underline" href={'#'}> About </Link>
                <Link className="flex justify-center items-center w-40 h-full border-x border-t bg-zinc-900 border-zinc-800 " href={"/login"} > 
                    Login 
                </Link>
            </div>
        </div>
        </>
    )
}