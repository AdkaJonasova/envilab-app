import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationEN from "./localization/en.json";
import translationSK from "./localization/sk.json";
import translationCZ from "./localization/cz.json";

const resources = {
  en: {
    translation: translationEN,
  },
  cz: {
    translation: translationCZ,
  },
  sk: {
    translation: translationSK,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem("language") || "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
