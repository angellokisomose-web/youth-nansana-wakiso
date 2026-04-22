"use server";

import { z } from "zod";
import { findEntryByCell, addEntry } from "@/lib/sheet-db";
import {
  entryStatusSummary,
} from "@/ai/flows/entry-status-summary-flow";
import type { FormState } from "@/lib/types";

const FormSchema = z.object({
  contact: z.string().min(1, "Contact name is required."),
  location: z.string().min(1, "Location is required."),
  cellNumber: z.string().min(10, "A valid cell number is required."),
  age: z.enum(["History Maker", "Morpher"], { required_error: "Age category is required." }),
  date: z.string().min(1, "Date is required."),
});

export async function handleEntry(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    const rawFormData = Object.fromEntries(formData.entries());

    const validatedFields = FormSchema.safeParse(rawFormData);
    if (!validatedFields.success) {
      return {
        status: "error",
        message: "Invalid form data. Please check your inputs.",
        errors: validatedFields.error.flatten().fieldErrors,
      };
    }

    const { contact, location, cellNumber, age, date } = validatedFields.data;

    const existingEntry = await findEntryByCell(cellNumber);

    if (existingEntry) {
      const aiResponse = await entryStatusSummary({
        status: "duplicate",
        submittedEntry: { ...validatedFields.data },
        existingEntry: { ...existingEntry },
      });
      return {
        status: "duplicate",
        message: aiResponse.message,
        entry: existingEntry,
      };
    } else {
      const newEntryData = { contact, location, cellNumber, age, date };
      const newEntry = await addEntry(newEntryData);

      const aiResponse = await entryStatusSummary({
        status: "new",
        submittedEntry: { ...newEntry },
      });

      return {
        status: "new",
        message: aiResponse.message,
        entry: newEntry,
      };
    }
  } catch (error) {
    console.error(error);
    return {
      status: "error",
      message: "An unexpected error occurred. Please try again.",
    };
  }
}
