import { useContext } from "react";

import { ColorModeContext } from "@portal/theme";

function useThemeToggle() {
  return useContext(ColorModeContext);
}

export default useThemeToggle;
