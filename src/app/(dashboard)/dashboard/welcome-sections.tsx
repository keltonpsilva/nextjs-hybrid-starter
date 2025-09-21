"use client";

import Link from "next/link";
import { AlertCircle, ArrowRight } from "lucide-react";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

import { useGetUserIdentityInfo } from "./hooks";

export function WelcomeSection() {
  const { data: userSession } = useGetUserIdentityInfo();
  // const { data: session } = useSession();
  // const userSession = session?.user;
  // const user = { verificationStatus: "unverified" };

  return (
    <>
      {!userSession?.hasProfileCompleted && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <AlertCircle className="h-4 w-4" />
              <div>
                <span className="font-semibold">Profile Incomplete!</span>
                <span className="ml-2">
                  Please complete your profile to access all features.
                  {/* {mockUser.missingFields.join(", ")}. */}
                </span>
              </div>
              <Link href={"/profile"}>
                <Button
                  variant="outline"
                  size="sm"
                  // className="whitespace-nowrap"
                >
                  Complete Profile
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </AlertDescription>
        </Alert>
      )}

      <div className="flex items-center justify-between">
        {/* Profile Incomplete Alert */}

        <div>
          <h2 className="text-2xl font-bold">
            Welcome back, {userSession?.firstName}
          </h2>
          <p className="text-muted-foreground">
            Here&apos;s what&apos;s happening with your rental properties
          </p>
        </div>
        {/* <div className="flex items-center gap-2">
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              user.verificationStatus === "verified"
                ? "bg-green-100 text-green-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {user.verificationStatus === "verified"
              ? "Verified"
              : "Pending Verification"}
          </span>
          <Badge
            variant="secondary"
            className={cn(
              user.verificationStatus === "verified"
                ? "bg-green-100 dark:bg-green-200 text-green-800"
                : "bg-yellow-100 dark:bg-yellow-200 text-yellow-800"
            )}
          >
            {user.verificationStatus === "verified" ? (
              <>
                <BadgeCheckIcon />
                Verified
              </>
            ) : (
              "Pending Verification"
            )}
          </Badge>
          {user.verificationStatus !== "verified" && (
            <Button variant="outline">Complete Profile</Button>
          )}
        </div> */}
      </div>
    </>
  );
}
