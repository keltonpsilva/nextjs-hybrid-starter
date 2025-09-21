"use client";

import { useTransition } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/layout";
import { IdentityVerificationStatus } from "@/shared/contracts/enums";

import { useGetAddressHistory, useStartIdentityVerification } from "./hooks";
import { IdentityVerificationTable } from "./identity-verification-table";

export default function IdentityVerification() {
  const [isLoadingTransition, startTransition] = useTransition();
  const { data, isLoading } = useGetAddressHistory();
  const { mutateAsync } = useStartIdentityVerification();

  function startIdentityVerification() {
    const newWindow = window.open();

    startTransition(async () => {
      try {
        const response = await mutateAsync();

        if (newWindow) {
          newWindow.location.href = response;
        } else {
          window.open(response, "_blank", "noreferrer");
        }
      } catch (error) {
        if (newWindow) newWindow.close();
        console.error("Verification failed:", error);
      }
    });
  }

  return (
    <>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Identity Verification</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* TODO: Integrate identity verification service */}
            {/* <div className="border-2 border-dashed rounded-lg p-8 text-center bg-gray-50">
              <p className="text-muted-foreground">
                Identity verification service will load here
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                This is where you would integrate with your identity
                verification provider
              </p>
            </div> */}

            <Alert className="bg-blue-50 border-blue-200">
              <Info className="h-4 w-4 text-blue-600" />
              <AlertTitle>Why we need this</AlertTitle>
              <AlertDescription className="">
                Identity verification helps prevent fraud and keeps your account
                secure. This process typically takes 2-3 minutes.
              </AlertDescription>
            </Alert>
          </CardContent>
          <CardFooter className="flex flex-col items-center gap-4">
            {data && (
              <Button
                className="w-full max-w-xs"
                size="lg"
                isLoading={isLoadingTransition}
                onClick={startIdentityVerification}
              >
                {data?.some(
                  (v) => v.status === IdentityVerificationStatus.Pending
                )
                  ? "Finish Identity Verification"
                  : "Start Identity Verification"}
              </Button>
            )}
            <p className="text-sm text-muted-foreground text-center">
              Having trouble?{" "}
              <a href="#" className="text-primary hover:underline">
                Contact support
              </a>
            </p>
          </CardFooter>
        </Card>

        <Card>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium">Your Identity</h3>
                <p className="text-sm text-muted-foreground">
                  Complete verification to access all features
                </p>
              </div>

              <Separator />

              {isLoading ? (
                <div className="flex justify-center items-center h-32">
                  <Spinner />
                </div>
              ) : (
                <>
                  <IdentityVerificationTable data={data!} />
                </>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <p className="text-sm text-muted-foreground">
              Verification history is maintained for compliance purposes. Failed
              attempts can be retried after 24 hours.
            </p>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
