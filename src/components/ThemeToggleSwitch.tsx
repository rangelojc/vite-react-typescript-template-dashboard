import { useTheme } from "@/context/ThemeProvider";
import { cn } from "@/lib/utils";
import * as Switch from "@radix-ui/react-switch";
import { Moon, Sun } from "lucide-react";

const ThemeToggleSwitch = () => {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <Switch.Root
      checked={isDark}
      onCheckedChange={(val) => setTheme(val ? "dark" : "light")}
      className={cn(
        "absolute top-3 right-4 z-10 inline-flex h-6 w-10 flex-none cursor-pointer items-center rounded bg-gray-200 transition-colors data-[state=checked]:bg-neutral-600"
      )}
    >
      <Switch.Thumb
        className={cn(
          "pointer-events-none absolute left-0 top-[2px] h-5 w-1/2  rounded bg-white shadow-lg transition-transform duration-200 flex items-center justify-center",
          "translate-x-[1px] data-[state=checked]:translate-x-[100%]"
        )}
      >
        {isDark ? (
          <Moon className="size-4 text-purple-600" />
        ) : (
          <Sun className="size-4 text-yellow-400" />
        )}
      </Switch.Thumb>
    </Switch.Root>
  );
};

export default ThemeToggleSwitch;
