import { Container } from "@/components/layout";
import PageHeaderNavigation from "@/components/layout/page-header-navigation";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <PageHeaderNavigation />
      <Container>{children}</Container>
    </>
  );
}
