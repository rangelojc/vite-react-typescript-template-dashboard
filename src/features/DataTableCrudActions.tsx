import { Show } from "@/components/Show";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit, Ellipsis, Trash } from "lucide-react";
import { useTranslation } from "react-i18next";

const DataTableCrudActions = (props: {
  openUpdateModal?: () => void;
  openDeleteModal?: () => void;
}) => {
  const { t } = useTranslation();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="border !m-0">
          <Ellipsis />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <Show when={!!props.openUpdateModal}>
          {() => (
            <DropdownMenuItem onClick={props.openUpdateModal}>
              <Edit />
              <span>{t("update")}</span>
            </DropdownMenuItem>
          )}
        </Show>
        <Show when={!!props.openDeleteModal}>
          {() => (
            <DropdownMenuItem
              onClick={props.openDeleteModal}
              className="text-red-500"
            >
              <Trash className="text-red-500" />
              <span>{t("delete")}</span>
            </DropdownMenuItem>
          )}
        </Show>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DataTableCrudActions;
