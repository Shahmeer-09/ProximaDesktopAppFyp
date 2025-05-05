import React from "react";
import { LucideIcon } from "lucide-react";
interface MenuItemProps {
  icon: LucideIcon | string;
  title: string;
  description: string;
  className?: string;
}

const MenuItem: React.FC<MenuItemProps> = ({
  icon:Icon,
  title,
  description,
  className = "",
}) => {
  return (
    <li
      className={`flex gap-3 items-start py-2 max-w-full min-h-[61px] w-[376px] ${className}`}
    >
      {Icon && (
        <Icon className="w-6 h-6 text-primary" />
      )}
      <div className="flex-1 shrink basis-0 min-w-60">
        <h4 className="text-base font-semibold">{title}</h4>
        <p className="text-sm">{description}</p>
      </div>
    </li>
  );
};

export default MenuItem;
