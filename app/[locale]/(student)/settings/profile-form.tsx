"use client";

import { useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { updateProfile } from "./action";
import { User, Mail, Phone, School, X, Check, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface Profile {
  first_name?: string;
  last_name?: string;
  email?: string;
  contact?: string;
  school?: string;
}

interface ProfileFormProps {
  initialProfile: Profile;
  userId: string;
}

export default function ProfileForm({
  initialProfile,
  userId,
}: ProfileFormProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [profile, setProfile] = useState<Profile>(initialProfile);

  // Handle form submission using server action
  async function handleSave() {
    setIsSaving(true);
    setMessage({ type: "", text: "" });

    try {
      // Call the server action
      const result = await updateProfile({
        userId,
        first_name: profile.first_name,
        last_name: profile.last_name,
        contact: profile.contact,
        school: profile.school,
      });

      if (!result.success) {
        throw new Error(result.error || "Failed to update profile");
      }

      setMessage({ type: "success", text: "Profile updated successfully!" });
      setIsEditing(false);
    } catch (error) {
      console.error("Update error:", error);
      setMessage({
        type: "error",
        text:
          error instanceof Error ? error.message : "Failed to update profile",
      });
    } finally {
      setIsSaving(false);
    }
  }

  // Field rendering helper
  function renderField(
    label: string,
    field: keyof Profile,
    icon: LucideIcon,
    editable = true
  ) {
    const Icon = icon;
    return (
      <div className="space-y-2">
        <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
          <Icon className="h-4 w-4" />
          {label}
        </label>

        {isEditing && editable ? (
          <Input
            value={profile[field] || ""}
            onChange={(e) =>
              setProfile({ ...profile, [field]: e.target.value })
            }
            className="w-full bg-muted/50"
            placeholder={`Enter your ${label.toLowerCase()}`}
          />
        ) : (
          <p className="text-base font-medium py-2 px-3 rounded-md">
            {profile[field] || "Not set"}
          </p>
        )}
      </div>
    );
  }

  return (
    <Card className="w-full mx-auto">
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold tracking-tight">Profile</h2>
          <Button
            onClick={() => {
              if (
                isEditing &&
                JSON.stringify(profile) !== JSON.stringify(initialProfile)
              ) {
                if (confirm("Discard changes?")) {
                  setProfile(initialProfile);
                  setIsEditing(false);
                }
              } else {
                setIsEditing(!isEditing);
              }
            }}
            variant={isEditing ? "ghost" : "outline"}
            size="sm"
            className={cn(
              "gap-2",
              isEditing && "text-red-500 hover:text-red-500 hover:bg-red-50"
            )}
          >
            {isEditing ? (
              <>
                <X className="h-4 w-4" />
                Cancel
              </>
            ) : (
              "Edit Profile"
            )}
          </Button>
        </div>
        {message.text && (
          <div
            className={cn(
              "p-3 rounded-lg text-sm flex items-center gap-2",
              message.type === "error"
                ? "bg-red-100 text-red-700"
                : "bg-emerald-100 text-emerald-700"
            )}
          >
            {message.type === "error" ? (
              <X className="h-4 w-4" />
            ) : (
              <Check className="h-4 w-4" />
            )}
            {message.text}
          </div>
        )}
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          {renderField("First Name", "first_name", User)}
          {renderField("Last Name", "last_name", User)}
        </div>
        {renderField("Email", "email", Mail, false)}
        {renderField("Contact", "contact", Phone)}
        {renderField("School", "school", School)}

        {/* Save button */}
        {isEditing && (
          <div className="flex justify-end pt-4">
            <Button onClick={handleSave} disabled={isSaving} className="gap-2">
              {isSaving ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Saving...
                </>
              ) : (
                <>
                  <Check className="h-4 w-4" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
