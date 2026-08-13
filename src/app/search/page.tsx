import { Suspense } from "react";
import { Metadata } from "next";
import { SearchResults } from "@/components/shared/search-results";

export const metadata: Metadata = {
  title: "Search — PasalMandu",
};

export default function SearchPage() {
  return (
    <Suspense fallback={null}>
      <SearchResults />
    </Suspense>
  );
}
