import React from "react";
import { Button as HeadlessUIButton } from "@headlessui/react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  icon?: React.ReactNode;
};

function Button({ icon, children, ...props }: ButtonProps) {
  return (
    <HeadlessUIButton
      className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors flex items-center justify-center"
      {...props}
    >
      {icon && <span className={children ? "mr-2" : ""}>{icon}</span>}
      {children && <span>{children}</span>}
    </HeadlessUIButton>
  );
}

export { Button };
