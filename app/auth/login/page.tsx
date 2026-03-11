"use client";
import { LoginForm } from "./_components/LoginForm";
import { LogoWithTitle } from "./_components/LogoWithTitle";
import { Toaster } from "sonner";


export default function LoginPage() {

  return (
    <>
    <Toaster position="top-right" richColors theme="dark"/>
      {/* --- ログインページの背景とレイアウト --- */}
      <main className="flex min-h-screen w-full items-center justify-center bg-[#000814] p-4 text-white font-sans">
        {/* --- ロゴとフォームを含むカード --- */}
        <div className="relative z-10 flex w-full max-w-md flex-col gap-6 lg:max-w-[1100px] lg:flex-row lg:gap-10">
          <LogoWithTitle />
          <LoginForm />
        </div>
      </main>
    </>
  );
}