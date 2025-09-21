"use client";

import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

import {
  HOME_PAGE_PATH,
  SIGN_UP_PAGE_PATH,
} from "@/shared/router/router-paths";

import SignInFormContainer from "./sign-in-form-container/sign-in-form-container";

export default function SignIn() {
  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="relative flex items-center justify-center py-12 ">
        <div className="absolute top-0 left-0 m-4">
          <Link className="flex" href={HOME_PAGE_PATH}>
            <ChevronLeft />
            Go back
          </Link>
        </div>

        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>
          <Suspense>
            <SignInFormContainer />
          </Suspense>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <a href={SIGN_UP_PAGE_PATH} className="underline">
              Sign up
            </a>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <picture>
          <img
            src="/assets/auth-sidebar-image.svg"
            alt="placeholder"
            width="1920"
            height="1080"
          />
        </picture>
      </div>
    </div>
  );
}
