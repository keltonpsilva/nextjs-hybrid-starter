import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";

import { cn } from "@/lib/utils";

const ButtonGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn("", className)}
      {...props}
      ref={ref}
    />
  );
});
ButtonGroup.displayName = RadioGroupPrimitive.Root.displayName;

const ButtonGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  {} & React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, children, checked, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        "border text-center rounded-md focus:outline-none 2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        // 'data-[state=checked]:font-bold data-[state=checked]:text-indigo-500 data-[state=checked]:bg-violet-100 data-[state=checked]:border-2 data-[state=checked]:border-indigo-500 data-[state=checked]:border-solid',
        checked &&
          "data-[state=checked]:font-bold data-[state=checked]:text-indigo-500 data-[state=checked]:bg-violet-100 data-[state=checked]:border-2 data-[state=checked]:border-indigo-500 data-[state=checked]:border-solid",
        className,
      )}
      {...props}
    >
      {/* <RadioGroupPrimitive.RadioGroupIndicator className="relative">
        <div className="relative">
          <div className="absolute -ml-2 -mt-[30px] ">
            <Home className="text-primary" />
          </div>
        </div>
      </RadioGroupPrimitive.RadioGroupIndicator> */}

      <div className="flex gap-2 text-sm">
        {children}
        {/* <div className="self-center">{icon}</div>
        <div className="text-sm pt-2">{label}</div> */}
      </div>
    </RadioGroupPrimitive.Item>
  );
});
ButtonGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { ButtonGroup, ButtonGroupItem };
