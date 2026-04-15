import React from "react"
import { cn } from "@/lib/utils"
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group"
import { RiSearchLine } from "@remixicon/react"

export const SearchInput = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, value, onChange, ...props }, ref) => {
    return (
      <InputGroup data-slot="search-input-group" className={cn("w-full border", className)}>
        <InputGroupInput
          ref={ref}
          type="search"
          value={value}
          onChange={onChange}
          placeholder="Search Bookmarks"
          className=" text-card-foreground outline-none focus-visible:ring-0 border-none shadow-none" // شيلنا الـ ring من الـ input نفسه عشان الـ Group هو اللي هياخده
          {...props}
        />
        <InputGroupAddon className="">
          <RiSearchLine className="text-muted-foreground size-4 border-none" />
        </InputGroupAddon>
      </InputGroup>
    )
  }
)

SearchInput.displayName = "SearchInput"