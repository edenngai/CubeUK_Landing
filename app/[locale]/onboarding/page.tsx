"use client";

import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { SubmitButton } from "../components/SubmitButton";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "@/i18n/navigation";
import { PhoneInput } from "@/components/ui/phone-input";
import { phoneNumberSchema } from "@/validation/phoneNumberSchema";
import { onboardUser } from "./action";

const formSchema = z.object({
  firstName: z.string().min(2).max(150),
  lastName: z.string().min(2).max(150),
  contact: phoneNumberSchema,
  school: z.string().min(3).max(150),
});

export default function Onboarding() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      contact: "",
      school: "",
    },
  });

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    setServerError(null);
    setIsLoading(true); // Set loading to true

    try {
      const response = await onboardUser({
        firstName: data.firstName,
        lastName: data.lastName,
        contact: data.contact,
        school: data.school,
      });
      if (response.error) {
        setServerError(response.message);
      } else {
        // Redirect to the dashboard page
        router.push("/dashboard");
      }
    } catch (error) {
      setServerError("error found");
    } finally {
      setIsLoading(false); // Set loading to false
    }
  };

  return (
    <main>
      <div className="flex h-screen">
        {/* login */}
        <div className="flex-1 h-full">
          <div className="flex flex-col justify-center h-screen">
            <div className="max-w-md w-full mx-auto rounded-2xl p-8">
              <Form {...form}>
                {" "}
                <form onSubmit={form.handleSubmit(handleSubmit)}>
                  <div className="space-y-6">
                    <div className="flex flex-col justify-center space-y-2">
                      <h1 className="text-2xl font-bold text-center">
                        Tell us a bit about yourself
                      </h1>
                      <h1 className="text-muted-foreground text-center">
                        You can always make changes later
                      </h1>
                    </div>

                    <div className="flex gap-x-4">
                      {/* First Name Field */}
                      <div className="flex-1">
                        <FormField
                          control={form.control}
                          name="firstName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-muted-background text-sm">
                                First Name
                              </FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  type="text"
                                  placeholder="Your first name"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      {/* Last Name Field */}
                      <div className="flex-1">
                        <FormField
                          control={form.control}
                          name="lastName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-muted-background text-sm">
                                Last Name
                              </FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  type="text"
                                  placeholder="Your last name"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    {/* Phone Number Field */}
                    <FormField
                      control={form.control}
                      name="contact"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-muted-background text-sm">
                            Contact
                          </FormLabel>
                          <FormControl>
                            <PhoneInput
                              {...field}
                              placeholder="Enter phone number"
                              defaultCountry="GB" // Set default country to UK
                              international
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* School Field */}
                    <FormField
                      control={form.control}
                      name="school"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-muted-background text-sm">
                            School
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="text"
                              placeholder="Enter school name"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {serverError && (
                    <p className="text-red-500 text-sm mt-2">{serverError}</p>
                  )}

                  {/* Login Button */}
                  <div className="mt-10">
                    <SubmitButton
                      text="Proceed"
                      isLoading={isLoading}
                      className="w-full py-5 px-4 text-sm tracking-wider font-semibold rounded-md text-white bg-primary focus:outline-none "
                    />
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
