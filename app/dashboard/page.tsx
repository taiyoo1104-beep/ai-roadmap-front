"use client";
import { useAuth } from "@/context/AuthContext";

export default function Dashboard() {
  const { user, logout } = useAuth(); // どこでもこれだけで取れる！

  return (
    <div className="p-10 text-white bg-[#001d3d] min-h-screen">
      <h1 className="text-2xl font-bold text-[#00ffd9]">
        {user ? `${user.name}さんのマイページ` : "読み込み中..."}
      </h1>
      <button onClick={logout} className="mt-4 text-red-400 underline">
        ログアウト
      </button>
    </div>
  );
}