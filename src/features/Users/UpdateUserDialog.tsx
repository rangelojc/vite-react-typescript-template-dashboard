import { User, UserUpdateRequest } from "@/api/dto/users";
import useUpdateUserMutation from "@/api/mutations/useUpdateUserMutation";
import { USERS_QUERY_KEY } from "@/api/queries/useUsersQuery";
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
import { Loader, Pencil } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

interface IUpdateUserDialog {
  open: boolean;
  setOpen: (open: boolean) => void;
  data?: User | null;
}

const UpdateUserDialog = ({ open, setOpen, data }: IUpdateUserDialog) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<UserUpdateRequest>({
    defaultValues: {
      email: "",
      role: "admin",
      my_promotion_code: "",
      promotion_code: "",
    },
  });

  const { mutateAsync, isPending } = useUpdateUserMutation();

  useEffect(() => {
    if (open && data) {
      reset({
        email: data.email,
        role: data.role,
        my_promotion_code: data.my_promotion_code || "",
        promotion_code: data.promotion_code || "",
      });
    }
  }, [open, data, reset]);

  const onSubmit = async (payload: UserUpdateRequest) => {
    if (!data) return;

    await mutateAsync({
      id: data.id,
      form: payload,
    });

    setOpen(false);
    queryClient.invalidateQueries({ queryKey: [USERS_QUERY_KEY] });
    reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl font-normal">
            <Pencil className="size-4" />
            {t("Update User")}
          </DialogTitle>
        </DialogHeader>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-muted-foreground">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              className={cn(
                "text-lg font-medium",
                errors.email && "border-destructive"
              )}
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="my_promotion_code"
              className="text-muted-foreground"
            >
              My Promotion Code
            </Label>
            <Input
              id="my_promotion_code"
              type="text"
              className={cn(
                "text-lg font-medium",
                errors.my_promotion_code && "border-destructive"
              )}
              {...register("my_promotion_code")}
            />
            {errors.my_promotion_code && (
              <p className="text-sm text-destructive">
                {errors.my_promotion_code.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="promotion_code" className="text-muted-foreground">
              Promotion Code
            </Label>
            <Input
              id="promotion_code"
              type="text"
              className={cn(
                "text-lg font-medium",
                errors.promotion_code && "border-destructive"
              )}
              {...register("promotion_code")}
            />
            {errors.promotion_code && (
              <p className="text-sm text-destructive">
                {errors.promotion_code.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="role" className="text-muted-foreground">
              Role
            </Label>
            <Select
              value={watch("role")}
              onValueChange={(value) => setValue("role", value)}
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
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="user">User</SelectItem>
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
            <Show when={!isPending}>{() => t("Update")}</Show>
            <Show when={isPending}>
              {() => <Loader className="size-6 animate-spin" />}
            </Show>
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateUserDialog;
