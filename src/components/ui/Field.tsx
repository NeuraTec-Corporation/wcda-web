import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type FieldProps = {
  id: string;
  label: string;
  hint?: string;
  required?: boolean;
  children: ReactNode;
};

const controlClassName =
  "mt-1 w-full min-h-11 rounded-md border border-border bg-background px-3 text-sm text-foreground";

export function Field({ id, label, hint, required, children }: FieldProps) {
  const hintId = hint ? `${id}-hint` : undefined;

  return (
    <div className="min-w-0">
      <label htmlFor={id} className="text-sm font-medium text-foreground">
        {label}
        {required ? (
          <span className="text-muted"> (required)</span>
        ) : null}
      </label>
      {children}
      {hint ? (
        <p id={hintId} className="mt-1 text-sm leading-relaxed text-muted">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

type TextControlProps = {
  id: string;
  name: string;
  type?: "text" | "email" | "tel";
  autoComplete?: string;
  required?: boolean;
  describedBy?: string;
};

export function TextControl({
  id,
  name,
  type = "text",
  autoComplete,
  required,
  describedBy,
}: TextControlProps) {
  return (
    <input
      id={id}
      name={name}
      type={type}
      autoComplete={autoComplete}
      required={required}
      aria-required={required}
      aria-describedby={describedBy}
      className={controlClassName}
    />
  );
}

type SelectControlProps = {
  id: string;
  name: string;
  required?: boolean;
  describedBy?: string;
  children: ReactNode;
};

export function SelectControl({
  id,
  name,
  required,
  describedBy,
  children,
}: SelectControlProps) {
  return (
    <select
      id={id}
      name={name}
      required={required}
      aria-required={required}
      aria-describedby={describedBy}
      className={cn(controlClassName, "py-2")}
      defaultValue=""
    >
      {children}
    </select>
  );
}

type TextAreaControlProps = {
  id: string;
  name: string;
  required?: boolean;
  describedBy?: string;
  rows?: number;
};

export function TextAreaControl({
  id,
  name,
  required,
  describedBy,
  rows = 5,
}: TextAreaControlProps) {
  return (
    <textarea
      id={id}
      name={name}
      rows={rows}
      required={required}
      aria-required={required}
      aria-describedby={describedBy}
      className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground"
    />
  );
}
