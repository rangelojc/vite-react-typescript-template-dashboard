import { ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";

export default function BackButton(props: { onClick: () => void }) {
  return (
    <Button
      variant="outline"
      size="sm"
      className="text-xs"
      onClick={props.onClick}
    >
      <ArrowLeft size={12} />
      <span>Back</span>
    </Button>
  );
}
