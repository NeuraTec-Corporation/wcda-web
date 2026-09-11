"use client";

import type { FormEvent } from "react";
import { useExperience } from "@/components/experience/useExperience";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import {
  resolveScopedElementFill,
  scopedElementFillStyle,
} from "@/config/scoped-colors";
import {
  Field,
  SelectControl,
  TextAreaControl,
  TextControl,
} from "@/components/ui/Field";
import { contactFormConfig } from "@/data/contact";

export function ContactForm() {
  const submissionEnabled = contactFormConfig.acceptsOnlineSubmission;
  const statusId = "contact-form-status";
  const privacyId = "contact-message-hint";
  const experience = useExperience();
  const fillStyle = scopedElementFillStyle(
    resolveScopedElementFill(experience.scopedColors, "editorial-cards"),
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <Card
      className="p-card-lg"
      data-visual-target="editorial-cards"
      data-surface-mix=""
      style={{
        ...(fillStyle ?? {}),
        ["--color-border" as string]: "var(--wcda-border)",
      }}
    >
      <h2 className="text-lg font-semibold tracking-tight text-foreground">
        Send a message
      </h2>
      <p id={statusId} className="mt-2 text-sm leading-relaxed text-muted">
        {contactFormConfig.unavailableNotice}
      </p>
      <form
        className="mt-stack flex flex-col gap-4"
        onSubmit={handleSubmit}
        noValidate={!submissionEnabled}
        aria-describedby={statusId}
      >
        <Field
          id="contact-name"
          label="Name"
          required={submissionEnabled}
        >
          <TextControl
            id="contact-name"
            name="name"
            autoComplete="name"
            required={submissionEnabled}
            describedBy={statusId}
            disabled={!submissionEnabled}
          />
        </Field>
        <Field
          id="contact-email"
          label="Email"
          required={submissionEnabled}
        >
          <TextControl
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            required={submissionEnabled}
            describedBy={statusId}
            disabled={!submissionEnabled}
          />
        </Field>
        <Field id="contact-phone" label="Phone">
          <TextControl
            id="contact-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            describedBy={statusId}
            disabled={!submissionEnabled}
          />
        </Field>
        <Field
          id="contact-reason"
          label="Reason for Contact"
          required={submissionEnabled}
        >
          <SelectControl
            id="contact-reason"
            name="reason"
            required={submissionEnabled}
            describedBy={statusId}
            disabled={!submissionEnabled}
          >
            <option value="" disabled>
              Select a reason
            </option>
            {contactFormConfig.reasons.map((reason) => (
              <option key={reason.value} value={reason.value}>
                {reason.label}
              </option>
            ))}
          </SelectControl>
        </Field>
        <Field
          id="contact-message"
          label="Message"
          hint={contactFormConfig.privacyNotice}
          required={submissionEnabled}
        >
          <TextAreaControl
            id="contact-message"
            name="message"
            required={submissionEnabled}
            describedBy={`${privacyId} ${statusId}`}
            disabled={!submissionEnabled}
          />
        </Field>
        <Button type="submit" disabled={!submissionEnabled}>
          {contactFormConfig.submitLabel}
        </Button>
      </form>
    </Card>
  );
}
