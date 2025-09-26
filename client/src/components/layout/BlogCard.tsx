export default function Blog() {
  return (
    <div className="p-4">
      <div className="flex gap-3">
        <img
          src="/blog.png"
          alt="blogImage"
          className="w-[464px] h-64 rounded-[8px]"
        />

        <div className="flex flex-col gap-2 p-4">
          <h1 className="text-lg text-[#121717] font-bold">
            The Future of sustainable living.
          </h1>
        <div className="flex justify-between items-end">
            <p className="flex-1 text-[16px] text-[#617D8A] font-normal">
                Explore innovative approaches to sustainable living, from
                eco-friendly homes to zero-waste lifestyles. Learn how small changes
                can make a big impact on the planet.
            </p>
            <button className="bg-[#12A3ED] rounded-[8px] text-[14px] font-medium px-4 py-1.5 w-[84px] text-white flex items-center justify-center overflow-clip whitespace-nowrap">
                Read M...
            </button>
        </div>
         
        </div>
      </div>
    </div>
  );
}
