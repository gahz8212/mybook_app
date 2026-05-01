'use client';
import { useMemo } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
interface AuthInitializerProps {
  userName: string | null;
  roles: string[];
}
export default function AuthInitializer({
  userName, roles }: AuthInitializerProps) {

  const { setLogin } = useAuthStore();

  useMemo(() => {
    if (userName){
      setLogin({
        userName,
        roles
      })}
  }, [userName, roles, setLogin,]);
  return null;
}