import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-gray-900">
          Simple Blog
        </Link>
        {/* <Link
          href="/dashboard"
          className="text-sm text-gray-500 hover:text-gray-900"
        >
          Dashboard
        </Link> */}
      </div>
    </header>
  );
}
