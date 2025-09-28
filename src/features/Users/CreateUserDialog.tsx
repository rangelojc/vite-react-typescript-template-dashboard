//@ts-nocheck
import { AdminRequest, AdminRole } from "@/api/dto/admins";
import useAdminCreateMutation from "@/api/mutations/useAdminCreateMutation";
import { ADMINS_QUERY_KEY } from "@/api/queries/useAdminsQuery";
import { Show } from "@/components/Show";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Label } from "@radix-ui/react-label";
import { useQueryClient } from "@tanstack/react-query";
import { Loader, PlusCircle } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

interface ICreateUserDialog {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const CreateUserDialog = ({ open, setOpen }: ICreateUserDialog) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<AdminRequest>({
    defaultValues: {
      username: "",
      password: "",
      role: "admin",
    },
  });

  const { mutateAsync, isPending } = useAdminCreateMutation();

  useEffect(() => {
    if (open) reset();
  }, [open, reset]);

  const onSubmit = async (data: AdminRequest) => {
    await mutateAsync({
      form: {
        username: data.username,
        password: data.password,
        role: data.role,
      },
    });

    setOpen(false);
    queryClient.invalidateQueries({ queryKey: [ADMINS_QUERY_KEY] });
    reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl font-normal">
            <PlusCircle className="size-4" />
            {t("Create Admin")}
          </DialogTitle>
        </DialogHeader>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <Label htmlFor="name" className="text-muted-foreground">
              Name
            </Label>
            <Input
              id="name"
              type="text"
              className={cn(
                "text-lg font-medium",
                errors.username && "border-destructive"
              )}
              {...register("username", { required: "Username is required" })}
            />
            {errors.username && (
              <p className="text-sm text-destructive">
                {errors.username.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-muted-foreground">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              className={cn(
                "text-lg font-medium",
                errors.password && "border-destructive"
              )}
              {...register("password", {
                required: "Password is required",
              })}
            />
            {errors.password && (
              <p className="text-sm text-destructive">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="role" className="text-muted-foreground">
              Role
            </Label>
            <Select
              value={watch("role")}
              onValueChange={(value) => setValue("role", value as AdminRole)}
            >
              <SelectTrigger
                className={cn(
                  "text-sm font-medium",
                  errors.role && "border-destructive"
                )}
              >
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="super">Super</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="manager">Manager</SelectItem>
              </SelectContent>
            </Select>
            {errors.role && (
              <p className="text-sm text-destructive">{errors.role.message}</p>
            )}
          </div>

          <Button
            type="submit"
            variant="secondary"
            className="w-full text-base font-medium mt-4"
            disabled={isPending}
          >
            <Show when={!isPending}>{() => t("submit")}</Show>
            <Show when={isPending}>
              {() => <Loader className="size-6 animate-spin" />}
            </Show>
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateUserDialog;
