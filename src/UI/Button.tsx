import React from "react";

const VARIANT_COLORS = {
  primary: "bg-blue-100 hover:bg-blue-200 text-blue-600",
  secondary: "bg-gray-200 hover:bg-gray-300",
  danger: "bg-red-100 hover:bg-red-200 text-red-600",
};

const VARIANT_SIZES = {
  medium: "px-5 py-2 rounded-md font-medium",
  small: "px-3 py-1 rounded-md font-medium text-sm",
};

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "danger";
  size?: "small" | "medium" | "large";
  onClick: () => void;
}

export const Button = ({
  children,
  variant = "primary",
  size = "medium",
  onClick,
}: ButtonProps) => {
  const handleClick = () => {
    onClick();
  };

  return (
    <button
      onClick={handleClick}
      className={`${VARIANT_COLORS[variant]} ${VARIANT_SIZES[size]}`}
      type="button"
    >
      {children}
    </button>
  );
};

export default Button;
