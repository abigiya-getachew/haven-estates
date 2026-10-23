import type { ComponentPropsWithoutRef } from "react";

import { controlClasses, type FieldControlCommonProps } from "@/components/ui/form-field";

export interface SelectProps extends ComponentPropsWithoutRef<"select">, FieldControlCommonProps {}

/** Select control (DESIGN.md 8.10). */
export function Select({ invalid, className, children, ...props }: SelectProps) {
  return (
    <select
      className={controlClasses(invalid, className ?? "h-12 px-4")}
      aria-invalid={invalid || undefined}
      {...props}
    >
      {children}
    </select>
  );
}
