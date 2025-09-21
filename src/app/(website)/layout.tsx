import PageHeaderNavigation from "@/components/layout/page-header-navigation";
import FooterSection from "./layout/footer-section/footer-section";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <PageHeaderNavigation />
      {children}
      <FooterSection />
    </>
  );
}
