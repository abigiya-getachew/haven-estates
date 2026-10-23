import type { ComponentPropsWithoutRef } from "react";

import { controlClasses, type FieldControlCommonProps } from "@/components/ui/form-field";

export interface TextareaProps
  extends ComponentPropsWithoutRef<"textarea">, FieldControlCommonProps {}

/**
 * Multi-line control (DESIGN.md 8.8).
 *
 * Provides enough room for a meaningful inquiry message.
 */
export function Textarea({ invalid, className, ...props }: TextareaProps) {
  return (
    <textarea
      className={controlClasses(invalid, className ?? "min-h-32 px-4 py-3")}
      aria-invalid={invalid || undefined}
      {...props}
    />
  );
}
