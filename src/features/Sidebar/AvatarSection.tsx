import useLogoutMutation from "@/api/mutations/useLogoutMutation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/store/store";
import { RouteDefinition } from "@/types/app";
import { LogOut, User } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Show } from "../../components/Show";

const AvatarSection = () => {
  const navigate = useNavigate();

  const sidebarExpanded = useAppStore((s) => s.sidebarExpanded);
  const toggleSidebar = useAppStore((s) => s.toggleSidebar);
  const setIsLoggedIn = useAppStore((s) => s.setIsLoggedIn);

  const { mutateAsync: logout } = useLogoutMutation();

  const onLogout = async () => {
    await logout();
    setIsLoggedIn(false);
    navigate(RouteDefinition.LOGIN);
  };

  return (
    <div
      className={cn(
        "flex-row-v-center gap-x-4 w-full self-end px-2 mb-2",
        !sidebarExpanded && "!px-0 flex-row-center"
      )}
    >
      <Avatar
        className={cn(
          "bg-transparent border rounded-full size-10 p-1 transition",
          !sidebarExpanded && "cursor-pointer hover:brightness-125"
        )}
        onClick={sidebarExpanded ? undefined : toggleSidebar}
      >
        <AvatarImage
          src={undefined}
          className="object-contain  text-foreground dark:text-white"
        />
        <AvatarFallback>
          <User className="size-4 text-foreground dark:text-white" />
        </AvatarFallback>
      </Avatar>

      <Show when={sidebarExpanded}>
        {() => (
          <div className="flex-col-v-center">
            <h4 className="text-sm">admin</h4>

            <LogoutDialog onLogout={onLogout} />
          </div>
        )}
      </Show>
    </div>
  );
};

const LogoutDialog = (props: { onLogout: () => void }) => {
  const { t } = useTranslation();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={"link"}
          size="sm"
          className="!h-5 !m-0 !p-0 !text-xs text-muted-foreground !transition-none"
        >
          <LogOut className="size-[12px]" />
          <span>{t("logout")}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full md:max-w-md">
        <DialogHeader>
          <DialogTitle>{t("logout.confirm")}</DialogTitle>
          <DialogDescription className="mt-2 text-base">
            {t("logout.confirm.message")}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="mt-8">
          <DialogClose asChild>
            <Button variant="ghost" className="text-muted-foreground">
              {t("no")}
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button variant="default" onClick={props.onLogout}>
              {t("yes")}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AvatarSection;
