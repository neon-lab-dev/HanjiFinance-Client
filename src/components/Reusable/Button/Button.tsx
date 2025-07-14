import { twMerge } from "tailwind-merge";

interface ReusableButtonProps {
  label: string;
  colorClass: string; 
  onClick?: () => void;
  className?: string; 
}

const Button: React.FC<ReusableButtonProps> = ({
  label,
  colorClass,
  onClick,
  className = "",
}) => {
  const baseClasses =
    "text-[15px] leading-[18px] -tracking-[0.16px] px-4 py-[10px] rounded-lg font-semibold cursor-pointer flex items-center gap-1 border-2 justify-center";

  return (
    <button
      onClick={onClick}
      className={twMerge(`${baseClasses} ${colorClass}`, className)}
    >
      {label}
    </button>
  );
};

export default Button;
