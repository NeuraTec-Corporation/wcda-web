"use client";

import type { FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
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

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <Card className="bg-surface">
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
        <Field id="contact-name" label="Name" required>
          <TextControl
            id="contact-name"
            name="name"
            autoComplete="name"
            required
            describedBy={statusId}
          />
        </Field>
        <Field id="contact-email" label="Email" required>
          <TextControl
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            describedBy={statusId}
          />
        </Field>
        <Field id="contact-phone" label="Phone">
          <TextControl
            id="contact-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            describedBy={statusId}
          />
        </Field>
        <Field id="contact-reason" label="Reason for Contact" required>
          <SelectControl
            id="contact-reason"
            name="reason"
            required
            describedBy={statusId}
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
          required
        >
          <TextAreaControl
            id="contact-message"
            name="message"
            required
            describedBy={`${privacyId} ${statusId}`}
          />
        </Field>
        <Button type="submit" disabled={!submissionEnabled}>
          {contactFormConfig.submitLabel}
        </Button>
      </form>
    </Card>
  );
}
