import { Container } from "@/components/layout";

import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <Container>
      <div className="grid grid-cols-4 gap-6">
        {[...Array(8)].map((_, index) => (
          // <div key={index} className="w-[300px]">
          <div className="col-span-4 md:col-span-2 lg:col-span-1" key={index}>
            <Card className="h-full">
              <CardHeader>
                <Skeleton className="h-48 w-full rounded-t-lg" />
              </CardHeader>
              <CardContent className="space-y-2 pt-4">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-1/2" />
              </CardContent>
              <CardFooter>
                <Skeleton className="h-10 w-full" />
              </CardFooter>
            </Card>
          </div>
        ))}
        {/* {Array.from({ length: 12 }, (_, i) => i + 1).map((id) => (
          <div className="col-span-4 md:col-span-2 lg:col-span-1" key={id}>
            <Card>
              <Skeleton className="rounded-t-lg aspect-[2.17] w-full" />
              <div className="relative ">
                <CardHeader className={cn("pt-3 pb-3")}>
                  <CardTitle className={cn("pt-0")}>
                    <div className="flex gap-0.5 whitespace-nowrap">
                      <Skeleton />
                    </div>
                  </CardTitle>
                  <CardTitle className={cn("text-base line-clamp-1")}>
                    <Skeleton className="h-6 w-1/2" />
                  </CardTitle>
                  <CardDescription>
                    <Skeleton className="h-6 w-10/12" />
                  </CardDescription>
                </CardHeader>

                <div className="absolute inset-0 mr-5 mt-5 flex justify-end  ">
                  <div className="flex items-center justify-center bg-transparent rounded-full border w-8 h-8">
                    <Skeleton />
                  </div>
                </div>
              </div>

              <CardContent>
                <Separator />
                <Skeleton className="mt-2 h-6 w-full" />
              </CardContent>
            </Card>
          </div>
        ))} */}
      </div>
    </Container>
  );
}
