import { useState } from "react";
import { Box } from "@mui/material";
import SettingsHeader from "../../components/settings/SettingsHeader";
import { useTranslation } from "react-i18next";

const AreaSettingsPage = () => {
  const [filter, setFilter] = useState("");

  const { t } = useTranslation();

  return (
    <div>
      <SettingsHeader
        title={t("settings.areas.title")}
        annotation={t("settings.areas.annotation")}
        setFilter={setFilter}
      />
      <Box
        sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      ></Box>
    </div>
  );
};

export default AreaSettingsPage;
