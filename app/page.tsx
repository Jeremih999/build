import FilterBar from "@/components/FilterBar";
import PostCard from "@/components/PostCard";
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

async function getPosts(category?: string) {
  await connectDB();
  const filter = category ? { category } : {};
  const posts = await Post.find(filter).sort({ createdAt: -1 }).lean();
  return JSON.parse(JSON.stringify(posts)) as PostData[];
}

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const params = await searchParams;
  const posts: PostData[] = await getPosts(params.category);

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Latest News</h1>
      <FilterBar />
      {posts.length === 0 ? (
        <p className="text-gray-500 text-center py-12">No posts found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
