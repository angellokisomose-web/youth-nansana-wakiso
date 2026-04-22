import type { Entry } from "./types";

// In-memory store to simulate Google Sheet
let entries: (Entry & { id: string })[] = [
  {
    id: "1",
    contact: "John Doe",
    location: "Wakiso",
    cellNumber: "1234567890",
    age: "HM",
    date: "2024-01-15",
  },
  {
    id: "2",
    contact: "Jane Smith",
    location: "Wakiso",
    cellNumber: "0987654321",
    age: "MH",
    date: "2024-02-20",
  },
];

export async function findEntryByCell(
  cellNumber: string
): Promise<(Entry & { id: string }) | undefined> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  return entries.find((entry) => entry.cellNumber === cellNumber);
}

export async function addEntry(
  newEntry: Entry
): Promise<Entry & { id: string }> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  const entry = { ...newEntry, id: String(entries.length + 1) };
  entries.push(entry);
  return entry;
}

export async function getAllEntries(): Promise<(Entry & { id: string })[]> {
  return entries;
}
