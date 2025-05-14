import { useUserStore } from "@core/context/userStore";

export const BadgeUser = () => {
  const user = useUserStore((s) => s.user);
  return (
    <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
      <span className="text-sm font-medium text-primary-foreground uppercase">
        {user?.firstName[0]}
        {user?.lastName[0]}
      </span>
    </div>
  );
};
