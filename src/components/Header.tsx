import { Button } from "@/components/ui/button";
import { useAppStore } from "@/store/store";
import { Menu } from "lucide-react";

export default function Header() {
  const toggleSidebar = useAppStore((s) => s.toggleSidebar);

  return (
    <header className="bg-neutral-700 w-full h-[var(--header-height)] flex items-center justify-between text-white shadow-md px-2">
      <Button variant="link" size="icon" onClick={toggleSidebar}>
        <Menu className="size-5" />
      </Button>
    </header>
  );
}
