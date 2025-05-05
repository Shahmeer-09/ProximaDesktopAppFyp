import {
  Bell,
  HouseIcon,
  LucideIcon,
  FileIcon,
  Wallet,
  Settings,
} from "lucide-react";

export const MENU_ITEMS = (
  workspaceId: string
): { title: string; href: string; icon: LucideIcon }[] => [
  { title: "My Library", href: `/dashbord/${workspaceId}`, icon: FileIcon },
  { title: "Home", href: `/dashbord/${workspaceId}/home`, icon: HouseIcon },
  {
    title: "Notifications",
    href: `/dashbord/${workspaceId}/notifications`,
    icon: Bell,
  },
  { title: "Billing", href: `/dashbord/${workspaceId}/billing`, icon: Wallet },
  {
    title: "Settings",
    href: `/dashbord/${workspaceId}/settings`,
    icon: Settings,
  },
];
