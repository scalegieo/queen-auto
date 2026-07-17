"use client";

import { FormEvent, useState } from "react";

export function LeadForm({
  type,
  vehicleSlug,
  submitLabel = "Submit",
  fields,
}: {
  type: "preapproval" | "tradein" | "contact" | "testdrive";
  vehicleSlug?: string;
  submitLabel?: string;
  fields: Array<{
    name: string;
    label: string;
    type?: string;
    required?: boolean;
    placeholder?: string;
    options?: string[];
    fullWidth?: boolean;
  }>;
}) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, vehicleSlug, ...data }),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      setMessage("Thank you — our team will contact you shortly.");
      form.reset();
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please call us or try again.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2">
      {fields.map((field) => (
        <div
          key={field.name}
          className={field.fullWidth ? "sm:col-span-2" : undefined}
        >
          <label className="label" htmlFor={field.name}>
            {field.label}
            {field.required ? " *" : ""}
          </label>
          {field.options ? (
            <select
              id={field.name}
              name={field.name}
              required={field.required}
              className="input-field"
              defaultValue=""
            >
              <option value="" disabled>
                Select…
              </option>
              {field.options.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          ) : field.type === "textarea" ? (
            <textarea
              id={field.name}
              name={field.name}
              required={field.required}
              placeholder={field.placeholder}
              rows={4}
              className="input-field resize-y"
            />
          ) : (
            <input
              id={field.name}
              name={field.name}
              type={field.type ?? "text"}
              required={field.required}
              placeholder={field.placeholder}
              className="input-field"
            />
          )}
        </div>
      ))}

      <div className="sm:col-span-2">
        <button
          type="submit"
          className="btn-primary w-full sm:w-auto"
          disabled={status === "loading"}
        >
          {status === "loading" ? "Sending…" : submitLabel}
        </button>
        {message && (
          <p
            className={`mt-4 text-sm ${status === "error" ? "text-[var(--danger)]" : "text-gold"}`}
            role="status"
          >
            {message}
          </p>
        )}
      </div>
    </form>
  );
}

export function PreApprovalForm({ vehicleSlug }: { vehicleSlug?: string }) {
  return (
    <LeadForm
      type="preapproval"
      vehicleSlug={vehicleSlug}
      submitLabel="Get Pre-Approved"
      fields={[
        { name: "firstName", label: "First Name", required: true },
        { name: "lastName", label: "Last Name", required: true },
        { name: "email", label: "Email", type: "email", required: true },
        { name: "phone", label: "Phone", type: "tel", required: true },
        {
          name: "employmentStatus",
          label: "Employment Status",
          options: ["Employed", "Self-Employed", "Retired", "Other"],
          required: true,
        },
        {
          name: "creditRange",
          label: "Credit Range",
          options: ["Excellent", "Good", "Fair", "Poor", "No Credit"],
          required: true,
        },
        {
          name: "downPayment",
          label: "Estimated Down Payment",
          placeholder: "$1,000",
        },
        {
          name: "notes",
          label: "Notes",
          type: "textarea",
          fullWidth: true,
          placeholder: "Tell us what you’re looking for…",
        },
      ]}
    />
  );
}

export function TradeInForm() {
  return (
    <LeadForm
      type="tradein"
      submitLabel="Request Instant Appraisal"
      fields={[
        { name: "firstName", label: "First Name", required: true },
        { name: "lastName", label: "Last Name", required: true },
        { name: "email", label: "Email", type: "email", required: true },
        { name: "phone", label: "Phone", type: "tel", required: true },
        { name: "year", label: "Year", required: true },
        { name: "make", label: "Make", required: true },
        { name: "model", label: "Model", required: true },
        { name: "mileage", label: "Mileage", required: true },
        { name: "vin", label: "VIN (optional)", fullWidth: true },
        {
          name: "condition",
          label: "Condition",
          options: ["Excellent", "Good", "Fair", "Needs Work"],
          required: true,
        },
        {
          name: "notes",
          label: "Additional Details",
          type: "textarea",
          fullWidth: true,
        },
      ]}
    />
  );
}

export function ContactForm({
  vehicleSlug,
  intent,
}: {
  vehicleSlug?: string;
  intent?: string;
}) {
  return (
    <LeadForm
      type={intent === "test-drive" ? "testdrive" : "contact"}
      vehicleSlug={vehicleSlug}
      submitLabel={intent === "test-drive" ? "Schedule Test Drive" : "Send Message"}
      fields={[
        { name: "firstName", label: "First Name", required: true },
        { name: "lastName", label: "Last Name", required: true },
        { name: "email", label: "Email", type: "email", required: true },
        { name: "phone", label: "Phone", type: "tel", required: true },
        {
          name: "message",
          label: "Message",
          type: "textarea",
          required: true,
          fullWidth: true,
          placeholder:
            intent === "test-drive"
              ? "Preferred day/time for your test drive…"
              : "How can we help?",
        },
      ]}
    />
  );
}
