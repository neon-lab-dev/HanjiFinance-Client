import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";

interface MenuLink {
  label: string;
  path: string;
}

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
  links: MenuLink[];
}

const MotionLink = motion(Link);

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

  const menuVariants: Variants = {
    hidden: {
      opacity: 0,
      scale: 0.98,
      y: -10,
      transition: {
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.07,
      },
    },
  };

  const linkVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="relative z-50"
          key="mega-menu"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={menuVariants}
        >
          <motion.div
            className="absolute top-1 left-1/2 -translate-x-1/2 w-6 h-6 rotate-45 bg-neutral-99 border border-neutral-99/80 rounded-[2px] shadow shadow-neutral-98"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 },
            }}
          />

          {/* Menu Box */}
          <motion.div
            ref={menuRef}
            className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[220px] bg-neutral-99 text-neutral-15 rounded-xl p-2 flex flex-col shadow-md shadow-neutral-98"
          >
            {links.map((link) => (
              <MotionLink
                key={link.path}
                to={link.path}
                onClick={onClose}
                className="text-base hover:text-primary-10 px-3 py-3 rounded-md hover:bg-primary-20/5"
                variants={linkVariants}
              >
                {link.label}
              </MotionLink>
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MegaMenu;
