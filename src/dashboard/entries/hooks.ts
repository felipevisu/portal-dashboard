import { useTranslation } from "react-i18next";

export const useEntryType = () => {
  const { t } = useTranslation();
  const vehicles = {
    new: t("createVehicle"),
    header: t("vehicles"),
    link: "vehicles",
  };
  const providers = {
    new: t("createProvider"),
    header: t("providers"),
    link: "providers",
  };
  const pathname = window.location.pathname;
  return pathname.includes("vehicle") ? vehicles : providers;
};
