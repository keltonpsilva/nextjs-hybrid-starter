import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

import { ComingSoonBadge } from "./coming-soon-badge";

export function ComingSoonCard({
  title,
  description,
}: {
  title: string;
  description: string;
  // icon: React.ReactNode ;
}) {
  return (
    <Card className="bg-muted/50 border-dashed">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {/* {icon && { icon }} */}
      </CardHeader>
      <CardContent>
        <div className="text-sm text-muted-foreground">{description}</div>
      </CardContent>
      <CardFooter>
        <ComingSoonBadge />
      </CardFooter>
    </Card>
  );
}
