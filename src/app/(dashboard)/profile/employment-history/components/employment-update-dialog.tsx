import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";

import { Button, CalendarButton } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { camelCaseToSeparated, cn } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";
import { CountryDropdown } from "@/components/ui/country-dropdown";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { EmploymentType } from "@/shared/contracts/enums";
import { UserEmploymentHistoryResponse } from "@/shared/contracts/responses";

import { useUpdateEmploymentHistory } from "../hooks";

const employmentFormSchema = z.object({
  employerName: z.string({ message: "This field is required" }).min(2, {}),
  employmentType: z.enum(
    [
      EmploymentType.FullTime,
      EmploymentType.PartTime,
      EmploymentType.Contract,
      EmploymentType.Temporary,
      EmploymentType.SelfEmployed,
      EmploymentType.Student,
      EmploymentType.Unemployed,
    ],
    {
      message: "This field is required",
    }
  ),
  jobTitle: z.string({ message: "This field is required" }).min(2, {}),
  employmentStartDate: z.date(),
  employmentEndDate: z.date().optional(),
  annualIncome: z.coerce
    .number({ message: "This field is required" })
    .positive(),
  hrContactName: z.string({ message: "This field is required" }).min(2, {}),
  hrContactEmail: z
    .string({ message: "This field is required" })
    .email("Invalid email address")
    .min(1, {}),
  hrContactPhone: z.string({ message: "This field is required" }).min(2, {}),
  workAddress: z.object({
    streetAddress: z.string({ message: "This field is required" }).min(2, {}),
    city: z.string({ message: "This field is required" }).min(2, {}),
    postCode: z.string({ message: "This field is required" }).min(2, {}),
    country: z.string({ message: "This field is required" }).min(2, {}),
  }),
  isCurrentEmployment: z.boolean(),
});

export function EmploymentUpdateDialog({
  open,
  onOpenChange,
  defaultValues,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultValues: UserEmploymentHistoryResponse;
}) {
  const [dropdown] =
    useState<React.ComponentProps<typeof Calendar>["captionLayout"]>(
      "dropdown"
    );

  const methods = useForm<z.infer<typeof employmentFormSchema>>({
    resolver: zodResolver(employmentFormSchema),
    defaultValues: {
      ...defaultValues,
      employmentStartDate: new Date(defaultValues.employmentStartDate),
      employmentEndDate: defaultValues.employmentEndDate
        ? new Date(defaultValues.employmentEndDate!)
        : undefined,
      isCurrentEmployment: !defaultValues.employmentEndDate,
    },
  });

  const watchIsCurrent = methods.watch("isCurrentEmployment", false);

  const {
    handleSubmit,
    getValues,

    reset,
    formState: { isSubmitting, isValid, isSubmitSuccessful },
  } = methods;

  const { mutateAsync } = useUpdateEmploymentHistory(defaultValues.id, {
    ...getValues(),
    employmentEndDate: !watchIsCurrent
      ? getValues("employmentEndDate")
      : undefined,
  });

  const onSubmit = handleSubmit(async () => {
    await mutateAsync();
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-4xl max-h-[90vh] overflow-y-auto"
        aria-describedby={undefined}
        onCloseAutoFocus={() => {
          if (isSubmitSuccessful) {
            return reset({ ...getValues() });
          }

          return reset();
        }}
      >
        <DialogHeader>
          <DialogTitle>Update Employment</DialogTitle>
        </DialogHeader>
        <Form {...methods}>
          <form onSubmit={onSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <FormField
                    control={methods.control}
                    name="employerName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Employer Name *</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-2">
                  <FormField
                    control={methods.control}
                    name="jobTitle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Job Title *</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-2">
                  <FormField
                    control={methods.control}
                    name="employmentType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Employment Type *</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select employment type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {Object.keys(EmploymentType).map((key) => (
                              <SelectItem key={key} value={key}>
                                {camelCaseToSeparated(key, "-")}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-2">
                  <FormField
                    control={methods.control}
                    name="annualIncome"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Annual Income (£) *</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-2">
                  <FormField
                    control={methods.control}
                    name="employmentStartDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Employment Start Date *</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <CalendarButton
                                variant={"outline"}
                                className={cn(
                                  "w-[240px] pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </CalendarButton>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              defaultMonth={field.value}
                              selected={field.value}
                              onSelect={field.onChange}
                              captionLayout={dropdown}
                              disabled={(date) =>
                                date > new Date() ||
                                date < new Date("1900-01-01")
                              }
                              autoFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex flex-row space-y-2 space-x-4">
                  {!watchIsCurrent && (
                    <FormField
                      control={methods.control}
                      name="employmentEndDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Employment End Date</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <CalendarButton
                                  variant={"outline"}
                                  className={cn(
                                    "w-[240px] pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </CalendarButton>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                defaultMonth={field.value}
                                selected={field.value}
                                onSelect={field.onChange}
                                captionLayout={dropdown}
                                disabled={(date) =>
                                  date > new Date() ||
                                  date < new Date("1900-01-01")
                                }
                                autoFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  <FormField
                    control={methods.control}
                    name="isCurrentEmployment"
                    render={({ field }) => (
                      <FormItem className="">
                        <div className="space-y-0.5">
                          <FormLabel>Current Employment</FormLabel>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="space-y-4">
                {/* <h3 className="text-sm font-medium leading-none">Address</h3> */}
                <h3 className="font-semibold">HR/Employer Contact</h3>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <FormField
                    control={methods.control}
                    name="hrContactName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Name *</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={methods.control}
                    name="hrContactEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Email *</FormLabel>
                        <FormControl>
                          <Input type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={methods.control}
                    name="hrContactPhone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Phone</FormLabel>
                        <FormControl>
                          <Input type="tel" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold">Work Address</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <FormField
                      control={methods.control}
                      name="workAddress.streetAddress"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Street address *</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter address" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="space-y-2">
                    <FormField
                      control={methods.control}
                      name="workAddress.city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City *</FormLabel>
                          <FormControl>
                            <Input placeholder="City name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="space-y-2">
                    <FormField
                      control={methods.control}
                      name="workAddress.postCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Postcode *</FormLabel>
                          <FormControl>
                            <Input placeholder="Postcode" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="space-y-2">
                    <FormField
                      name="workAddress.country"
                      control={methods.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Country *</FormLabel>
                          <CountryDropdown
                            placeholder="Select the country"
                            defaultValue={field.value}
                            onChange={(country) => {
                              field.onChange(country.name);
                            }}
                          />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button
                isLoading={isSubmitting}
                onClick={async () => {
                  await onSubmit();
                  if (isValid) {
                    onOpenChange(false);
                  }
                }}
              >
                Save Changes
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
