import { LucideUserCircle2 } from "lucide-react";

export default function Profile(){
    return <div className="w-full py-5 px-40">

        <div className="flex flex-col gap-4 justify-center items-center py-4 px-4 ">
            <LucideUserCircle2 className="rounded-full h-32 w-32"/>

            <div className="flex flex-col">
                <h1 className="text-[#121717] text-[22px] font-bold">Ashtosh Kuamr</h1>
                <p className="flex flex-col items-center justify-center text-[16px] font-normal text-[#617D8A]">Joined 2025   <span>I am a fuckin idiot</span></p>
            </div>


            <div>
             <button className="w-[448px] rounded-[8px] px-4 text-[#121717] text-[14px] font-bold h-10 bg-[#F0F2F5]">
                    Edit Profile
                </button>
            </div>

        </div>
        
    </div>
}