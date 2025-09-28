import logo from "@/assets/images/logo.png";
import CustomHelmet from "@/components/CustomHelmet";
import { Wrapper } from "@/components/LayoutWidgets";
import { Show } from "@/components/Show";
import { initI18n } from "@/i18n";
import { useTranslation } from "react-i18next";
import { useRouteError } from "react-router-dom";

initI18n();

export default function ErrorPage() {
  const { t } = useTranslation();
  const error: any = useRouteError();

  const status404 = error.status === 404;

  return (
    <>
      <CustomHelmet title={t(`title.error`)} />

      <main className="relative grid h-screen my-auto place-items-center px-6 py-24 sm:py-32 lg:px-8 ">
        <Wrapper className="w-full !h-full flex-col-center">
          <img src={logo} alt="Logo" className="h-30 md:h-40 mx-auto mb-4" />

          <Show when={status404}>
            {() => (
              <>
                <h4 className="mt-10 text-2xl font-semibold ">
                  {t("errorboundary.title.notfound")}
                </h4>
              </>
            )}
          </Show>

          <Show when={!status404}>
            {() => (
              <>
                <h4 className="mt-10 text-2xl font-semibold">
                  {t("errorboundary.title")}
                </h4>

                <p className="mt-4 italic">{error.statusText}</p>
                <p className="italic">{error.message}</p>
              </>
            )}
          </Show>
        </Wrapper>
      </main>
    </>
  );
}
