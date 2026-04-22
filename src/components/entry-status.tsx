"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Info, AlertTriangle } from "lucide-react";
import type { FormState } from "@/lib/types";

export function EntryStatus({ state }: { state: FormState }) {
  if (!state || state.status === "idle") return null;

  if (state.status === "error" && state.errors) {
    // Validation errors are displayed inline in the form.
    // This component only shows submission-level success, duplicate, or generic error states.
    return null;
  }
  
  if (state.status === "error") {
      return (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{state.message}</AlertDescription>
        </Alert>
      )
  }

  const isNew = state.status === "new";
  const Icon = isNew ? CheckCircle2 : Info;
  const title = isNew ? "Entry Added Successfully" : "Duplicate Entry Found";

  return (
    <Card className={isNew ? "border-primary bg-primary/10" : "border-secondary-foreground/20 bg-secondary"}>
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div
            className={`mt-1 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full ${
              isNew ? "bg-primary" : "bg-muted-foreground"
            }`}
          >
            <Icon
              className={`h-6 w-6 ${
                isNew ? "text-primary-foreground" : "text-muted"
              }`}
            />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground">{title}</h3>
            <p className="mt-2 text-sm text-muted-foreground whitespace-pre-wrap">
              {state.message}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
