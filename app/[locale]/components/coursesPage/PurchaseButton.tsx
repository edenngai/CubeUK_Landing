"use client";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { purchaseCourse } from "../../actions/purchaseCourse";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "@/i18n/navigation";

export default function PurchaseButton({
  price,
  courseId,
  fromCoursePage = false,
}: {
  price: number;
  courseId: string;
  fromCoursePage?: boolean;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const router = useRouter();

  const handlePurchase = async () => {
    setIsLoading(true);
    try {
      if (fromCoursePage) {
        // If accessed from courses page, redirect to dashboard
        router.push(`/dashboard/${courseId}`);
        return;
      }

      const result = await purchaseCourse(courseId);

      if (result.success) {
        setIsEnrolled(true);
        toast.success("Successfully enrolled in the course!");
      } else {
        toast.error(result.error || "Failed to enroll in the course");
      }
    } catch (error) {
      console.error("Error purchasing course:", error);
      toast.error("Failed to enroll in the course");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={cn(
        "mt-5 inline-flex items-center justify-center w-full h-10 rounded-md text-center text-sm font-medium transition-all duration-300 ease-in-out",
        isEnrolled
          ? "bg-green-500 text-white"
          : "bg-primary text-primary-foreground hover:bg-primary/90"
      )}
    >
      {isEnrolled ? (
        <div className="flex items-center justify-center w-full h-full">
          Enrolled
        </div>
      ) : (
        <button
          className="flex items-center justify-center w-full h-full"
          onClick={handlePurchase}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {fromCoursePage ? "Redirecting..." : "Enrolling..."}
            </>
          ) : price === 0 ? (
            "Enroll for Free"
          ) : (
            `Buy for $${price}`
          )}
        </button>
      )}
    </div>
  );
}
