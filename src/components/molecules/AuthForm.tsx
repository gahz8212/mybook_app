'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";
import { Mail, Lock } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
interface AuthFormProps {
  type: "register" | "login";
}
export default function AuthForm({ type }: AuthFormProps) {

  const router = useRouter();
  const setLogin = useAuthStore((state) => state.setLogin);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        throw new Error("이메일 또는 비밀번호가 올바르지 않습니다.");
      }
      const data = await response.json();
      const { userName, roles } = data;
      console.log('data', data)
      setLogin({ userName, roles });
      router.push("/");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "로그인 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-sm">
      <Input
        label="이메일"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        icon={<Mail size={18} />}
        required
      />
      <Input
        label="비밀번호"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        icon={< Lock size={18} />}
        error={error}
        required
      />
      {type === "register" && <Input
        label="비밀번호  확인"
        type="password"
        value={passwordConfirm}
        onChange={(e) => setPasswordConfirm(e.target.value)}
        icon={< Lock size={18} />}
        error={error}
        required
      />}
      {error && <p className="text-red-500">{error}</p>}
      <Button type="submit" disabled={isLoading} variant="primary" className="w-full h-11 text-base font-semibold">
        {type === "login" ? (isLoading ? "로그인 중..." : "로그인") : (isLoading ? "회원가입 중..." : "회원가입")}
      </Button>
    </form>
  );
}