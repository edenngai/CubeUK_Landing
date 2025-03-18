"use client";

import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { Lock, PlayCircle } from "lucide-react";

interface iAppProps {
  chapterId: string;
  label: string;
  courseId: string;
  isLocked: boolean;
  isOverview?: boolean;
  basePath?: string;
}

export default function SidebarItem({
  chapterId,
  label,
  courseId,
  isLocked,
  isOverview = false,
  basePath = "/courses", // Default to /courses if basePath is not provided
}: iAppProps) {
  const router = useRouter();
  const pathname = usePathname();

  const Icon = isLocked ? Lock : PlayCircle;

  // Check if the current route is active
  const isActive = pathname?.includes(chapterId);

  // Handle navigation
  const onClick = () => {
    if (isOverview) {
      router.push(`${basePath}/${courseId}/overview`);
    } else {
      router.push(`${basePath}/${courseId}/chapters/${chapterId}`);
    }
  };

  return (
    <Button
      variant="secondary"
      onClick={onClick}
      className={cn(
        "relative flex items-center gap-x-2 text-slate-500 text-sm font-[500] pl-6 pr-4 transition-all hover:text-slate-700 hover:bg-primary/10 dark:hover:bg-slate-700/20 w-full text-left justify-start h-14 rounded-none",
        isActive &&
          "text-slate-700 bg-primary/30 hover:bg-primary-/20 hover:text-slate-700 dark:text-slate-300 dark:bg-slate-900 dark:hover:bg-slate-700/20 dark:hover:text-slate-100"
      )}
    >
      <div className="flex items-center gap-x-2 py-4">
        <Icon
          size={22}
          className={cn(
            "text-slate-500",
            isActive && "text-slate-700 dark:text-slate-300"
          )}
        />
        <span className="flex-1">{label}</span>
      </div>
      <div
        className={cn(
          "absolute right-0 top-0 opacity-0 border-4 border-slate-700 dark:border-slate-600 h-full transition-all",
          isActive && "opacity-100"
        )}
      />
    </Button>
  );
}
