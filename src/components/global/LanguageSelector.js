import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Select, MenuItem, FormControl, ListItemText } from "@mui/material";

function LanguageSelector() {
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language);

  const languages = [
    { code: "en", label: t("menu.languages.english"), flag: "🇺🇸" },
    { code: "cz", label: t("menu.languages.czech"), flag: "🇨🇿" },
    { code: "sk", label: t("menu.languages.slovak"), flag: "🇸🇰" },
  ];

  const changeLanguage = (event) => {
    const newLanguage = event.target.value;
    localStorage.setItem("language", newLanguage);
    setLanguage(newLanguage);
    i18n.changeLanguage(newLanguage);
  };

  return (
    <FormControl sx={{ width: 150 }} size="small">
      <Select
        sx={{
          ".MuiOutlinedInput-notchedOutline": { borderStyle: "none" },
          color: "mainGreen.contrastText",
        }}
        value={language}
        onChange={(event) => {
          changeLanguage(event);
        }}
      >
        {languages.map((language) => (
          <MenuItem value={language.code}>
            <ListItemText
              primary={
                <span>
                  {language.flag} {language.label}
                </span>
              }
            />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default LanguageSelector;
