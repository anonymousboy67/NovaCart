export const metadata = {
  title: "PasalMandu — Coming Soon",
};

export default function ComingSoonPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground px-6 text-center">
      <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
        Coming Soon
      </h1>
      <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-md">
        PasalMandu is getting a fresh new look. We&apos;ll be back shortly —
        thanks for your patience!
      </p>
    </div>
  );
}
