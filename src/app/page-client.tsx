"use client";

import { useFormState } from "react-dom";
import { useEffect, useRef } from "react";
import { EntryForm } from "@/components/entry-form";
import { EntryStatus } from "@/components/entry-status";
import { handleEntry } from "@/app/actions";
import type { FormState } from "@/lib/types";

const initialState: FormState = { status: "idle", message: "" };

export function PageClient() {
  const [state, formAction] = useFormState(handleEntry, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.status === "new") {
      formRef.current?.reset();
    }
  }, [state]);

  return (
    <div className="space-y-6">
      <EntryForm formAction={formAction} state={state} ref={formRef} />
      {state && state.status !== "idle" && <EntryStatus state={state} />}
    </div>
  );
}
