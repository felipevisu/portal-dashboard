import React from "react";

interface StyleButtonProps {
  label: string;
  onToggle: (value: string) => void;
  style: any;
  active: boolean;
}

export const StyleButton = ({
  label,
  onToggle,
  style,
  active,
}: StyleButtonProps) => {
  const handleToggle = () => {
    onToggle(style);
  };

  const className = active
    ? "RichEditor-styleButton  RichEditor-activeButton"
    : "RichEditor-styleButton";

  return (
    <span className={className} onMouseDown={handleToggle}>
      {label}
    </span>
  );
};

export default StyleButton;
