import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Post from "@/lib/models/Post";

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    const filter = category ? { category } : {};
    const posts = await Post.find(filter).sort({ createdAt: -1 }).lean();

    return NextResponse.json(posts);
  } catch (err) {
    console.error("GET /api/posts error:", err);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const post = await Post.create(body);
    return NextResponse.json(post, { status: 201 });
  } catch (err) {
    console.error("POST /api/posts error:", err);
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 }
    );
  }
}
