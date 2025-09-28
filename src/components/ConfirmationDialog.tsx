import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";

type ConfirmationDialogProps = {
  title?: string;
  message?: string;
  yesText?: string;
  noText?: string;
  onConfirm: () => void;
  onCancel?: () => void;
  singleButton?: boolean;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const ConfirmationDialog = ({
  title = "Confirmation",
  message = "Are you sure?",
  yesText = "Yes",
  noText = "No",
  onConfirm,
  onCancel,
  singleButton = false,
  open,
  onOpenChange,
}: ConfirmationDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full md:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription className="mt-2 text-base">
            {message}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="mt-8">
          {!singleButton && (
            <DialogClose asChild>
              <Button
                variant="ghost"
                className="text-muted-foreground"
                onClick={onCancel}
              >
                {noText}
              </Button>
            </DialogClose>
          )}
          <DialogClose asChild>
            <Button variant="default" onClick={onConfirm}>
              {yesText}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmationDialog;
