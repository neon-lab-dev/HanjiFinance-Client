import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

interface MenuLink {
  label: string;
  path: string;
}

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
  links: MenuLink[];
}

const MegaMenu: React.FC<MegaMenuProps> = ({ isOpen, onClose, links }) => {
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="relative z-50">
      {/* Triangle Arrow */}
  <div className="absolute top-1 left-1/2 -translate-x-1/2 w-6 h-6 rotate-45 bg-neutral-99/80 border border-neutral-99/80 rounded-[2px] shadow shadow-neutral-98" />


      {/* Menu Box */}
      <div
        ref={menuRef}
        className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[220px] bg-neutral-99/80 text-neutral-15 rounded-xl p-6 flex flex-col gap-4 shadow-md shadow-neutral-98"
      >
        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            onClick={onClose}
            className="text-base hover:text-primary-10"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MegaMenu;
