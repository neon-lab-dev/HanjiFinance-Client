import { twMerge } from "tailwind-merge";

interface ReusableButtonProps {
  label: string;
  variant?: "primary" | "secondary";
  onClick?: () => void;
  className?: string;
}

const Button: React.FC<ReusableButtonProps> = ({
  label,
  variant = "secondary",
  onClick,
  className = "",
}) => {
  const baseClasses =
    "text-[15px] leading-[18px] -tracking-[0.16px] rounded-lg font-semibold cursor-pointer flex items-center gap-1 justify-center";

  const variantClasses =
    variant === "primary"
      ? "bg-primary-20 text-white border-transparent p-4"
      : "border-2 border-primary-20 text-primary-20 bg-transparent px-4 py-[10px]";

  return (
    <button
      onClick={onClick}
      className={twMerge(`${baseClasses} ${variantClasses}`, className)}
    >
      {label}
    </button>
  );
};

export default Button;
