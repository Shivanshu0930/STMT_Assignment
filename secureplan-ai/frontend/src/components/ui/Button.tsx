import type { ButtonHTMLAttributes, ReactNode } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
  icon?: ReactNode;
};

export function Button({ className = "", variant = "primary", icon, children, ...props }: Props) {
  const variants = {
    primary: "bg-[#17b890] text-white hover:bg-[#119f7c] shadow-[0_14px_30px_rgba(23,184,144,0.26)]",
    secondary: "bg-white text-[#263442] border border-[#d7e6e8] hover:border-[#8fb9c2] hover:bg-[#f6fffb]",
    ghost: "bg-transparent text-[#52697a] hover:bg-white/75"
  };
  return (
    <button
      className={`inline-flex h-10 items-center justify-center gap-2 rounded-xl px-4 text-sm font-semibold tracking-[-0.01em] transition duration-200 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 ${variants[variant]} ${className}`}
      {...props}
    >
      {icon}
      {children}
    </button>
  );
}
