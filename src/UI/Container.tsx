import React from "react";

interface ContainerProps {
  className?: string;
  children: React.ReactNode;
}

export const Container = ({ children, className }: ContainerProps) => {
  return (
    <div className={`container mx-auto px-4 max-w-screen-xl ${className}`}>
      {children}
    </div>
  );
};

export default Container;
