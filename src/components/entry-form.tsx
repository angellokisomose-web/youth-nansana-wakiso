"use client";

import * as React from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { FormState } from "@/lib/types";
import { Loader2 } from "lucide-react";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Submitting...
        </>
      ) : (
        "Submit Entry"
      )}
    </Button>
  );
}

export const EntryForm = React.forwardRef<
  HTMLFormElement,
  {
    formAction: (payload: FormData) => void;
    state: FormState;
  }
>(({ formAction, state }, ref) => {
  const [date, setDate] = React.useState("");
  React.useEffect(() => {
    setDate(new Date().toLocaleDateString("en-CA")); // YYYY-MM-DD format
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Add New Entry</CardTitle>
        <CardDescription>
          Fill in the details below to add a new person to the system.
        </CardDescription>
      </CardHeader>
      <form action={formAction} ref={ref}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="contact">Contact Name</Label>
            <Input
              id="contact"
              name="contact"
              placeholder="e.g. John Doe"
              required
            />
            {state?.errors?.contact && (
              <p className="text-sm font-medium text-destructive">
                {state.errors.contact[0]}
              </p>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                defaultValue="Wakiso"
                required
              />
              {state?.errors?.location && (
                <p className="text-sm font-medium text-destructive">
                  {state.errors.location[0]}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="cellNumber">Cell Number</Label>
              <Input
                id="cellNumber"
                name="cellNumber"
                placeholder="e.g. 0771234567"
                required
              />
              {state?.errors?.cellNumber && (
                <p className="text-sm font-medium text-destructive">
                  {state.errors.cellNumber[0]}
                </p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="age">Age (HM/MH)</Label>
              <Select name="age" required>
                <SelectTrigger id="age">
                  <SelectValue placeholder="Select age category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="HM">HM</SelectItem>
                  <SelectItem value="MH">MH</SelectItem>
                </SelectContent>
              </Select>
              {state?.errors?.age && (
                <p className="text-sm font-medium text-destructive">
                  {state.errors.age[0]}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                name="date"
                type="date"
                defaultValue={date}
                required
              />
              {state?.errors?.date && (
                <p className="text-sm font-medium text-destructive">
                  {state.errors.date[0]}
                </p>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-start gap-4">
          <SubmitButton />
          {state?.status === "error" && !state.errors && (
             <p className="text-sm font-medium text-destructive text-center w-full">
              {state.message}
            </p>
          )}
        </CardFooter>
      </form>
    </Card>
  );
});

EntryForm.displayName = "EntryForm";
