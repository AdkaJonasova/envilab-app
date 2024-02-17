import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Select,
  MenuItem,
  FormControl,
  ListItemText,
  Typography,
  ListItemIcon,
} from "@mui/material";
import { languages } from "../../utils/data";

function LanguageSelector() {
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
            color: "mainGreen.contrastText",
          },
        }}
        value={language}
        onChange={(event) => {
          changeLanguage(event);
        }}
        renderValue={() => {
          return (
            <Typography>
              {languages.find((l) => l.code === language)?.flag}
            </Typography>
          );
        }}
      >
        {languages.map((language) => (
          <MenuItem value={language.code}>
            <ListItemIcon>
              <span>{language.flag}</span>
            </ListItemIcon>
            <ListItemText primary={t(language.label)} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default LanguageSelector;
