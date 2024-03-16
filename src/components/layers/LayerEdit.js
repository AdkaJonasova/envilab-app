import { useState } from "react";
import { useTranslation } from "react-i18next";

const LayerEdit = ({ layer }) => {
  const [opacity, setOpacity] = useState(100);
  const { t } = useTranslation();

  const handleOpacityChange = (newValue) => {
    setOpacity(newValue);
  };

  return (
    <div>
      <Typography variant="h2">{layer.geoLayer.name}</Typography>
      <Typography variant="h3">
        {t("layerViewSidebar.layerEdit.opacity")}
      </Typography>
      <Slider
        size="medium"
        min={0}
        max={100}
        valueLabelDisplay="auto"
        value={opacity}
        onChange={(_event, newValue) => handleOpacityChange(newValue)}
      />
    </div>
  );
};

export default LayerEdit;
