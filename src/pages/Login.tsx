import { isApiSuccess } from "@/api/functions";
import useLoginMutation from "@/api/mutations/useLoginMutation";
import logo from "@/assets/images/logo.png";
import CustomHelmet from "@/components/CustomHelmet";
import { Page, Wrapper } from "@/components/LayoutWidgets";
import { Show } from "@/components/Show";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UNAUTHENTICATED } from "@/hooks/useAuth";
import { initI18n } from "@/i18n";
import { useAppStore } from "@/store/store";
import { RouteDefinition } from "@/types/app";
import { Loader } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

initI18n();

const Login = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [form, setForm] = useState({ id: "", password: "" });
  const [error, setError] = useState<string>();

  const [loginMessageModal, setLoginMessageModal] = useState<string>();

  const [searchParams] = useSearchParams();
  const { mutateAsync: login, isPending } = useLoginMutation();

  const setIsLoggedIn = useAppStore((s) => s.setIsLoggedIn);

  useEffect(() => {
    const unauth = searchParams.get(UNAUTHENTICATED) === "true";
    if (unauth) setLoginMessageModal(t("error.notLoggedIn"));
  }, [searchParams, t]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const rsp = await login({ form });

    if (!rsp) return;

    if (!isApiSuccess(rsp)) {
      setError(rsp.error?.error);
      return;
    }

    setIsLoggedIn(true);
    navigate(RouteDefinition.INDEX);
  };

  return (
    <>
      <CustomHelmet title={t(`title.login`)} />

      <Page className="flex flex-col-center xxs:justify-center relative ">
        <Wrapper className="flex-col-center z-2 relative">
          <Card className="w-full max-w-md shadow-none border-none rounded-sm px-4 py-4 pb-12 bg-transparent">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">
                <div className="w-full h-fit flex-row-center md:mb-8">
                  <div className="dark:bg-white rounded p-2 flex-row-center size-fit overflow-hidden">
                    <img
                      src={logo}
                      className="h-[120px] w-fit object-contain"
                    />
                  </div>
                </div>
                <h1>Login</h1>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-muted-foreground">
                    User ID
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="text"
                    value={form.id}
                    onChange={handleChange}
                    required
                    className="placeholder:text-muted-foreground bg-background"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-muted-foreground">
                    {t("password")}
                  </Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    // placeholder="••••"
                    value={form.password}
                    onChange={handleChange}
                    required
                    className="placeholder:text-muted-foreground bg-background"
                  />
                </div>
                <p className="text-red-500 w-full text-left min-h-6 -mt-4">
                  {error}
                </p>
                <Button
                  disabled={isPending}
                  variant="default"
                  type="submit"
                  size="lg"
                  className="w-full flex-row-center text-base"
                >
                  <Show when={!isPending}>{() => t("login")}</Show>
                  <Show when={isPending}>
                    {() => <Loader className="size-4 animate-spin" />}
                  </Show>
                </Button>
              </form>
            </CardContent>
          </Card>
        </Wrapper>
      </Page>

      <LoginMessageDialog
        open={loginMessageModal}
        setOpen={setLoginMessageModal}
      />
    </>
  );
};

const LoginMessageDialog = (props: {
  open: string | undefined;
  setOpen: Dispatch<SetStateAction<string | undefined>>;
}) => {
  const { open, setOpen } = props;
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const onClose = () => {
    setOpen(undefined);
    navigate({
      pathname: location.pathname,
      search: "",
    });
  };

  return (
    <Dialog
      open={!!open}
      onOpenChange={(val) => setOpen(val ? open : undefined)}
    >
      <DialogContent className="w-full md:max-w-md">
        <DialogHeader>
          <DialogDescription className="mt-2 text-base">
            {open}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="mt-8">
          <DialogClose asChild>
            <Button variant="default" onClick={onClose}>
              {t("OK")}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Login;
