"use client";

import { useRouter, useSearchParams } from "next/navigation";

const CATEGORIES = [
  { value: "", label: "All" },
  { value: "sports", label: "Sports" },
  { value: "fashion", label: "Fashion" },
  { value: "entertainment", label: "Entertainment" },
  { value: "business", label: "Business" },
];

export default function FilterBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category") || "";

  const handleFilter = (category: string) => {
    if (category) {
      router.push(`/?category=${category}`);
    } else {
      router.push("/");
    }
  };

  return (
    <div className="flex gap-2 flex-wrap mb-8">
      {CATEGORIES.map((cat) => (
        <button
          key={cat.value}
          onClick={() => handleFilter(cat.value)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            currentCategory === cat.value
              ? "bg-gray-900 text-white"
              : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
          }`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}
