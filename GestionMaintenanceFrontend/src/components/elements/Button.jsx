import React from "react";
import classNames from "classnames";
import{Slot} from "@radix-ui/react-slot";
import buttonVariants from "./ButtonVariants";


const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={classNames(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  });
  Button.displayName = "Button";

export default Button;
