import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Container } from "@/components/layout";

import { cn } from "@/lib/utils";

export default function FeaturesSection() {
  return (
    <div className="flex justify-center items-center max-md:px-5 pt-5">
      <Container>
        <div className="grid-cols-1 sm:grid-cols-2 grid gap-4 justify-center items-center">
          <div className="lg:pl-24 sm:pl-16 pr-2 py:2 ">
            <Image
              className="w-full h-5/6 rounded-md px-4 my-0 mx-auto"
              src="/assets/home-second-section.svg"
              alt="hero second section house"
              width={100}
              height={100}
            />
          </div>
          <div className="sm:px-4 px-1 inline-block align-middle mx-auto my-0">
            <Tabs defaultValue="tenants" className="">
              <TabsList className="grid grid-cols-2 sm:w-[320px] w-full h-auto bg-[#EFEFFB]">
                <TabsTrigger
                  value="tenants"
                  className={cn(
                    "text-lg py-0 p-2 data-[state=active]:text-primary"
                    // "data-[state=active]:font-semibold"
                  )}
                >
                  For tenants
                </TabsTrigger>
                <TabsTrigger
                  value="agencies"
                  className={cn(
                    "text-lg py-0 p-2 data-[state=active]:text-primary"
                    // "data-[state=active]:font-bold "
                  )}
                >
                  For agencies
                </TabsTrigger>
              </TabsList>
              <TabsContent className="shadow-none" value="tenants">
                <div className="space-y-6 mt-6">
                  <div className="lg:text-5xl text-4xl space-y-2 font-semibold">
                    <div>We make it easy </div>
                    <div>for tenants.</div>
                  </div>
                  <div className="space-y-6">
                    <div className="text-slate-400 text-sm lg:text-lg">
                      Whether you&apos;re selling your current home, securing
                      financing, or buying a new one, we streamline the entire
                      process. Our efficient, cost-effective service ensures
                      you&apos;ll save both time and money.
                    </div>
                    {/* <Button>
                      See More <ChevronRight className="h-4 w-4" />
                    </Button> */}
                  </div>
                </div>
              </TabsContent>
              <TabsContent className="shadow-none" value="agencies">
                <div className="space-y-6 mt-6">
                  <div className="lg:text-5xl text-4xl space-y-2 font-semibold">
                    <div>We make it easy </div>
                    <div>for agencies.</div>
                  </div>
                  <div className="space-y-6">
                    <div className="text-slate-400 text-sm lg:text-lg">
                      Our solution makes you thrive, whether you&apos;re selling
                      properties, securing financing, or assisting clients with
                      buying new homes, our streamlined process tackles the
                      common challenges you face.
                    </div>
                    {/* <Button>
                      See More <ChevronRight className="h-4 w-4" />
                    </Button> */}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </Container>
    </div>
  );
}
