"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { passwordSchema } from "@/validation/passwordSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { loginUser } from "./action";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "../components/SubmitButton";
import { Link, useRouter } from "@/i18n/navigation";

const formSchema = z.object({
  email: z.string().email(),
  password: passwordSchema,
});

export default function LoginForm() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    setServerError(null);
    setIsLoading(true); // Set loading to true

    try {
      const response = await loginUser({
        email: data.email,
        password: data.password,
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

  // pass the email value to forget password page
  const email = form.getValues("email");

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
                    <div className="flex justify-center">
                      <h1 className="text-2xl font-bold text-center">Login</h1>
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
                  </div>

                  {serverError && (
                    <p className="text-red-500 text-sm mt-2">{serverError}</p>
                  )}

                  {/* Login Button */}
                  <div className="mt-10">
                    <SubmitButton
                      text="Login"
                      isLoading={isLoading}
                      className="w-full py-5 px-4 text-sm tracking-wider font-semibold rounded-md text-white bg-primary focus:outline-none "
                    />
                  </div>
                </form>
              </Form>
              <p className="text-muted-background text-sm mt-6 text-center">
                Don&apos;t have an account?{" "}
                <Link
                  href="/signup"
                  className="text-primary font-semibold hover:underline ml-1"
                >
                  Signup here
                </Link>
              </p>
              <p className="text-muted-background text-sm mt-6 text-center">
                Forgot Password?{" "}
                <Link
                  href={`/forgot-password${
                    email ? `?email=${encodeURIComponent(email)}` : ""
                  }`}
                  className="text-primary font-semibold hover:underline ml-1"
                >
                  Reset my password
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
