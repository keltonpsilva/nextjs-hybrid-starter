import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button, CalendarButton } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { CountryDropdown } from "@/components/ui/country-dropdown";
import { UserAddressHistoryResponse } from "@/shared/contracts/responses";
import { useUpdateAddressHistory } from "./hooks";

const formSchema = z.object({
  address: z.object({
    streetAddress: z.string().min(2, {
      message: "This field is required",
    }),
    city: z.string().min(2, {
      message: "This field is required",
    }),
    postCode: z.string().min(2, {
      message: "This field is required",
    }),
    country: z.string(),
  }),
  moveInDate: z.date(),
  moveOutDate: z.date().optional(),
});

export function AddressUpdateDialog({
  open,
  onOpenChange,
  defaultValues,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultValues: UserAddressHistoryResponse;
}) {
  const [moveIndropdown] =
    useState<React.ComponentProps<typeof Calendar>["captionLayout"]>(
      "dropdown"
    );

  const [moveOutdropdown] =
    useState<React.ComponentProps<typeof Calendar>["captionLayout"]>(
      "dropdown"
    );

  const methods = useForm<z.infer<typeof formSchema>>({
    mode: "onChange",
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...defaultValues,
      moveInDate: new Date(defaultValues.moveInDate),
      moveOutDate: defaultValues.moveOutDate
        ? new Date(defaultValues.moveOutDate!)
        : undefined,
    },
  });

  const {
    handleSubmit,
    getValues,
    reset,
    formState: { isSubmitting, isValid, isSubmitSuccessful },
  } = methods;

  const { mutateAsync } = useUpdateAddressHistory(defaultValues.id, {
    ...getValues(),
  });

  const onSubmit = handleSubmit(async () => {
    await mutateAsync();
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        aria-describedby={undefined}
        onCloseAutoFocus={() => {
          if (isSubmitSuccessful) {
            return reset({ ...getValues() });
          }

          return reset();
        }}
      >
        <DialogHeader>
          <DialogTitle>Update Living Arrangement</DialogTitle>
        </DialogHeader>
        <Form {...methods}>
          <form onSubmit={onSubmit} className="mt-4 space-y-5">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <FormField
                    control={methods.control}
                    name="address.streetAddress"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Street Address</FormLabel>
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
                    name="address.city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <FormField
                    control={methods.control}
                    name="address.postCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Postcode</FormLabel>
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
                    name="address.country"
                    control={methods.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Country</FormLabel>
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <FormField
                    control={methods.control}
                    name="moveInDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Move in Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <CalendarButton
                                variant="outline"
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "dd-MMM-YYY")
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
                              captionLayout={moveIndropdown}
                              disabled={(date) =>
                                date > new Date() ||
                                date < new Date("1900-01-01")
                              }
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-2">
                  <FormField
                    control={methods.control}
                    name="moveOutDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Move out Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <CalendarButton
                                variant="outline"
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "dd-MMM-YYY")
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
                              captionLayout={moveOutdropdown}
                              disabled={(date) =>
                                date > new Date() ||
                                date < new Date(getValues("moveInDate"))
                              }
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
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
