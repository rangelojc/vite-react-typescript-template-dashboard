import { RouteDefinition } from "@/types/app";
import { Home, LayoutDashboard, LucideProps, UserCog } from "lucide-react";
import type { ForwardRefExoticComponent } from "react";

export interface NavItem {
  id: number;
  title: string;
  route: RouteDefinition;
  icon: ForwardRefExoticComponent<Omit<LucideProps, "ref">>;
}

export interface SidebarItem {
  id: number;
  title: string;
  icon: ForwardRefExoticComponent<Omit<LucideProps, "ref">>;
  children: NavItem[];
}

export default function useSidebarItems() {
  return [
    {
      id: 1,
      title: "Management",
      icon: LayoutDashboard,
      children: [
        {
          id: 101,
          title: "Home",
          route: RouteDefinition.INDEX,
          icon: Home,
        },
        {
          id: 102,
          title: "Users",
          route: RouteDefinition.USERS,
          icon: UserCog,
        },
      ],
    },
  ];
}
