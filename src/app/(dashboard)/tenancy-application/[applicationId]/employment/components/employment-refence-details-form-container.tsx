import { z } from "zod";
import { UseFormReturn } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { formSchema } from "./formSchema";

export default function EmploymentRefenceDetailsFormContainer({
  form,
}: {
  form: UseFormReturn<z.infer<typeof formSchema>, unknown>;
}) {
  return (
    <div className="rounded-lg border-2 border-violet-200 border-solid px-5 py-5">
      <h2 className="text-base font-semibold leading-7 text-gray-900">
        Employment Reference
      </h2>

      <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div className="sm:col-span-3">
          <FormField
            control={form.control}
            name="employmentReference.fullname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Reference Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Full name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="sm:col-span-3">
          <FormField
            control={form.control}
            name="employmentReference.position"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Reference Position</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="e.g. Manager" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="sm:col-span-3">
          <FormField
            control={form.control}
            name="employmentReference.phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone number</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="e.g. 3222-9990" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="sm:col-span-3">
          <FormField
            control={form.control}
            name="employmentReference.emailAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Email address" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="col-span-full">
          <FormField
            control={form.control}
            name="employmentReference.refereeAuthority"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="font-normal">
                    I give the authority to my Referees to release all my
                    personal information relating to my rental application. I
                    acknowledge the reference answers are confidential between
                    the real estate agent and the referee.{" "}
                    <Link
                      className="text-primary font-semibold"
                      href="/examples/forms"
                    >
                      View the terms.
                    </Link>
                  </FormLabel>
                </div>
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
}
