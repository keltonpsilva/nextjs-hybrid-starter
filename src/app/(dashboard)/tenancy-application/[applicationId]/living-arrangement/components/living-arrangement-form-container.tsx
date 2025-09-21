"use client";

import React from "react";

import { Spinner } from "@/components/layout";
import { useGetAddressHistory } from "../../hooks";

import { AddressItemCard } from "./address-item-card";

export default function LivingArrangementFormContainer() {
  const { isLoading, data } = useGetAddressHistory();

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <div className="space-y-3">
        {data &&
          data.map((item) => (
            <AddressItemCard key={item.id} item={{ ...item }} />
          ))}
      </div>
    </>
  );
}
