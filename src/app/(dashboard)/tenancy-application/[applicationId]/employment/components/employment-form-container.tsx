import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { redirect } from "next/navigation";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { UserEmploymentHistoryResponse } from "@/shared/contracts/responses";
import { useUpdateEmployment } from "../../hooks";

import { formSchema } from "./formSchema";
import EmploymentDetailsFormContainer from "./employment-details-container";
import EmployementRefenceDetailsFormContainer from "./employment-refence-details-form-container";

interface EmploymentFormContainerProps {
  applicationId: string;
  employmentId: string;
  defaultValues: UserEmploymentHistoryResponse;
}

export default function EmploymentFormContainer({
  employmentId,
  defaultValues,
}: EmploymentFormContainerProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...defaultValues,
      employmentStartDate: defaultValues.employmentStartDate
        ? new Date(defaultValues.employmentStartDate)
        : undefined,
      employmentEndDate: defaultValues.employmentEndDate
        ? new Date(defaultValues.employmentEndDate)
        : undefined,
      employmentReference: {
        fullname: defaultValues.hrContactName,
        emailAddress: defaultValues.hrContactEmail,
        phoneNumber: defaultValues.hrContactPhone,
        refereeAuthority: true,
      },
    },
  });

  const {
    handleSubmit,
    getValues,
    formState: { isSubmitting },
  } = form;

  const { mutateAsync } = useUpdateEmployment(employmentId, {
    ...getValues(),
    hrContactName: getValues("employmentReference.fullname"),
    hrContactEmail: getValues("employmentReference.emailAddress"),
    hrContactPhone: getValues("employmentReference.phoneNumber"),
    workAddress: defaultValues.workAddress,
  });

  const onSubmit = handleSubmit(async () => {
    await mutateAsync();

    redirect(`living-arrangement`);
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className=" space-y-8">
        <EmploymentDetailsFormContainer form={form} />

        <EmployementRefenceDetailsFormContainer form={form} />

        <div className="space-x-2">
          <Link href={"."}>
            <Button type="button">Back</Button>
          </Link>
          <Button isLoading={isSubmitting}>Continue</Button>
        </div>
      </form>
    </Form>
  );
}
