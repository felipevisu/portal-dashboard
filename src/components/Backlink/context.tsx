import React, { useContext, useRef } from "react";

export type BacklinkContextType = React.RefObject<HTMLDivElement>;

export const BacklinkContext = React.createContext<
  BacklinkContextType | undefined
>(undefined);
BacklinkContext.displayName = "BacklinkContext";

export const useBacklink = () => {
  const ctx = useContext(BacklinkContext);
  if (ctx === undefined) {
    throw new Error("useBacklink must be used within a BacklinkContext");
  }

  return ctx;
};

export const BacklinkProvider: React.FC = ({ children }) => {
  const anchor = useRef<HTMLDivElement | null>(null);

  return (
    <BacklinkContext.Provider value={anchor}>
      {children}
    </BacklinkContext.Provider>
  );
};
