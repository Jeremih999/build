import Link from "next/link";
import { connectDB } from "@/lib/mongodb";
import Post from "@/lib/models/Post";

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

async function getPost(id: string) {
  await connectDB();
  const post = await Post.findById(id).lean();
  if (!post) return null;
  return JSON.parse(JSON.stringify(post)) as PostData;
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post: PostData | null = await getPost(id);

  if (!post) {
    return (
      <div className="text-center py-16">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Post not found
        </h1>
        <Link href="/" className="text-gray-500 hover:text-gray-900 underline">
          Back to home
        </Link>
      </div>
    );
  }

  return (
    <article className="max-w-3xl mx-auto">
      <Link
        href="/"
        className="text-sm text-gray-500 hover:text-gray-900 mb-6 inline-block"
      >
        &larr; Back to home
      </Link>
      <span className="inline-block text-xs font-semibold uppercase tracking-wider text-gray-500 bg-gray-100 px-2 py-1 rounded mb-4">
        {post.category}
      </span>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">{post.title}</h1>
      <p className="text-sm text-gray-400 mb-8">
        {new Date(post.createdAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>
      {post.imageUrl && (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={post.imageUrl}
          alt={post.title}
          className="w-full max-h-96 object-cover rounded-lg mb-8"
        />
      )}
      <div className="prose prose-gray max-w-none text-gray-700 leading-relaxed whitespace-pre-wrap">
        {post.content}
      </div>
    </article>
  );
}
