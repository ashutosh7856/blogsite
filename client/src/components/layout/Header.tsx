export default function Header(){
    return <div className="fixed top-0 bg-white z-50 w-full border border-[#e5e8eb] shadow-[#00000025] shadow-xs h-16">

        <div className="max-w-7xl mx-auto flex justify-between items-center h-full px-10">
            <div>
                <h1 className="text-[#121717] font-bold text-lg">
                    TheBlog
                </h1>
            </div>


            <div className="flex gap-8">
                <ul className="flex gap-9 text-[14px] font-medium text-[#121717] items-center">
                    <li>Home</li>
                    <li>About</li>
                    <li>Contact</li>
                    {/* <li><button>New Post</button></li> */}
                </ul>

                <button className="rounded-[8px] h-10 px-4 bg-[#12A3ED] hover:bg-[#2980ac] text-white font-bold text-[14px]">New Post</button>

              
            </div>
        </div>

    </div>
}