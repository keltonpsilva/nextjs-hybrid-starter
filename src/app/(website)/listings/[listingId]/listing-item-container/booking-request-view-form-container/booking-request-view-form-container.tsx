import * as z from "zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { HomeIcon, VideoCameraIcon } from "@heroicons/react/24/outline";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";

import { cn } from "@/lib/utils";

import BookingRequestIcon from "./booking-request-icon";
import FormSchema from "./booking-request-view-form";
import { useCreateViewingRequest } from "../../../shared/listing-hooks";
import {
  RENT_LISTING_PAGE_PATH,
  SIGN_IN_PAGE_PATH,
} from "@/shared/router/router-paths";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { BookingType } from "@/shared/contracts/enums";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button, CalendarButton } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { ButtonGroup, ButtonGroupItem } from "@/components/ui/button-group";

export default function BookingRequestViewFormContainer({
  listingId,
}: {
  listingId: string;
}) {
  const { data: session } = useSession();
  const user = session?.user;

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      bookingType: undefined,
      bookingDate: undefined,
    },
  });

  const {
    handleSubmit,
    resetField,
    getValues,
    formState: { isSubmitting },
  } = form;
  const { mutateAsync } = useCreateViewingRequest({
    ...getValues(),
    listingId,
    notes: null,
  });

  const onSubmit = handleSubmit(async () => {
    if (!user) {
      redirect(
        `${SIGN_IN_PAGE_PATH}?redirectTo=${RENT_LISTING_PAGE_PATH}/${listingId}`
      );

      return;
    }

    await mutateAsync();
    resetField("bookingDate");
    resetField("bookingType");
  });

  return (
    <>
      <div className="mt-4">
        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-8">
            <FormField
              control={form.control}
              name="bookingType"
              render={({ field }) => (
                <FormItem>
                  <FormControl className="flex gap-4 ">
                    <ButtonGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormItem>
                        <FormControl>
                          <ButtonGroupItem
                            checked={
                              getValues("bookingType") === BookingType.InPerson
                            }
                            value={BookingType.InPerson}
                            className={cn(
                              "justify-center px-2 py-3.5 rounded-lg border-2 border-violet-200 border-solid max-md:px-5"
                            )}
                          >
                            <HomeIcon className="w-5" />
                            <div>In Person</div>
                          </ButtonGroupItem>
                        </FormControl>
                      </FormItem>
                      <FormItem>
                        <FormControl>
                          <ButtonGroupItem
                            checked={
                              getValues("bookingType") === BookingType.Virtual
                            }
                            value={BookingType.Virtual}
                            className={cn(
                              "justify-center px-2 py-3.5 rounded-lg border-2 border-violet-200 border-solid max-md:px-5"
                            )}
                          >
                            <VideoCameraIcon className="w-5" />
                            <div>Virtual</div>
                          </ButtonGroupItem>
                        </FormControl>
                      </FormItem>
                    </ButtonGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bookingDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Viewing date</FormLabel>
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
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date()}
                        captionLayout="dropdown"
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              isLoading={isSubmitting}
              type="submit"
              className="gap-2 justify-center  text-base font-bold text-center w-full "
            >
              {!isSubmitting && <BookingRequestIcon />}
              Request a tour
            </Button>
          </form>
        </Form>
      </div>
      <div className="mt-6 text-xs leading-4 text-gray-500">
        It’s free, with no obligation － cancel anytime.
      </div>
    </>
  );
}
