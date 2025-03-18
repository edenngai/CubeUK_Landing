"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { passwordMatchSchema } from "@/validation/passwordMatchSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { registerUser } from "./action";
import { SubmitButton } from "../components/SubmitButton";
import { Link, useRouter } from "@/i18n/navigation";

const formSchema = z
  .object({
    email: z.string().email(),
  })
  .and(passwordMatchSchema);

export default function Signup() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      passwordConfirm: "",
    },
  });

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    setServerError(null);
    setIsLoading(true); // Set loading to true

    try {
      const response = await registerUser({
        email: data.email,
        password: data.password,
        passwordConfirm: data.passwordConfirm,
      });

      if (response.error) {
        setServerError(response.message);
      } else {
        // Redirect to the confirmation page
        router.push("/signup/confirmation");
      }
    } catch (error) {
      setServerError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false); // Set loading to false
    }
  };

  return (
    <main>
      <div className="flex h-screen">
        {/* Signup form */}
        <div className="flex-1 h-full">
          <div className="flex flex-col justify-center h-screen">
            <div className="max-w-md w-full mx-auto rounded-2xl p-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)}>
                  <div className="space-y-6">
                    <div className="flex justify-center">
                      <h1 className="text-2xl font-bold text-center">
                        Create an account
                      </h1>
                    </div>

                    {/* Email Field */}
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-muted-background text-sm">
                            Email
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="text"
                              placeholder="Enter email"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Password Field */}
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-muted-background text-sm">
                            Password
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="password"
                              placeholder="Enter password"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Confirm Password Field */}
                    <FormField
                      control={form.control}
                      name="passwordConfirm"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-muted-background text-sm">
                            Confirm Password
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="password"
                              placeholder="Enter confirm password"
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
                      text="Create an account"
                      isLoading={isLoading}
                      className="w-full py-5 px-4 text-sm tracking-wider font-semibold rounded-md text-white bg-primary focus:outline-none "
                    />
                  </div>
                </form>
              </Form>
              <p className="text-muted-foreground text-sm mt-6 text-center">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-primary font-semibold hover:underline ml-1"
                >
                  Login here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
