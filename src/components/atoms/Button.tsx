import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes } from "react";
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
}
export default function Button({ className, variant = "primary", ...props }: ButtonProps) {
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-600 text-white hover:bg-gray-600",
    outline: "border border-blue-600 text-blue-600 hover:bg-blue-50"
  };
  return (
    <button className={cn('px-4 rounded-md font-medium transiition-colors', variants[variant], className)} {...props} />
  );
}