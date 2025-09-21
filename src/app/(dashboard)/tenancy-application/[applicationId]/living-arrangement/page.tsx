"use client";

import React, { useState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

import LivingArrangementFormContainer from "./components/living-arrangement-form-container";
import { AddressCreateDialog } from "@/components/core/user-address";

export default function LivingArrangementPage() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  return (
    <div className="space-y-4 md:min-w-[750px] ">
      <h1 className="text-2xl font-semibold">Living Arrangements</h1>
      <div className="flex items-center justify-between w-full">
        <div className="text-l text-gray-500">
          Please provide a minimum of 3 years combined address history
        </div>

        <div>
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            Add previous address
          </Button>
          <AddressCreateDialog
            open={isCreateDialogOpen}
            onOpenChange={setIsCreateDialogOpen}
          />
        </div>
      </div>

      <LivingArrangementFormContainer />

      <div className="space-x-2">
        <Link href={"employment"}>
          <Button>Back</Button>
        </Link>

        <Link href={"docs"}>
          <Button>Continue</Button>
        </Link>
      </div>
    </div>
  );
}
