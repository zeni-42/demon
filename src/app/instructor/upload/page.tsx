'use client'
import NavigationBar from "@/components/NavigationBar";
import Popup from "@/components/Popup";
import { Button } from "@/components/ui/button";
import { DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenu, DropdownMenuTrigger, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

export default function Page(){
    const isVerified = sessionStorage.getItem('isVerified')

    return(
        <>
        <NavigationBar />
        {
            isVerified === 'true' ? (
                <div className="mt-14" ></div>
            ) : (
                <Popup />
            )
        }
        <div className="w-full px-40 py-10" >
            <h1 className="text-2xl font-semibold ">Upload your videos</h1>
            <div className="bg-zinc-950 border border-zinc-800 rounded-xl mt-10 w-full flex justify-center items-center h-full">
                <form className="px-10 w-full h-[50vh] my-10 flex justify-center items-center flex-row-reverse gap-10" action="">
                <div className="w-1/2 h-full flex justify-between items-center flex-col" >
                    <div className="w-full h-1/6 flex justify-center items-start flex-col gap-2 " >
                        <label> Select video file: </label>
                        <Input type="file" className="h-14 flex justify-center items-center"  placeholder="Select video file" />
                    </div>
                    <div className="w-full h-1/6 flex justify-center items-start flex-col gap-2 " >
                        <label> Select thumbnail: </label>
                        <Input type="file" className="h-14 flex justify-center items-center"  placeholder="Select video file" />
                    </div>
                    <div className="w-full h-2/6 flex justify-start items-center flex-col text-zinc-600 " >
                        <p>Make sure provide correct title, video & thumbnail, as thay are not editable</p>
                        <p>You can edit video description, course and visiblity of videos later</p>
                    </div>
                    <div className="w-full h-1/6 flex items-center justify-end" >
                        <Button className="w-1/3" > Share </Button>
                    </div>
                </div>
                <div className="w-1/2 h-full flex justify-start items-start flex-col gap-5 ">
                    <Input className="h-14 " type="Text" placeholder="Title" />
                    <Textarea className="w-full h-60" placeholder="Enter video description" />
                    <DropdownMenu>
                        <DropdownMenuTrigger className="w-full h-14 rounded-lg border border-zinc-800" >  Select a Course </DropdownMenuTrigger>
                        <DropdownMenuContent >
                        <DropdownMenuLabel> Your courses </DropdownMenuLabel>
                        <DropdownMenuSeparator/>
                        <DropdownMenuItem>Course 1</DropdownMenuItem>
                        <DropdownMenuItem>Course 2</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <div className="w-full h-14 flex justify-between items-center" >
                        <div className="flex gap-2 justify-center items-center" > 
                            Private video
                            <p className="text-sm text-zinc-600" >
                                {`( If enabled, only you can view this )`} 
                            </p>
                        </div>
                        <Switch />
                    </div>
                </div>
                </form>
            </div>
        </div>
        </>
    )
}