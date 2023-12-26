import React from "react";

import EditAttributesIcon from "@mui/icons-material/EditAttributes";
import LanguageIcon from "@mui/icons-material/Language";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import PublicIcon from "@mui/icons-material/Public";
import UsbIcon from "@mui/icons-material/Usb";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";

export type SettingsItem = {
  title: string;
  description: string;
  url: string;
  icon: React.ReactNode;
};

export const createConfigurationMenu = (): SettingsItem[] => {
  return [
    {
      title: "Tipos de cadastro",
      description:
        "Gerêncie seus tipos de cadastros como Veículos e Fornecedores.",
      url: "/entryTypes",
      icon: <AppRegistrationIcon fontSize="large" />,
    },
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
    {
      title: "Atributos",
      description:
        "Crie campos personalizados para seus veículos, fornecedores e documentos.",
      url: "/attributes",
      icon: <EditAttributesIcon fontSize="large" />,
    },
    {
      title: "Equipe",
      description:
        "Adicione mais membros da sua equipe para gerênciar a plataforma",
      url: "/team",
      icon: <PeopleAltIcon fontSize="large" />,
    },
    {
      title: "Site",
      description: "Edite as configurações e aparência do seu site.",
      url: "/site",
      icon: <LanguageIcon fontSize="large" />,
    },
  ];
};
