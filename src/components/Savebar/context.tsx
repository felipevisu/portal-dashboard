import React from "react";

export type SavebarContextType = React.RefObject<HTMLDivElement>;

export const SavebarContext = React.createContext<
  SavebarContextType | undefined
>(undefined);
SavebarContext.displayName = "SavebarContext";

export const useSavebar = () => {
  const ctx = React.useContext(SavebarContext);
  if (ctx === undefined) {
    throw new Error("useSavebar must be used within a SavebarContext");
  }

  return ctx;
};

export const SavebarProvider: React.FC = ({ children }) => {
  const anchor = React.useRef<HTMLDivElement | null>(null);

  return (
    <SavebarContext.Provider value={anchor}>{children}</SavebarContext.Provider>
  );
};
