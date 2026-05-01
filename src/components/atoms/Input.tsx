import { cn } from "@/lib/utils";
import { forwardRef, InputHTMLAttributes,ReactNode } from "react";
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: ReactNode;
}

const Input=forwardRef<HTMLInputElement, InputProps>(
  ({ className,type="text", label, error, icon, ...props }, ref) => {
  return (
    <div className="w-full space-y-1.5">
      {label && <label className="text-sm font-medium text-gray-700 ml-1">{label}</label>}
      <div className="relative flex items-center">
        {icon && <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">{icon}</div>}
      <input
          type={type}
          className={cn(
            // 기본 스타일 (Border, Padding, Focus 효과 등)
            "flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50",
            icon && "pl-10",
            props.readOnly && "bg-gray-100 cursor-default border-dashed focus:ring-0 ",
            error && "border-red-500 focus:ring-red-500",
            className
          )}
          ref={ref}
          {...props}
          />
          </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}); 
Input.displayName="Input";
export default Input;