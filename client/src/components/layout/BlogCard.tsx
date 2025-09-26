import { Link } from 'react-router-dom';
import DOMPurify from 'dompurify';

type BlogItem = {
  id?: string;
  userId?: string;
  title?: string;
  body?: string;
  created_at?: string | Date;
};

type Props = {
  blog: BlogItem;
};

export default function Blog({ blog }: Props) {
  return (
    <Link to="/blog" state={{ blog }} className="block">
      <div className="p-4 hover:shadow-lg transition rounded-[8px]">
        <div className="flex gap-3">
          <img
            src="/blog.png"
            alt={blog.title ?? 'blogImage'}
            className="w-[464px] h-64 rounded-[8px] object-cover"
          />

          <div className="flex flex-col gap-2 p-4">
            <h1 className="text-lg text-[#121717] font-bold">
              {blog.title ?? 'Untitled Post'}
            </h1>
            <div className="flex justify-between items-end">
              <p className="flex-1 text-[16px] text-[#617D8A] font-normal">
                {blog.body ? (
                  <span
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(
                        blog.body.length > 220 ? `${blog.body.slice(0, 220)}...` : blog.body
                      ),
                    }}
                  />
                ) : (
                  'No description available.'
                )}
              </p>
              <Link to="/blog" state={{ blog }} className="ml-4">
                <button className="bg-[#12A3ED] hover:bg-[#2980ac] rounded-[8px] text-[14px] font-medium px-4 py-1.5 w-[84px] text-white flex items-center justify-center overflow-clip whitespace-nowrap">
                  Read M...
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
