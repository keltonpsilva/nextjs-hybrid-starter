import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { ViewingsTableContainer } from "./viewings-table-container";

export default function Viewing() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>My Viewing Bookings</CardTitle>
        <CardDescription>View and manage your viewing booking</CardDescription>
      </CardHeader>

      <CardContent>
        <ViewingsTableContainer />
      </CardContent>
    </Card>
  );
}
