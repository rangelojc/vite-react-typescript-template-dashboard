import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import { useAppStore } from "../store/store";
import en from "./locale/en.json";
import ko from "./locale/ko.json";

export const initI18n = () => {
  i18n.use(initReactI18next).init({
    resources: {
      en: {
        translation: en,
      },
      ko: {
        translation: ko,
      },
    },
    lng: useAppStore.getState().language || "ko",
    fallbackLng: "ko",
    interpolation: {
      escapeValue: false,
    },
  });
};
