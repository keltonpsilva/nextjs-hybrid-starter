"use client";

import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { Spinner } from "@/components/layout";

import { useGetLoggedin } from "./hooks";
import ProfileFormContainer from "./profile-form-container";

export default function Profile() {
  const { data: user, isLoading } = useGetLoggedin();

  return (
    <Card>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium">Profile</h3>
            <p className="text-sm text-muted-foreground">
              This is how others will see you on the site
            </p>
          </div>

          <Separator />

          {isLoading ? (
            <div className="flex justify-center items-center h-32">
              <Spinner />
            </div>
          ) : (
            <ProfileFormContainer
              userId={user!.id}
              defaultValues={{ ...user }}
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
}
