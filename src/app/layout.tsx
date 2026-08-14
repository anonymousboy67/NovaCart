import type { Metadata } from "next";
import "@fontsource-variable/inter";
import "@fontsource-variable/sora";
import "./globals.css";
import { Providers } from "@/components/providers";
import { SiteChrome } from "@/components/site-chrome";
import { Toaster } from "@/components/ui/toaster";
import { getAllProducts } from "@/lib/data/products";

export const metadata: Metadata = {
  title: "PasalMandu — Shop smarter, live better",
  description:
    "PasalMandu is a premium marketplace for electronics, fashion, home, beauty and more — thoughtfully curated, beautifully simple.",
};

export const dynamic = "force-dynamic";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const products = await getAllProducts();

  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body className="min-h-full flex flex-col antialiased bg-background text-foreground">
        <Providers products={products}>
          <SiteChrome>{children}</SiteChrome>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
