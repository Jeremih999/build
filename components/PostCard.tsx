import Link from "next/link";
interface PostData {
  _id: string;
  title: string;
  content: string;
  excerpt: string;
  category: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export default function PostCard({ post }: { post: PostData }) {
  return (
    <Link
      href={`/post/${post._id}`}
      className="block bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
    >
      {post.imageUrl && (
        <div className="h-48 bg-gray-100">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="p-5">
        <span className="inline-block text-xs font-semibold uppercase tracking-wider text-gray-500 bg-gray-100 px-2 py-1 rounded mb-2">
          {post.category}
        </span>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {post.title}
        </h3>
        <p className="text-sm text-gray-600 leading-relaxed">{post.excerpt}</p>
        <p className="text-xs text-gray-400 mt-3">
          {new Date(post.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>
    </Link>
  );
}
