import { Heart, MessageCircleMore, Send, UserCircle2Icon } from "lucide-react";

export default function BlogPage() {
  return (
    <div className="bg-white max-w-[960px] mx-auto flex  flex-col">
      <div className="flex gap-2 p-4">
        <p className="flex gap-2 text-[#617D8A] font-medium text-[16px]">
          Home <span>/</span>
        </p>
        <p className="text-[#121717] font-medium text-[16px]">Tech</p>
      </div>

      <div className="pt-5 pb-4 px-4">
        <h1 className="text-[28px] text-[#121717] font-bold">
          The Future of AI in Software Development
        </h1>
      </div>

      <div className="pb-3 px-4">
        <p className="text-[#617d8a] text-[14px] font-normal">
          By Sophia Carter · Published on January 15, 2024
        </p>
      </div>

      <div className="py-3">
        <img src="/thumbnail.png" alt="thumbnail" className="" />
      </div>

      <div className="flex gap-3 flex-col">
        <p>
          Artificial intelligence (AI) is rapidly transforming the landscape of
          software development, offering unprecedented opportunities to enhance
          efficiency, automate tasks, and create innovative solutions. This
          article explores the current and future impact of AI on software
          development, highlighting key trends and potential challenges.
        </p>
        <p></p>
        <p>
          <strong>AI-Powered Tools and Automation</strong>
        </p>
        <p>
          AI-powered tools are becoming increasingly prevalent in software
          development, automating repetitive tasks such as code generation,
          testing, and debugging. These tools leverage machine learning
          algorithms to analyze code, identify potential issues, and suggest
          improvements, freeing up developers to focus on more complex and
          creative aspects of their work.
        </p>
        <p></p>
        <p>
          <strong>AI-Driven Code Generation</strong>
        </p>
        <p>
          One of the most significant advancements in AI for software
          development is code generation. AI models can now generate code
          snippets or even entire programs based on natural language
          descriptions or specifications. This capability has the potential to
          significantly accelerate the development process, reduce errors, and
          enable developers to create software more quickly and efficiently.
        </p>
        <p></p>
        <p>
          <strong>Challenges and Considerations</strong>
        </p>
        <p>
          While AI offers numerous benefits, it also presents challenges and
          considerations for the software development industry. These include
          the need for developers to acquire new skills to effectively utilize
          AI tools, ensuring the reliability and security of AI-generated code,
          and addressing ethical concerns related to AI bias and job
          displacement.
        </p>
      </div>


      <div className="flex items-center justify-start gap-4 py-4 ">
        <div className="flex items-center justify-center gap-2 text-[#617D8A] text-[14px]">
          <Heart size={20} />
          <span className="leading-none">24</span>
        </div>
        <div className="flex items-center justify-center gap-2 text-[#617D8A] text-[14px]">
          <MessageCircleMore size={20} />
          <span className="leading-none">12</span>
        </div>
        <div className="flex items-center justify-center gap-2 text-[#617D8A] text-[14px]">
          <Send size={20} />
          <span className="leading-none">34</span>
        </div>
      </div>


      <div className="py-4 px-4 font-bold text-[#121717] text-[18px]">
        Comments
      </div>

      <div className="flex items-center gap-3 p-4">

        <UserCircle2Icon className="w-10 h-10 text-[#617d8a] rounded-full"/>
        <div className="flex flex-col text-[#121717] text-[14px] ">
            <h1 className="font-bold flex gap-3">Sumit Shrestha <span className="text-[#617D8A] font-normal">2 days ago</span></h1>
            <p className="font-normal">Great Article! AI is indeed changing the game.</p>

        </div>
      </div>

      <div className="bg-white py-3 px-4 max-w-[480x] w-full">
        <textarea name="comments" rows={10} cols={40} className="border bordeer-[#DBE3E5] rounded-[8px]"/>
      </div>


      <div className="py-4 px-4 flex justify-end">
        <button className="bg-[#12A3ED] rounded-[8px] text-[14px] font-medium px-3 py-1.5  text-white flex items-center justify-center overflow-clip whitespace-nowrap">
            Post Comment
        </button>
      </div>
    </div>
  );
}
