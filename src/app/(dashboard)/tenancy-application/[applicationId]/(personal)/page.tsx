"use client";

import { use } from "react";

import { useGetTenanacyApplication } from "../hooks";

import PersonalFormContainer from "./components/personal-form-container";
import { Spinner } from "@/components/layout";

export default function PersonalPage({
  params,
}: {
  params: Promise<{ applicationId: string }>;
}) {
  const { applicationId } = use(params);

  const { isLoading, data: defaultValues } =
    useGetTenanacyApplication(applicationId);

  return (
    <div className="space-y-4 ">
      <h1 className="text-2xl font-semibold">Personal Details</h1>
      <div className="text-l text-gray-500">
        Please start your profile below by filling in your personal information
      </div>
      {isLoading && <Spinner />}

      {defaultValues && (
        <PersonalFormContainer
          applicationId={applicationId}
          defaultValues={{
            user: defaultValues.user,
            personalReference: defaultValues.personalReference,
          }}
        />
      )}
    </div>
  );
}
