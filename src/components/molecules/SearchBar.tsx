'use client';

import { useState } from "react";
import { Search } from "lucide-react";
import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  className?: string;
  placeholder?: string;
  // onSearch: (value: string) => void;
}
export default function SearchBar({ className, placeholder = "Search..." }: SearchBarProps) {
  const [value, setValue] = useState("");
  const handleSearch = (value: string) => {
    console.log("Search value:", value);
  };
  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSearch(value);
  };

  return (
    <form onSubmit={handleSubmit} className={cn("flex items-center space-x-2", className)}>
      <Input
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        icon={<Search className="h-4 w-4 text-gray-500" />}
      />
      <Button type="submit" variant="primary" className="shrink-0 h-10">
        Search
      </Button>
    </form>
  );
}