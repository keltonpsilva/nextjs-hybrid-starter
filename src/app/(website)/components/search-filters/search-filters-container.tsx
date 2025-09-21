"use client";

import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { PropertyStatus, PropertyType } from "@/shared/contracts/enums";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import formatCurrency from "@/lib/formatCurrency";

import { useState } from "react";

import { AutoComplete } from "@/components/ui/autocomplete";
import { getCities } from "./cities-service";
import { buyPriceValues, rentPriceValues } from "./house-prices";

export default function SearchFiltersContainer({
  propertyStatus,
}: {
  propertyStatus: PropertyStatus;
}) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [searchValue, setSearchValue] = useState<string>("");
  const [selectedValue, setSelectedValue] = useState<string>("");

  const { data, isLoading } = useQuery({
    queryKey: ["cities", searchValue],
    queryFn: () => getCities(searchValue),
  });

  const priceValues =
    propertyStatus === PropertyStatus.Rent ? rentPriceValues : buyPriceValues;

  const form = useForm({
    defaultValues: {
      location: searchParams.get("location") || "",
      minPrice: searchParams.get("minPrice") || "",
      maxPrice: searchParams.get("maxPrice") || "",
      propertyType: searchParams.get("propertyType") || "",
    },
  });

  const { handleSubmit } = form;

  const onSubmit = handleSubmit(
    ({ location, minPrice, maxPrice, propertyType }) => {
      const params = new URLSearchParams(searchParams.toString());

      if (location) {
        params.set("location", location);
      } else {
        params.delete("location");
      }

      if (minPrice && minPrice !== "NoMin") {
        params.set("minPrice", minPrice);
      } else {
        params.delete("minPrice");
      }

      if (maxPrice && maxPrice !== "NoMax") {
        params.set("maxPrice", maxPrice);
      } else {
        params.delete("maxPrice");
      }

      if (propertyType && propertyType !== "Any") {
        params.set("propertyType", propertyType);
      } else {
        params.delete("propertyType");
      }

      router.push(`?${params.toString()}`);
    }
  );

  return (
    <Form {...form}>
      <form onSubmit={onSubmit}>
        <div className="flex justify-between flex-wrap px-5 py-5 bg-white max-md:flex-col max-md:px-5 max-md:gap-2">
          <div className="flex text-slate-950">
            <div className="flex flex-col w-full">
              <FormField
                control={form.control}
                name="location"
                render={({}) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <AutoComplete
                        selectedValue={selectedValue}
                        onSelectedValueChange={(value) => {
                          setSelectedValue(value);
                          form.setValue("location", value);
                        }}
                        searchValue={searchValue}
                        onSearchValueChange={setSearchValue}
                        items={data ?? []}
                        isLoading={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div>
            <Separator
              orientation="vertical"
              className="bg-violet-200 border border-violet-200 border-solid max-md:invisible"
            />
          </div>

          <div className="flex text-slate-950">
            <div className="flex flex-col min-w-[200px] w-full">
              <FormField
                control={form.control}
                name="minPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Min Price</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="No Min" />
                        </SelectTrigger>
                      </FormControl>
                      {/* <SelectContent className="!h-80"> */}
                      <SelectContent className="h-80">
                        <SelectItem value="NoMin">No Min</SelectItem>
                        {priceValues.map((price) => (
                          <SelectItem
                            key={`minPrice-${price.toString()}`}
                            value={price.toString()}
                          >
                            {formatCurrency(price, { showDecimal: false })}
                            {propertyStatus === PropertyStatus.Rent && (
                              <span>PCM</span>
                            )}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div>
            <Separator
              orientation="vertical"
              className="bg-violet-200 border border-violet-200 border-solid max-md:invisible"
            />
          </div>

          <div className="flex text-slate-950">
            <div className="flex flex-col min-w-[200px] w-full">
              <FormField
                control={form.control}
                name="maxPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Max Price</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="No Max" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="h-80">
                        <SelectItem value="NoMax">No Max</SelectItem>

                        {priceValues.map((price) => (
                          <SelectItem
                            key={`maxPrice-${price.toString()}`}
                            value={price.toString()}
                          >
                            {formatCurrency(price, { showDecimal: false })}
                            {propertyStatus === PropertyStatus.Rent && (
                              <span>PCM</span>
                            )}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div>
            <Separator
              orientation="vertical"
              className="bg-violet-200 border border-violet-200 border-solid max-md:invisible"
            />
          </div>

          <div className="flex text-slate-950">
            <div className="flex flex-col min-w-[200px] w-full">
              <FormField
                control={form.control}
                name="propertyType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Property Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Any" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Any">Any</SelectItem>

                        {Object.values(PropertyType).map((type) => (
                          <SelectItem key={type} value={type.toLowerCase()}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div>
            <Separator
              orientation="vertical"
              className="bg-violet-200 border border-violet-200 border-solid max-md:invisible"
            />
            <Separator
              orientation="horizontal"
              className="bg-violet-200 border border-violet-200 border-solid max-md:visible"
            />
          </div>

          {/* <div className="justify-center px-8 py-4 text-base font-bold leading-6 text-center text-white whitespace-nowrap bg-indigo-500 rounded-lg max-md:px-5">
      Search
    </div> */}

          <Button type="submit" className="h-auto w-[100px] max-md:w-full">
            Search
          </Button>
        </div>
      </form>
    </Form>
  );
}
