export type Entry = {
  contact: string;
  location: string;
  cellNumber: string;
  age: string;
  date: string; // YYYY-MM-DD
};

export type FormState = {
  status: "new" | "duplicate" | "error" | "idle";
  message: string;
  entry?: Entry;
  errors?: {
    contact?: string[];
    location?: string[];
    cellNumber?: string[];
    age?: string[];
    date?: string[];
  };
} | null;
