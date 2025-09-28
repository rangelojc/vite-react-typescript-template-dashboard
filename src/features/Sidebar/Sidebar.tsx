import logoSm from "@/assets/images/favicon.png";
import logo from "@/assets/images/logo.png";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import useSidebarItems from "@/data/sidebarData";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/store/store";
import { SidebarClose, SidebarOpen } from "lucide-react";
import { FaBars } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { Show } from "../../components/Show";
import AvatarSection from "./AvatarSection";

export default function Sidebar() {
  // const { t } = useTranslation();
  const location = useLocation();

  const sidebarItems = useSidebarItems();
  const sidebarExpanded = useAppStore((s) => s.sidebarExpanded);
  const toggleSidebar = useAppStore((s) => s.toggleSidebar);

  return (
    <>
      <Show when={sidebarExpanded}>
        {() => (
          <div
            className="fixed inset-0 z-40 bg-black/40 md:hidden"
            onClick={toggleSidebar}
          />
        )}
      </Show>

      <aside
        className={cn(
          "bg-white dark:bg-neutral-900 text-foreground transition-all p-2 flex flex-col justify-end z-50",
          "fixed top-0 left-0 h-full",
          "md:relative md:z-auto md:flex",
          sidebarExpanded
            ? "w-[var(--sidebar-width)]"
            : "w-[var(--sidebar-width-sm)]",
          !sidebarExpanded && "md:!w-[var(--sidebar-width-sm)]",
          !sidebarExpanded && "md:static md:translate-x-0",
          sidebarExpanded ? "translate-x-0" : "-translate-x-full",
          "md:translate-x-0",
          "transition-all duration-200 ease-in-out"
        )}
      >
        <div className="w-full h-fit whitespace-nowrap">
          <div
            className={cn(
              "flex-row-center h-fit mt-2 mb-4 w-full flex justify-center flex-none overflow-hidden",
              { "!h-fit": !sidebarExpanded }
            )}
          >
            <div
              className={cn(
                "flex-none h-fit rounded-md p-1 flex-row-center dark:bg-white overflow-hidden",
                { "!p-1": !sidebarExpanded }
              )}
            >
              <img
                src={sidebarExpanded ? logo : logoSm}
                className={cn("w-fit transition-all flex-none h-[80px]", {
                  "!h-[25px]": !sidebarExpanded,
                })}
              />
            </div>
          </div>

          <Show when={sidebarExpanded}>
            {() => (
              <>
                <h2 className="px-2 mb-2 font-semibold text-center">
                  Dashboard
                </h2>
                <Accordion
                  type="multiple"
                  className="w-full px-2"
                  defaultValue={sidebarItems.flatMap(
                    (section) => `section-${section.id}`
                  )}
                >
                  {sidebarItems.map((section) => (
                    <AccordionItem
                      key={section.id}
                      value={`section-${section.id}`}
                      className="border-none"
                    >
                      <AccordionTrigger className="hover:underline py-2 flex items-center gap-x-2 text-base cursor-pointer">
                        <span className="flex-1 font-medium">
                          {section.title}
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className="flex flex-col">
                        {section.children.map((item) => (
                          <Link
                            key={item.title}
                            to={item.route}
                            className={cn(
                              "flex items-center gap-2 hover:underline text-base py-1 px-2 rounded",
                              location.pathname === item.route &&
                                "bg-gray-100 dark:bg-neutral-700 text-foreground font-semibold"
                            )}
                          >
                            <item.icon className="size-4" />
                            <span>{item.title}</span>
                          </Link>
                        ))}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </>
            )}
          </Show>

          <Show when={!sidebarExpanded}>
            {() => (
              <div className="flex flex-col items-center gap-2">
                {sidebarItems.map((section, index) => (
                  <div
                    key={section.id}
                    className="flex flex-col items-center w-full"
                  >
                    {section.children.map((item) => (
                      <Link
                        key={item.id}
                        to={item.route}
                        className={cn(
                          "w-10 h-10 flex items-center justify-center rounded hover:bg-gray-200 hover:dark:bg-neutral-600",
                          location.pathname === item.route &&
                            "bg-gray-200 dark:bg-neutral-700 text-foreground"
                        )}
                        title={item.title}
                      >
                        <item.icon className="size-4" />
                      </Link>
                    ))}
                    {/* Pretty separator, skip after last section */}
                    {index !== sidebarItems.length - 1 && (
                      <div className="w-6 h-px bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300 dark:from-neutral-600 dark:via-neutral-700 dark:to-neutral-600 my-2" />
                    )}
                  </div>
                ))}
              </div>
            )}
          </Show>
        </div>

        <div className="mt-auto w-full space-y-4">
          <AvatarSection />
        </div>
      </aside>
    </>
  );
}

export const DesktopSidebarButton = () => {
  const toggleSidebar = useAppStore((s) => s.toggleSidebar);
  const sidebarExpanded = useAppStore((s) => s.sidebarExpanded);

  return (
    <Button
      variant={"ghost"}
      onClick={toggleSidebar}
      className="absolute bottom-2 left-0 !px-1 !py-4 bg-white dark:bg-neutral-900 rounded-l-none group border-none !text-foreground hidden md:flex"
    >
      <div className="group-hover:opacity-100 opacity-50 transition">
        <Show
          when={sidebarExpanded}
          fallback={<SidebarOpen className="size-5 " />}
        >
          {() => <SidebarClose className="size-5" />}
        </Show>
      </div>
    </Button>
  );
};

export const MobileSidebarButton = () => {
  const toggleSidebar = useAppStore((s) => s.toggleSidebar);
  // const sidebarExpanded = useAppStore((s) => s.sidebarExpanded);

  return (
    <Button
      variant={"ghost"}
      onClick={toggleSidebar}
      className="!px-0 block md:hidden"
    >
      <FaBars className="size-5 text-neutral-900 dark:!text-white" />
    </Button>
  );
};
