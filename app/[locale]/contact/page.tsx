"use client";

import { Footer } from "../components/landingPage/Footer";
import Navbar from "../components/landingPage/Navbar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SubmitButton } from "../components/SubmitButton";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { PhoneInput } from "@/components/ui/phone-input";

// Define the type for form data
interface FormData {
  fullName: string;
  emailAddress: string;
  contactNumber: string;
  school: string;
  examBoard: string;
  helpMessage: string;
}

export default function Courses() {
  // Initialize the form using react-hook-form
  const form = useForm<FormData>();

  // Handle form submission
  const onSubmit = (data: FormData) => {
    console.log(data); // Handle form data
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Navbar />
      <div className="min-h-screen flex items-center justify-center my-12">
        <div className="px-10 lg:p-0 lg:w-3/6 flex flex-col text-center gap-12">
          <div className="text-3xl font-bold">Contact Us</div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-7"
            >
              {/* Full Name */}
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem className="text-left">
                    <FormLabel className="font-medium sm:text-base">
                      Full Name <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your name"
                        {...field}
                        className="px-3 py-5 text-sm md:text-base"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email Address */}
              <FormField
                control={form.control}
                name="emailAddress"
                render={({ field }) => (
                  <FormItem className="text-left">
                    <FormLabel className="font-medium sm:text-base">
                      Email address <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter email"
                        {...field}
                        className="px-3 py-5 text-sm md:text-base"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Contact Number */}
              <FormField
                control={form.control}
                name="contactNumber"
                render={({ field }) => (
                  <FormItem className="text-left">
                    <FormLabel className="font-medium sm:text-base">
                      Contact <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <PhoneInput
                        placeholder="Enter phone number"
                        value={field.value} // Bind the form value to the PhoneInput
                        onChange={field.onChange} // Update the form value on change
                        defaultCountry="GB" // Set default country to UK
                        className="text-sm md:text-base"
                        international
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* School */}
              <FormField
                control={form.control}
                name="school"
                render={({ field }) => (
                  <FormItem className="text-left">
                    <FormLabel className="font-medium sm:text-base">
                      School <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter school name"
                        {...field}
                        className="px-3 py-5 text-sm md:text-base"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Exam Board */}
              <FormField
                control={form.control}
                name="examBoard"
                render={({ field }) => (
                  <FormItem className="text-left">
                    <FormLabel className="font-medium sm:text-base">
                      Exam board <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-full px-3 py-5 text-sm md:text-base">
                          <SelectValue placeholder="Select your exam board" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="IBDP">IBDP</SelectItem>
                          <SelectItem value="IBMYP">IBMYP</SelectItem>
                          <SelectItem value="IGCSE / GCSE">
                            IGCSE / GCSE
                          </SelectItem>
                          <SelectItem value="A-Levels (IAL/EDEXCEL/OCR/AQA/CIE/EDUQAS)">
                            A-Levels (IAL/EDEXCEL/OCR/AQA/CIE/EDUQAS)
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* How Can We Help You */}
              <FormField
                control={form.control}
                name="helpMessage"
                render={({ field }) => (
                  <FormItem className="text-left">
                    <FormLabel className="font-medium sm:text-base">
                      How can we help you{" "}
                      <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Let us know how we can help you. What kind of tutoring or educational services are you interested in? Do you have any questions or concerns? We're here to provide the guidance you need."
                        {...field}
                        className="min-h-[150px] px-3 py-2 text-sm md:text-base" // Set a minimum height
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <SubmitButton
                text="Submit"
                variant="default"
                className="mt-4 py-5 w-full"
              />
            </form>
          </Form>
        </div>
      </div>
      <Footer />
    </section>
  );
}
