import { Box } from "@mui/material";
import { areaSettingsAnnotation, areaSettingsTitle } from "../../utils/data";
import { useState } from "react";
import SettingsHeader from "../../components/settings/SettingsHeader";

const AreaSettingsPage = () => {
  const [filter, setFilter] = useState("");

  return (
    <div>
      <SettingsHeader
        title={areaSettingsTitle}
        annotation={areaSettingsAnnotation}
        setFilter={setFilter}
      />
      <Box
        sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      ></Box>
    </div>
  );
};

export default AreaSettingsPage;
