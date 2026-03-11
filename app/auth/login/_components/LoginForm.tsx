import { useAuth } from "@/context/AuthContext";
import { Eye, EyeOff, Loader2 } from "lucide-react"; // Loaderを追加
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { toast } from "sonner";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }

  const onclickLogin = async () => {
    if (!email || !password) {
      toast.error("メールアドレスとパスワードを入力してください");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:3000/api/v1/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
        const data = await response.json();
        login({ name: data.user.name, email: data.user.email });

        toast.success(data.user.name + "さん、こんにちは");
        router.push("/dashboard");
      } else {
        toast.error("ログイン失敗");
      }
    } catch (error) {
      // サーバーが動いていない時はここに来る
      toast.error("サーバーに接続できませんでした");
    } finally {
      setIsLoading(false);
    }
  }

  const onclickRegister = () => alert("登録");
  const onclickForgotPassword = (e: React.MouseEvent) => {
    e.preventDefault();
    alert("パスワードを忘れた");
  };

  const toggleShowPassword = () => setShowPassword(!showPassword);

  return (
    <div className="flex w-full flex-col rounded-2xl border-2 border-cyan-200 bg-[#001d3d]/90 p-8 shadow-2xl backdrop-blur-xl lg:w-[55%] lg:p-16">
      <div className="mb-8 space-y-5 lg:mb-12 lg:space-y-6">
        <div className="relative">
          <input
            type="email"
            placeholder="Email Address"
            onChange={onChangeEmail}
            disabled={isLoading}
            className="w-full rounded-md border border-blue-900 bg-transparent p-4 text-base outline-none focus:border-[#00ffd9] lg:text-lg disabled:opacity-50"
          />
        </div>

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            onChange={onChangePassword}
            disabled={isLoading}
            className="w-full rounded-md border border-blue-900 bg-transparent p-4 text-base outline-none focus:border-[#00ffd9] lg:text-lg disabled:opacity-50"
          />
          <div onClick={toggleShowPassword} className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-600 cursor-pointer hover:text-gray-400">
            {showPassword ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
          </div>
        </div>
      </div>

      <button
        onClick={onclickLogin}
        disabled={isLoading}
        className="flex items-center justify-center w-full rounded-md bg-gradient-to-r from-[#00ffd9] to-[#007fff] py-4 text-lg font-bold text-white transition hover:opacity-90 active:scale-[0.98] lg:text-xl shadow-[0_0_20px_0_rgba(0,255,217,0.3)] disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {isLoading ? <Loader2 className="h-6 w-6 animate-spin" /> : "Sign In with AI"}
      </button>

      <div className="mt-6 flex flex-col items-center justify-center text-sm font-semibold text-gray-500 lg:mt-8 lg:flex-row lg:text-base">
        <a href="#" onClick={onclickForgotPassword} className="hover:text-[#00ffd9]">Forgot Password?</a>
      </div>

      <div className="mt-10 lg:mt-16">
        <button onClick={onclickRegister} className="w-full rounded-md border border-blue-900 bg-transparent py-3 text-base font-medium text-gray-400 transition hover:bg-blue-950/20 active:scale-[0.98] lg:text-lg">
          Register New Account
        </button>
      </div>
    </div>
  );
}