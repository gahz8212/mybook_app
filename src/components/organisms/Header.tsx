// 'use client';
import Link from "next/link";
import SearchBar from "../molecules/SearchBar";
import { BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
interface HeaderProps{
  className?: string;
}
export default function Header({className}:HeaderProps) {


  return (
    <header className={cn("sticky top-0 z-50 w-full bg-white/95 backdrop-blur", className)}>
      <div className="container mx-auto flex h-16 items-center justify-between px-4 ">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl px-4">
            <BookOpen className="h-8 w-8 text-blue-500" />
            <span className="text-xl font-bold text-gray-800">MyBook</span>
          </Link>
          <div className="flex-1 px-4 max-w-md">
            <SearchBar />
          </div>
          <nav className="flex items-center gap-4">
            <Link href="/login" className="text-gray-600 hover:text-gray-800">
              Login
            </Link>
            <Link href="/register" className="text-gray-600 hover:text-gray-800">
              Sign Up
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}