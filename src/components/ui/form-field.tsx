import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Shared form field scaffolding (DESIGN.md 8.8, 10.2 - 10.4).
 *
 * Every control gets a visible label, optional supporting text, and an
 * optional validation message. Placeholder text is never the only label.
 */

export const FIELD_LABEL_CLASSES = "text-label font-medium text-text-primary";
export const FIELD_HINT_CLASSES = "text-body-sm text-text-secondary";
export const FIELD_ERROR_CLASSES = "text-body-sm text-error";

export const CONTROL_BASE_CLASSES =
  "w-full rounded-md border bg-surface text-body text-text-primary transition-colors duration-200 ease-standard placeholder:text-text-secondary disabled:cursor-not-allowed disabled:bg-surface-muted disabled:text-text-secondary";

export const CONTROL_ERROR_CLASSES = "border-error";
export const CONTROL_DEFAULT_CLASSES = "border-border-strong";

export interface FormFieldProps {
  /** Identifier of the control the label and messages belong to. */
  id: string;
  label: string;
  /** Marks the control as required for assistive technology. */
  required?: boolean;
  /** Supporting text that explains a genuine requirement. */
  hint?: ReactNode;
  /** Validation message shown when the value is invalid. */
  error?: string;
  /** Renders the control. Receives the ids used by label and messages. */
  children: (controlProps: {
    id: string;
    "aria-describedby": string | undefined;
    "aria-invalid": boolean | undefined;
  }) => ReactNode;
}

/**
 * Wraps a control with its label, supporting text, and validation message.
 */
export function FormField({ id, label, required = false, hint, error, children }: FormFieldProps) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className={FIELD_LABEL_CLASSES}>
        {label}
        {required ? (
          <>
            <span aria-hidden="true" className="text-error">
              {" "}
              *
            </span>
            <span className="sr-only"> (required)</span>
          </>
        ) : null}
      </label>

      {children({
        id,
        "aria-describedby": describedBy,
        "aria-invalid": error ? true : undefined,
      })}

      {hint ? (
        <p id={hintId} className={FIELD_HINT_CLASSES}>
          {hint}
        </p>
      ) : null}

      {error ? (
        <p id={errorId} className={FIELD_ERROR_CLASSES}>
          {error}
        </p>
      ) : null}
    </div>
  );
}

export interface FieldControlCommonProps {
  /** Adds the invalid state to the control styling. */
  invalid?: boolean;
}

/**
 * Shared control styling for input-like elements.
 */
export function controlClasses(invalid?: boolean, className?: string): string {
  return cn(
    CONTROL_BASE_CLASSES,
    invalid ? CONTROL_ERROR_CLASSES : CONTROL_DEFAULT_CLASSES,
    className,
  );
}
