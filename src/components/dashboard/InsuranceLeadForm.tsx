import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/integrations/supabase/client";

type FormState = "hook" | "form" | "submitting" | "success";

interface InsuranceLeadFormProps {
  assetIdentifier: string;
}

export function InsuranceLeadForm({ assetIdentifier }: InsuranceLeadFormProps) {
  const [state, setState] = useState<FormState>("hook");
  const [consent, setConsent] = useState(false);
  const [fields, setFields] = useState({
    firstName: "",
    postalCode: "",
    phone: "",
    email: "",
  });

  const updateField = (key: keyof typeof fields, value: string) =>
    setFields((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async () => {
    if (!consent) return;
    setState("submitting");
    try {
      const { error } = await supabase.from("insurance_leads").insert({
        asset_identifier: assetIdentifier,
        first_name: fields.firstName,
        postal_code: fields.postalCode,
        phone: fields.phone,
        email: fields.email,
      });
      if (error) throw error;
      setState("success");
    } catch (e) {
      console.error("Lead submission failed:", e);
      setState("form");
    }
  };

  const isValid =
    fields.firstName.trim() &&
    fields.postalCode.trim() &&
    fields.phone.trim() &&
    fields.email.trim() &&
    consent;

  if (state === "success") {
    return (
      <div className="border border-terminal-green/30 rounded-sm p-6 bg-terminal-green/5">
        <p className="font-mono text-sm text-terminal-green">
          {">"} TRANSMISSION SUCCESSFUL. Local brokers are analyzing the asset. Expect contact within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <div className="border border-terminal-blue/40 rounded-sm bg-terminal-blue/5">
      {/* Hook */}
      <div className="p-6">
        <p className="font-mono text-sm text-foreground mb-2">
          {">"} INITIALIZE BROKER NETWORK
        </p>
        <p className="font-sans text-xs text-muted-foreground leading-relaxed mb-4">
          Want exact premiums for this{" "}
          <span className="text-terminal-blue font-medium">{assetIdentifier || "asset"}</span>?
          Connect with vetted local brokers to find the lowest risk-adjusted rate.
        </p>

        {state === "hook" && (
          <button
            onClick={() => setState("form")}
            className="font-mono text-xs font-semibold text-terminal-blue border border-terminal-blue/50 rounded-sm px-4 py-2 hover:bg-terminal-blue/10 transition-colors"
          >
            [ GET EXACT QUOTES ]
          </button>
        )}
      </div>

      {/* Form */}
      {(state === "form" || state === "submitting") && (
        <div className="border-t border-terminal-blue/20 p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {([
              ["firstName", "FIRST NAME"],
              ["postalCode", "POSTAL / ZIP CODE"],
              ["phone", "PHONE NUMBER"],
              ["email", "EMAIL ADDRESS"],
            ] as const).map(([key, label]) => (
              <div key={key}>
                <label className="font-mono text-[10px] text-muted-foreground tracking-widest block mb-1.5">
                  {label}
                </label>
                <input
                  type={key === "email" ? "email" : "text"}
                  value={fields[key]}
                  onChange={(e) => updateField(key, e.target.value)}
                  disabled={state === "submitting"}
                  className="w-full bg-muted border border-border rounded-sm px-3 py-2 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-terminal-blue disabled:opacity-50"
                />
              </div>
            ))}
          </div>

          <div className="flex items-start gap-2.5 pt-1">
            <Checkbox
              id="consent"
              checked={consent}
              onCheckedChange={(v) => setConsent(v === true)}
              disabled={state === "submitting"}
              className="mt-0.5 border-muted-foreground data-[state=checked]:bg-terminal-blue data-[state=checked]:border-terminal-blue"
            />
            <label htmlFor="consent" className="font-sans text-[11px] text-muted-foreground leading-relaxed cursor-pointer">
              I consent to having my data shared with up to 3 local insurance providers who may contact me via phone or email to provide a quote.
            </label>
          </div>

          <button
            onClick={handleSubmit}
            disabled={!isValid || state === "submitting"}
            className="font-mono text-xs font-bold bg-terminal-green text-primary-foreground rounded-sm px-5 py-2.5 hover:bg-terminal-green/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {state === "submitting" ? "[ TRANSMITTING... ]" : "[ TRANSMIT DATA ]"}
          </button>
        </div>
      )}
    </div>
  );
}
