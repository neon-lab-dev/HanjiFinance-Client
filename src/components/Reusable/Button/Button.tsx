import { twMerge } from "tailwind-merge";

interface ReusableButtonProps {
  label: string;
  variant?: "primary" | "secondary" | "tertiary" | "disabled" | "custom";
  onClick?: () => void;
  classNames?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean; // ✅ added disabled prop
  icon?: string;
  isLoading?: boolean; // ✅ added isLoading prop
}

const Button: React.FC<ReusableButtonProps> = ({
  label,
  variant = "secondary",
  onClick,
  classNames = "",
  type = "button",
  disabled = false, // ✅ default false
  icon,
  isLoading = false, // ✅ default false
}) => {
  const baseClasses =
    "text-[15px] leading-[18px] font-Montserrat -tracking-[0.16px] rounded-lg font-semibold flex items-center gap-1 justify-center transition-all cursor-pointer duration-300 ease-in-out transform px-4 py-4 whitespace-nowrap flex items-center justify-center gap-3";

  const variantClasses =
    variant === "primary"
      ? "bg-primary-20 text-white border-transparent hover:scale-105 active:scale-95 border-2 border-primary-20 py-[10px]"
      : variant === "secondary"
      ? "border-2 border-primary-20 text-primary-20 py-[10px] bg-transparent hover:bg-primary-20 hover:text-white hover:scale-105 active:scale-95"
      : variant === "tertiary"
      ? "text-primary-15 bg-transparent py-4 px-8 hover:scale-105 active:scale-95"
      : variant === "disabled"
      ? "bg-neutral-150 text-neutral-90 cursor-not-allowed border-2 border-neutral-98 hover:none"
      : variant === "custom"
      ? "bg-neutral-150 text-neutral-90  border-2 border-neutral-98"
      : "";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled} // ✅ disables button
      className={twMerge(`${baseClasses} ${variantClasses}`, classNames)}
    >
     {isLoading ? (
        "Loading..."
      ) : (
        <>
          {icon && <img src={icon} alt="icon" className="size-6" />}
          {label}
        </>
      )}
     
    </button>
  );
};

export default Button;
