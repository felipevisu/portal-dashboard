import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

interface HeaderProps {
  title: string;
  buttonLabel: string;
  buttonPath: string;
  buttonVariant?: "primary" | "secondary" | "danger";
}

export const Header = ({
  title,
  buttonLabel,
  buttonPath,
  buttonVariant = "primary",
}: HeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="mb-6 flex items-center border-gray-100">
      <h2 className="flex-1 text-3xl font-bold">{title}</h2>
      <Button variant={buttonVariant} onClick={() => navigate(buttonPath)}>
        {buttonLabel}
      </Button>
    </div>
  );
};

export default Header;
