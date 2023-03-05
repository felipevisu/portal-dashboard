import React from "react";

import PublicIcon from "@mui/icons-material/Public";
import UsbIcon from "@mui/icons-material/Usb";

export type SettingsItem = {
  title: string;
  description: string;
  url: string;
  icon: React.ReactNode;
};

export const createConfigurationMenu = (): SettingsItem[] => {
  return [
    {
      title: "Plugins",
      description:
        "Visualize e genrencie seus plugins como envio de emails e notificações.",
      url: "/plugins",
      icon: <UsbIcon fontSize="large" />,
    },
    {
      title: "Canais",
      description:
        "Crie um canal para cada público do seu site e organize seu conteúdo.",
      url: "/channels",
      icon: <PublicIcon fontSize="large" />,
    },
  ];
};
