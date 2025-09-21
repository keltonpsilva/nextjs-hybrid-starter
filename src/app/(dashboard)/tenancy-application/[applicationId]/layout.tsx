import { Container } from "@/components/layout";

import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Container>
        <div className=" space-y-5">
          <h1 className="text-center text-3xl font-semibold">
            Tenancy Applications
          </h1>

          <div className="flex justify-center items-center pb-12 max-md:px-5 pt-12 w-full">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink>
                    <span className="inline-flex items-center justify-center rounded-full bg-primary px-2.5 py-0.5 text-white text-sm border-4 border-indigo-100">
                      1
                    </span>
                    <p className="inline-flex items-center justify-center pl-2">
                      Personal
                    </p>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink>
                    <span className="inline-flex items-center justify-center rounded-full bg-primary px-2 py-0.5 text-white text-sm border-4 border-indigo-100">
                      2
                    </span>
                    <p className="inline-flex items-center justify-center pl-2">
                      Employement
                    </p>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink>
                    <span className="inline-flex items-center justify-center rounded-full bg-primary px-2 py-0.5 text-white text-sm border-4 border-indigo-100">
                      3
                    </span>
                    <p className="inline-flex items-center justify-center pl-2">
                      Living Arrangement
                    </p>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink>
                    <span className="inline-flex items-center justify-center rounded-full bg-primary px-2 py-0.5 text-white text-sm border-4 border-indigo-100">
                      4
                    </span>
                    <p className="inline-flex items-center justify-center pl-2">
                      Docs
                    </p>
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <div>property card here</div>
        </div>
      </Container>
      <Separator />
      <Container>
        <div className="flex justify-center">
          <div className="flex items-center justify-center max-w-[850px]">
            {children}
          </div>
        </div>
      </Container>
    </>
  );
}
