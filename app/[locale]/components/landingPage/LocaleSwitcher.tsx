"use client";

import { useParams } from "next/navigation";
import { useTransition } from "react";
import { Locale } from "@/i18n/routing";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useLocale } from "next-intl"; // Import useLocale to get the current locale

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { GlobeIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export default function LocaleSwitcher() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();
  const currentLocale = useLocale(); // Get the current locale

  function changeLocale(nextLocale: Locale) {
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        { pathname, params },
        { locale: nextLocale }
      );
    });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          className="hover:text-primary hover:bg-transparent" // Only change text color on hover
        >
          <GlobeIcon className="size-5" />
          {currentLocale === "en" ? "English" : "繁體中文"}
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Select Language</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col space-y-2">
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start",
              currentLocale === "en" && "bg-accent" // Highlight if current locale is English
            )}
            onClick={() => changeLocale("en")}
          >
            English
          </Button>
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start",
              currentLocale === "zh" && "bg-accent" // Highlight if current locale is Chinese
            )}
            onClick={() => changeLocale("zh")}
          >
            繁體中文
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
