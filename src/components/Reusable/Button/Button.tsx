import { twMerge } from "tailwind-merge";

interface ReusableButtonProps {
  label: string;
  variant?: "primary" | "secondary" | "tertiary" | "disabled";
  onClick?: () => void;
  classNames?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean; // ✅ added disabled prop
}

const Button: React.FC<ReusableButtonProps> = ({
  label,
  variant = "secondary",
  onClick,
  classNames = "",
  type = "button",
  disabled = false, // ✅ default false
}) => {
  const baseClasses =
    "text-[15px] leading-[18px] font-Montserrat -tracking-[0.16px] rounded-lg font-semibold flex items-center gap-1 justify-center transition-all duration-300 ease-in-out transform px-4 py-4 whitespace-nowrap";

  const variantClasses =
    variant === "primary"
      ? "bg-primary-20 text-white border-transparent hover:scale-105 active:scale-95"
      : variant === "secondary"
      ? "border-2 border-primary-20 text-primary-20 py-[10px] bg-transparent hover:bg-primary-20 hover:text-white hover:scale-105 active:scale-95"
      : variant === "tertiary"
      ? "text-primary-15 bg-transparent py-4 px-8 hover:scale-105 active:scale-95"
      : variant === "disabled"
      ? "bg-neutral-150 text-neutral-90 cursor-not-allowed border-2 border-neutral-98 hover:none"
      : "";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || variant === "disabled"} // ✅ disables button
      className={twMerge(`${baseClasses} ${variantClasses}`, classNames)}
    >
      {label}
    </button>
  );
};

export default Button;
