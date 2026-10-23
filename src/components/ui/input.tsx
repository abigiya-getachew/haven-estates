import type { ComponentPropsWithoutRef } from "react";

import { controlClasses, type FieldControlCommonProps } from "@/components/ui/form-field";
import { cn } from "@/lib/utils";

export interface InputProps extends ComponentPropsWithoutRef<"input">, FieldControlCommonProps {}

/** Text input control (DESIGN.md 8.8). */
export function Input({ invalid, className, ...props }: InputProps) {
  return (
    <input
      className={controlClasses(invalid, cn("h-12 px-4", className))}
      aria-invalid={invalid || undefined}
      {...props}
    />
  );
}

export type NumberInputProps = InputProps;

/** Number input control with the same visual treatment as `Input`. */
export function NumberInput({ invalid, className, ...props }: NumberInputProps) {
  return (
    <input
      type="number"
      inputMode="numeric"
      className={controlClasses(invalid, cn("h-12 px-4", className))}
      aria-invalid={invalid || undefined}
      {...props}
    />
  );
}
