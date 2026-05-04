import RegistForm from "@/components/molecules/RegistForm"
import Link from "next/link";

export default function Register() {
  return (
     <div className="min-h-[calc(100vh-160px)] flex flex-col items-center justify-center py-12">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">반가워요! 👋</h1>
          <p className="text-gray-500 mt-2">서비스를 이용하기 위해 회원가입 해주세요.</p>
        </div>

        {/* 클라이언트 컴포넌트 주입 */}
        <RegistForm />

        <div className="mt-8 text-center text-sm text-gray-600">
          아직 계정이 없으신가요?{' '}
          <Link href="/login" className="text-blue-600 font-semibold hover:underline">
            로그인하기
          </Link>
        </div>
      </div>
    </div>
  );
}