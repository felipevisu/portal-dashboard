import React from "react";
import Button from "./Button";

interface ListItemProps {
  label: string;
  onEdit?: () => void;
}

export const ListItem = ({ label, onEdit }: ListItemProps) => {
  const handleTitleClick = () => {
    onEdit && onEdit();
  };

  return (
    <div className="flex items-center border-b py-3">
      <h4 className="flex-1 font-medium">
        <span onClick={handleTitleClick} className="cursor-pointer">
          {label}
        </span>
      </h4>
      {onEdit && (
        <Button onClick={() => onEdit()} size="small">
          Editar
        </Button>
      )}
    </div>
  );
};

export default ListItem;
