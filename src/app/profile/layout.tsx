import { Breadcrumb } from "@/components/shared/breadcrumb";
import { ProfileSidebar } from "@/components/shared/profile-sidebar";

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container-page py-8 md:py-10">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "My Profile" }]} />
      <h1 className="mb-8 mt-3 text-2xl font-bold text-foreground md:text-3xl">My Profile</h1>
      <div className="flex flex-col gap-8 lg:flex-row">
        <ProfileSidebar />
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </div>
  );
}
