import { Container } from "@/components/layout";
import SidebarNav from "./components/sibebar-navigation";
import { Separator } from "@/components/ui/separator";

const sidebarNavItems = [
  {
    title: "Profile",
    href: "/profile",
  },
  {
    title: "Identity Verification",
    href: "/profile/identity-verification",
  },
  {
    title: "Living Arrangements",
    href: "/profile/address-history",
  },
  {
    title: "Employment History",
    href: "/profile/employment-history",
  },
  // {
  //   title: "Income Verification",
  //   href: "/profile/verify-income",
  // },
];

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Container>
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">
          Manage your account settings and set e-mail preferences.
        </p>
      </div>
      <Separator className="my-6" />
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="lg:w-1/5">
          <SidebarNav items={sidebarNavItems} />
        </aside>
        {/* <div className="flex-1 lg:max-w-2xl">{children}</div> */}
        <div className="flex-1">{children}</div>
      </div>
    </Container>
  );
}
