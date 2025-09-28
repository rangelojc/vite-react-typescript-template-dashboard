import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-transparent dark:bg-muted/20 w-full h-[var(--footer-height)] flex-row-center text-xs px-2 text-neutral-500 border-none">
      &copy; {new Date().getFullYear()} {t("footer.msg")}
    </footer>
  );
}
