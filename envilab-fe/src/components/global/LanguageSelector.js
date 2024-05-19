import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Select,
  MenuItem,
  FormControl,
  ListItemText,
  Typography,
  ListItemIcon,
  Tooltip,
} from "@mui/material";
import { languages } from "../../utils/data";

const LanguageSelector = () => {
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language);

  const changeLanguage = (event) => {
    const newLanguage = event.target.value;
    localStorage.setItem("language", newLanguage);
    setLanguage(newLanguage);
    i18n.changeLanguage(newLanguage);
  };

  return (
    <FormControl sx={{ width: 60 }} size="small">
      <Select
        sx={{
          ".MuiOutlinedInput-notchedOutline": { borderStyle: "none" },
          "& .MuiSelect-icon": {
            color: "darkGreen.contrastText",
          },
        }}
        value={language}
        onChange={(event) => {
          changeLanguage(event);
        }}
        renderValue={() => {
          return (
            <Tooltip title={t("menu.selectLanguageTooltip")}>
              <Typography>
                {languages.find((l) => l.code === language)?.flag}
              </Typography>
            </Tooltip>
          );
        }}
      >
        {languages.map((language) => (
          <MenuItem key={`lang-item-${language.code}`} value={language.code}>
            <ListItemIcon key={`lang-item-icon-container-${language.code}`}>
              <span key={`'lang-item-icon-span-${language.code}`}>
                {language.flag}
              </span>
            </ListItemIcon>
            <ListItemText primary={t(language.label)} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default LanguageSelector;
