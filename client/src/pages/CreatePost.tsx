import { TiptapEditor } from "../components/TextEditor";

export default function CreatePost() {
  return (
    <div className="w-full px-40 py-5">
      <div className="max-w-[960px] mx-auto flex flex-col py-5 justify-start">
        <div className="text-[#121717] text-3xl font-bold p-4">
          Create a new post
        </div>

        <input
          placeholder="Title"
          className="p-4 m-4 border border-[#DBE3E5] bg-white max-w-[448px] rounded-[8px] placeholder:text-[#617D8A] font-normal text-[16px]"
        />

        <div className="p-4">
          <div className="border border-[#DBE3E5] rounded-[8px]">
            <TiptapEditor isEditable={true} onChange={() => {}} value="" />
          </div>
        </div>

        <div className="py-4 px-4 flex justify-end">
          <button className="bg-[#12A3ED] rounded-[8px] text-[14px] font-medium px-3 py-1.5  text-white flex items-center justify-center overflow-clip whitespace-nowrap">
            Publish
          </button>
        </div>
      </div>
    </div>
  );
}
