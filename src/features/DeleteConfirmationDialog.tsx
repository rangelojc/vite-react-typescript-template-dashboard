import { Show } from "@/components/Show";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { UseMutationResult } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";

interface DeleteConfirmationDialogProps<T> {
  data: T | null;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  mutation: () => UseMutationResult<
    { success: boolean; data?: unknown } | void,
    unknown,
    number,
    unknown
  >;
  getMutationParam: (data: T) => number;
}

export function DeleteConfirmationDialog<T>({
  data,
  open,
  setOpen,
  mutation,
  getMutationParam,
}: DeleteConfirmationDialogProps<T>) {
  const { t } = useTranslation();

  const { mutateAsync, isPending } = mutation();

  const handleDeletion = async () => {
    if (!data) return;

    setOpen(false);
    await mutateAsync(getMutationParam(data));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-full md:max-w-md">
        <DialogHeader>
          <DialogTitle>{t("actions.confirmation")}</DialogTitle>
          <DialogDescription className="mt-2 text-base">
            {t("actions.confirmation.msg")}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="mt-8">
          <DialogClose asChild>
            <Button
              variant="ghost"
              className="text-muted-foreground"
              onClick={() => setOpen(false)}
              disabled={isPending}
            >
              {t("no")}
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              variant="default"
              onClick={handleDeletion}
              disabled={isPending}
            >
              <Show when={!isPending}>{() => t("yes")}</Show>
              <Show when={isPending}>
                {() => <Loader className="size-6 animate-spin" />}
              </Show>
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
