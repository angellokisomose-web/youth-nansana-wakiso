'use server';
/**
 * @fileOverview An AI agent that generates a context-aware summary of an entry's status (new or duplicate).
 *
 * - entryStatusSummary - A function that generates a summary message for an entry.
 * - EntryStatusSummaryInput - The input type for the entryStatusSummary function.
 * - EntryStatusSummaryOutput - The return type for the entryStatusSummary function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const EntryDetailsSchema = z.object({
  contact: z.string().describe('The contact name.'),
  location: z.string().describe('The location (e.g., Wakiso).'),
  cellNumber: z.string().describe('The cell number.'),
  age: z.string().describe('The age (e.g., HM/MH).'),
  date: z.string().describe('The date of entry (YYYY-MM-DD format).'),
});

const EntryStatusSummaryInputSchema = z.object({
  status: z.enum(['new', 'duplicate']).describe('The status of the entry: "new" or "duplicate".'),
  submittedEntry: EntryDetailsSchema.describe('Details of the entry that was submitted.'),
  existingEntry: EntryDetailsSchema.optional().describe('Details of the existing entry, if the status is "duplicate".'),
});
export type EntryStatusSummaryInput = z.infer<typeof EntryStatusSummaryInputSchema>;

const EntryStatusSummaryOutputSchema = z.object({
  message: z.string().describe('A concise, context-aware summary message about the entry status.'),
});
export type EntryStatusSummaryOutput = z.infer<typeof EntryStatusSummaryOutputSchema>;

export async function entryStatusSummary(input: EntryStatusSummaryInput): Promise<EntryStatusSummaryOutput> {
  return entryStatusSummaryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'entryStatusSummaryPrompt',
  input: { schema: EntryStatusSummaryInputSchema },
  output: { schema: EntryStatusSummaryOutputSchema },
  prompt: `You are an AI assistant specialized in providing clear and concise status messages for data entry systems. Your goal is to inform the operator about the outcome of an entry submission, whether it's new or a duplicate, and to provide relevant details.

Input Status: {{{status}}}
Submitted Entry Details:
  Contact: {{{submittedEntry.contact}}}
  Location: {{{submittedEntry.location}}}
  Cell Number: {{{submittedEntry.cellNumber}}}
  Age: {{{submittedEntry.age}}}
  Date: {{{submittedEntry.date}}}

{{#if existingEntry}}
Existing Entry Details (if duplicate):
  Contact: {{{existingEntry.contact}}}
  Location: {{{existingEntry.location}}}
  Cell Number: {{{existingEntry.cellNumber}}}
  Age: {{{existingEntry.age}}}
  Date: {{{existingEntry.date}}}
{{/if}}

Based on the provided information, generate a clear and concise summary message for the operator. If the entry is new, confirm its successful addition and list the submitted details. If it's a duplicate, clearly state that the person is already in the system and provide their existing details from the 'existingEntry' field, and also mention the newly submitted details if they are different.`,
});

const entryStatusSummaryFlow = ai.defineFlow(
  {
    name: 'entryStatusSummaryFlow',
    inputSchema: EntryStatusSummaryInputSchema,
    outputSchema: EntryStatusSummaryOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
