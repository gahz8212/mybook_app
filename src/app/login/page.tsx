import LoginForm from '@/components/molecules/LoginForm';
import Link from 'next/link';

export const metadata = {
  title: '로그인 | Book Manager',
  description: '계정에 로그인하여 나만의 서재를 관리하세요.',
};

export default function LoginPage() {
  return (
    <div className="min-h-[calc(100vh-160px)] flex flex-col items-center justify-center py-12">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">반가워요! 👋</h1>
          <p className="text-gray-500 mt-2">서비스를 이용하기 위해 로그인해주세요.</p>
        </div>

        {/* 클라이언트 컴포넌트 주입 */}
        <LoginForm />

        <div className="mt-8 text-center text-sm text-gray-600">
          아직 계정이 없으신가요?{' '}
          <Link href="/register" className="text-blue-600 font-semibold hover:underline">
            회원가입 하기
          </Link>
        </div>
      </div>
    </div>
  );
}