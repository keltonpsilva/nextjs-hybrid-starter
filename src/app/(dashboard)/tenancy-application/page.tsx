import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { TenancyApplicationContainer } from "./components/tenancy-application-container";

export default function TenancyApplicationsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tenancy Applications</CardTitle>
        <CardDescription>
          View and manage your rental applications
        </CardDescription>
      </CardHeader>

      <CardContent>
        <TenancyApplicationContainer />
      </CardContent>
    </Card>
  );
}
