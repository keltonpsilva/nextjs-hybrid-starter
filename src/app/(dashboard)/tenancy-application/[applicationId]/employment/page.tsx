"use client";

import { use } from "react";

import { useGetCurrentEmployment } from "../hooks";

import EmploymentFormContainer from "./components/employment-form-container";
import { Spinner } from "@/components/layout";

export default function EmploymentPage({
  params,
}: {
  params: Promise<{ applicationId: string }>;
}) {
  const { applicationId } = use(params);

  const { isLoading, data } = useGetCurrentEmployment();

  console.log("EmploymentPage", data);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Employment Status</h1>
      <div className="text-l text-gray-500">
        Please enter your current and most dominant Employment arrangement first
      </div>
      {isLoading && <Spinner />}
      {data && (
        <EmploymentFormContainer
          applicationId={applicationId}
          employmentId={data[0].id}
          defaultValues={data[0]}
        />
      )}
    </div>
  );
}
