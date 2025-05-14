import { useUserStore } from "@core/context/userStore";

interface Props {
  size?: "sm" | "md" | "lg" | "xl";
}

export const BadgeUser: React.FC<Props> = ({ size = "md" }) => {
  const user = useUserStore((s) => s.user);

  // Size mappings
  const sizeClasses = {
    sm: "h-6 w-6 text-xs",
    md: "h-8 w-8 text-sm",
    lg: "h-12 w-12 text-base",
    xl: "h-32 w-32 text-4xl",
  };

  return (
    <div className={`rounded-full bg-primary flex items-center justify-center ${sizeClasses[size]}`}>
      <span className="font-medium text-primary-foreground uppercase">
        {user?.firstName?.[0]}
        {user?.lastName?.[0]}
      </span>
    </div>
  );
};