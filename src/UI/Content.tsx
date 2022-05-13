import React from "react";

interface ContentProps {
  children: React.ReactNode;
}

export const Content = ({ children }: ContentProps) => {
  return <div className={`shadow-2xl rounded-xl p-6`}>{children}</div>;
};

export default Content;
