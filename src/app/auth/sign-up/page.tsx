"use client";

import { ChevronLeft } from "lucide-react";

import {
  HOME_PAGE_PATH,
  SIGN_IN_PAGE_PATH,
} from "@/shared/router/router-paths";
import Link from "next/link";
import SignUpFormContainer from "./sign-up-form-container/sign-up-form-container";

export default function SignUp() {
  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="absolute top-0 left-0 m-4">
          <Link className="flex" href={HOME_PAGE_PATH}>
            <ChevronLeft />
            Go back
          </Link>
        </div>
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Register</h1>
            <p className="text-balance text-muted-foreground">
              Enter your details below to create your account
            </p>
          </div>

          <SignUpFormContainer />

          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <a href={SIGN_IN_PAGE_PATH} className="underline">
              Sign in
            </a>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <picture>
          <img
            src="/assets/auth-sidebar-image.svg"
            // src="https://ui.shadcn.com/placeholder.svg"
            alt="placeholder"
            width="1920"
            height="1080"
            // className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          />
        </picture>
      </div>
    </div>
  );
}
