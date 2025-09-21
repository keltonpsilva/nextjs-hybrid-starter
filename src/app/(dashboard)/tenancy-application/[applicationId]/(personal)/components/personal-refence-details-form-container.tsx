import { z } from "zod";
import { UseFormReturn } from "react-hook-form";
import Link from "next/link";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

import { formSchema } from "./formSchema";

export default function PersonalRefenceDetailsFormContainer({
  form,
}: {
  form: UseFormReturn<z.infer<typeof formSchema>, unknown>;
}) {
  return (
    <div className="rounded-lg border-2 border-violet-200 border-solid px-5 py-5">
      <h2 className="text-base font-semibold leading-7 text-gray-900">
        Personal Reference Details
      </h2>
      <p className="mt-1 text-sm leading-6 text-gray-600">
        Provided by an individual who knows you well and can vouch your
        character and abilities.{" "}
      </p>

      <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div className="sm:col-span-3">
          <FormField
            control={form.control}
            name="personalReference.fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
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
            name="personalReference.relationship"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Relationship</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Define relationship" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="sm:col-span-3">
          <FormField
            control={form.control}
            name="personalReference.relationshipYears"
            render={({ field }) => (
              <FormItem>
                <FormLabel>How many years have you known them?</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Years" type="number" min={0} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="sm:col-span-3">
          <FormField
            control={form.control}
            name="personalReference.relationshipMonths"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-transparent">Relationship</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Months" type="number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="sm:col-span-3">
          <FormField
            control={form.control}
            name="personalReference.emailAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="user@example.com" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="sm:col-span-3">
          <FormField
            control={form.control}
            name="personalReference.phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Phone number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="col-span-full">
          <FormField
            control={form.control}
            name="personalReference.refereeAuthority"
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
