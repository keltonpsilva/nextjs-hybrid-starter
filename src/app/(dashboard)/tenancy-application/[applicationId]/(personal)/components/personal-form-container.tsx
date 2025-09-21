import { redirect } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useUpdateTenancyApplication } from "../../hooks";

import { formSchema } from "./formSchema";
import ApplicantDetailsFormContainer from "./applicant-details-form-container";
import PersonalRefenceDetailsFormContainer from "./personal-refence-details-form-container";

interface PersonalFormContainerProps {
  applicationId: string;
  defaultValues: {
    user: {
      firstName: string;
      lastName: string;
      dateOfBirth?: Date;
      emailAddress: string;
      phoneNumber: string;
    };
    personalReference: {
      fullName: string;
      relationship: string;
      relationshipYears: number;
      relationshipMonths: number;
      emailAddress: string;
      phoneNumber: string;
    };
  };
}

export default function PersonalFormContainer({
  defaultValues,
  applicationId,
}: PersonalFormContainerProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      ...defaultValues,
      user: {
        ...defaultValues.user,
        dateOfBirth: defaultValues.user.dateOfBirth
          ? new Date(defaultValues.user.dateOfBirth)
          : undefined,
      },
      personalReference: {
        ...defaultValues.personalReference,
        refereeAuthority: true,
      },
    },
  });

  const {
    handleSubmit,
    getValues,
    formState: { isSubmitting },
  } = form;

  const { mutateAsync } = useUpdateTenancyApplication(applicationId, {
    ...getValues(),
  });

  const onSubmit = handleSubmit(async () => {
    await mutateAsync();
    redirect(`${applicationId}/employment`);
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className=" space-y-8">
        <ApplicantDetailsFormContainer form={form} />

        <PersonalRefenceDetailsFormContainer form={form} />

        <Button isLoading={isSubmitting}>Continue</Button>
      </form>
    </Form>
  );
}
