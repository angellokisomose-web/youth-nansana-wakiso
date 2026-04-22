import { PageClient } from './page-client';

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-lg space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-primary">
            SheetFlow Entry
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Enter new records and check for duplicates seamlessly.
          </p>
        </div>
        <PageClient />
      </div>
    </main>
  );
}
