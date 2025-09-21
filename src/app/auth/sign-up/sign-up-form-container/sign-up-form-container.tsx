import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { redirect } from "next/navigation";

import { SIGN_IN_PAGE_PATH } from "@/shared/router/router-paths";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useSignUp } from "../../shared/auth-hooks";

const signUpFormSchema = z.object({
  firstname: z.string().min(2, {
    message: "This field is required",
  }),
  lastname: z.string().min(2, {
    message: "This field is required",
  }),
  emailAddress: z
    .string()
    .min(2, {
      message: "The email address is required",
    })
    .email({ message: "The email prodived is invaid" }),
  password: z.string().min(2, {
    message: "This field is required",
  }),
});

export default function SignUpFormContainer() {
  const form = useForm<z.infer<typeof signUpFormSchema>>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      emailAddress: "",
      password: "",
    },
  });

  const {
    handleSubmit,
    getValues,
    formState: { isSubmitting },
  } = form;

  const { mutateAsync } = useSignUp({ ...getValues() });

  const onSubmit = handleSubmit(async () => {
    await mutateAsync();
    redirect(SIGN_IN_PAGE_PATH);
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="firstname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Firstname</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Jane" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="lastname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lastname</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="emailAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="jane@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center">
                    <FormLabel>Password</FormLabel>

                    <a
                      href="/forgot-password"
                      className="ml-auto inline-block text-sm underline"
                    >
                      Forgot your password?
                    </a>
                  </div>

                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button isLoading={isSubmitting} type="submit" className="w-full">
            Create account
          </Button>
          {/* <Button variant="outline" className="w-full">
            Login with Google
          </Button> */}
        </div>
      </form>
    </Form>
  );
}
