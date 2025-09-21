import React from "react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { RENT_LISTING_PAGE_PATH } from "@/shared/router/router-paths";

import { UpcomingViewingsSection } from "./upcoming-viewings-section";

interface Property {
  id: number;
  address: string;
  type: string;
  rent: string;
  status: string;
  image: string;
}

interface Viewing {
  id: number;
  property: string;
  date: string;
  time: string;
  status: string;
}

interface Document {
  id: number;
  name: string;
  status: string;
}

interface Payment {
  id: number;
  amount: string;
  date: string;
  status: string;
}

interface MaintenanceRequest {
  id: number;
  issue: string;
  status: string;
}

interface User {
  name: string;
  email: string;
  verificationStatus: "verified" | "unverified"; // assuming possible values
  role: "tenant" | "buyer"; // as per comment in the object
  properties: Property[];
  viewings: Viewing[];
  documents: Document[];
  payments: Payment[];
  maintenanceRequests: MaintenanceRequest[];
}

export function DashboardConainer() {
  const user: User = {
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    verificationStatus: "verified",
    role: "tenant", // or 'buyer'
    properties: [
      // {
      //   id: 1,
      //   address: "24 Park Lane, London, W1K 7BE",
      //   type: "rental",
      //   rent: "£1,850 pcm",
      //   status: "active",
      //   image: "/property1.jpg",
      // },
    ],
    viewings: [
      // {
      //   id: 1,
      //   property: "3 Bed House, Manchester",
      //   date: "2023-11-15",
      //   time: "14:00",
      //   status: "confirmed",
      // },
      // {
      //   id: 2,
      //   property: "3 Bed House, Manchester",
      //   date: "2023-11-15",
      //   time: "14:00",
      //   status: "confirmed",
      // },
      // {
      //   id: 3,
      //   property: "3 Bed House, Manchester",
      //   date: "2023-11-15",
      //   time: "14:00",
      //   status: "confirmed",
      // },
    ],
    documents: [
      { id: 1, name: "Tenancy Agreement", status: "signed" },
      { id: 2, name: "Inventory Checklist", status: "pending" },
    ],
    payments: [
      { id: 1, amount: "£1,850", date: "2023-11-01", status: "paid" },
      { id: 2, amount: "£1,850", date: "2023-11-01", status: "paid" },
      { id: 3, amount: "£1,850", date: "2023-11-01", status: "paid" },
    ],
    maintenanceRequests: [
      { id: 1, issue: "Leaking tap in kitchen", status: "in progress" },
      { id: 2, issue: "Leaking tap in bathroom", status: "in progress" },
      { id: 3, issue: "Heating not working", status: "in progress" },
    ],
  };

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* First column - takes 2/3 of the space */}
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full-width card */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Your Properties</CardTitle>
                <CardDescription>
                  {user.role === "tenant"
                    ? "Properties you're currently renting"
                    : "Saved properties and purchases"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* <div className="h-64 bg-muted rounded-md flex items-center justify-center">
                      <p className="text-muted-foreground">
                        Chart visualization
                      </p>
                    </div> */}

                {user.properties.length > 0 ? (
                  <div className="space-y-4">
                    {user.properties.map((property) => (
                      <div
                        key={property.id}
                        className="flex items-center gap-4"
                      >
                        <div className="h-16 w-16 rounded-md bg-gray-100 overflow-hidden">
                          <Image
                            src={`https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg`}
                            alt={`listing-img` + property.id}
                            className="h-full w-full object-cover"
                            width={100}
                            height={100}
                          />
                        </div>
                        <div>
                          <h3 className="font-medium">{property.address}</h3>
                          <p className="text-sm text-muted-foreground">
                            {property.type === "rental"
                              ? property.rent
                              : "Purchase"}
                          </p>
                          <span
                            className={`text-xs ${
                              property.status === "active"
                                ? "text-green-600"
                                : "text-yellow-600"
                            }`}
                          >
                            {property.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-sm">
                    {user.role === "tenant"
                      ? "You don't have any active rentals"
                      : "You haven't saved any properties yet"}
                  </p>
                )}
                <Link href={RENT_LISTING_PAGE_PATH}>
                  <Button variant="outline" className="mt-4 w-full">
                    {user.role === "tenant"
                      ? "Find New Rental"
                      : "Browse Properties"}
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Documents */}

            {/* <ComingSoonCard
              title="Payments"
              description="Track your property payments"
            /> */}
            {/* 
                <Card>
                  <CardHeader>
                    <CardTitle>Payments</CardTitle>
                    <CardDescription>
                      {user.role === "tenant"
                        ? "Rent and deposit payments"
                        : "Purchase payments and deposits"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {user.payments.length > 0 ? (
                      <div className="space-y-3">
                        {user.payments.map((payment) => (
                          <div
                            key={payment.id}
                            className="flex items-center justify-between"
                          >
                            <div>
                              <p className="font-medium">{payment.amount}</p>
                              <p className="text-sm text-muted-foreground">
                                Due{" "}
                                {new Date(payment.date).toLocaleDateString(
                                  "en-GB"
                                )}
                              </p>
                            </div>
                            <span
                              className={`text-xs px-2 py-1 rounded ${
                                payment.status === "paid"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {payment.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground text-sm">
                        No payment history
                      </p>
                    )}

                    <Button variant="outline" className="mt-4 w-full">
                      Make a Payment
                    </Button>
                  </CardContent>
                </Card> */}

            {/* Documents */}
            {/* <ComingSoonCard
              title="Documents"
              description="Track your tenancy documents"
            /> */}

            {/* <Card>
                  <CardHeader>
                    <CardTitle>Documents</CardTitle>
                    <CardDescription>
                      {user.role === "tenant"
                        ? "Your tenancy documents"
                        : "Purchase contracts and paperwork"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {user.documents.length > 0 ? (
                      <div className="space-y-3">
                        {user.documents.map((doc) => (
                          <div
                            key={doc.id}
                            className="flex items-center justify-between"
                          >
                            <div className="flex items-center gap-3">
                              <FileText className="h-5 w-5 text-muted-foreground" />
                              <span className="font-medium">{doc.name}</span>
                            </div>
                            <span
                              className={`text-xs px-2 py-1 rounded ${
                                doc.status === "signed"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {doc.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground text-sm">
                        No documents available
                      </p>
                    )}
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="mt-4 w-full">
                      Upload Document
                    </Button>
                  </CardFooter>
                </Card> */}

            {/* Full-width card */}
            {/* <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>Sales Overview</CardTitle>
                    <CardDescription>Weekly performance</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 bg-muted rounded-md flex items-center justify-center">
                      <p className="text-muted-foreground">
                        Chart visualization
                      </p>
                    </div>
                  </CardContent>
                </Card> */}
          </div>
        </div>

        {/* Second column - takes 1/3 of the space */}
        <div className="space-y-6">
          {/* Sticky container for both right column cards */}
          <div className="space-y-6">
            {/* Maintenance Requests */}
            {/* <ComingSoonCard
              title="Maintenance"
              description="Your repair requests"
            /> */}

            {/* Upcoming Viewings */}
            <UpcomingViewingsSection />

            {/* 
                <Card className="md:col-span-1">
                  <CardHeader>
                    <CardTitle>Maintenance</CardTitle>
                    <CardDescription>Your repair requests</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {user.maintenanceRequests.length > 0 ? (
                      <div className="space-y-3">
                        {user.maintenanceRequests.map((request) => (
                          <div
                            key={request.id}
                            className="border-b pb-3 last:border-0 last:pb-0"
                          >
                            <h3 className="font-medium">{request.issue}</h3>
                            <div className="flex justify-between items-center mt-1">
                              <span
                                className={`text-xs px-2 py-1 rounded ${
                                  request.status === "completed"
                                    ? "bg-green-100 text-green-800"
                                    : request.status === "in progress"
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-yellow-100 text-yellow-800"
                                }`}
                              >
                                {request.status}
                              </span>
                              <Button variant="outline" size="sm">
                                Details
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground text-sm">
                        No active maintenance requests
                      </p>
                    )}
                    <Button variant="outline" className="mt-4 w-full">
                      Report an Issue
                    </Button>
                  </CardContent>
                </Card> */}

            {/* Quick Actions card */}
            {/* <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                    <CardDescription>Common tasks</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button className="w-full">
                      <span className="mr-2">📊</span> Generate Report
                    </Button>
                    <Button variant="outline" className="w-full">
                      <span className="mr-2">👤</span> Add User
                    </Button>
                    <Button variant="outline" className="w-full">
                      <span className="mr-2">📝</span> Create Post
                    </Button>
                    <Button variant="outline" className="w-full">
                      <span className="mr-2">⚙️</span> Settings
                    </Button>
                  </CardContent>
                </Card> */}

            {/* Recent Activity card */}
            {/* <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Latest events</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      {
                        user: "Alex Johnson",
                        action: "created a new post",
                        time: "2 min ago",
                      },
                      {
                        user: "Sam Wilson",
                        action: "updated settings",
                        time: "10 min ago",
                      },
                      {
                        user: "Taylor Swift",
                        action: "completed purchase",
                        time: "1 hour ago",
                      },
                      {
                        user: "Jamie Smith",
                        action: "logged in",
                        time: "2 hours ago",
                      },
                      {
                        user: "Casey Brown",
                        action: "updated profile",
                        time: "3 hours ago",
                      },
                    ].map((activity, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="h-2 w-2 mt-2 rounded-full bg-primary" />
                        <div>
                          <p className="font-medium">{activity.user}</p>
                          <p className="text-sm text-muted-foreground">
                            {activity.action} · {activity.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card> */}
          </div>
        </div>
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Quick Actions */}
        {/* 
            <Card className="md:col-span-1 lg:col-span-2">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common tasks you might need</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="h-24 flex-col gap-2">
                    <Calendar className="h-6 w-6" />
                    <span>Book a Viewing</span>
                  </Button>
                  <Button variant="outline" className="h-24 flex-col gap-2">
                    <FileText className="h-6 w-6" />
                    <span>Sign Documents</span>
                  </Button>
                  <Button variant="outline" className="h-24 flex-col gap-2">
                    <Wallet className="h-6 w-6" />
                    <span>Make Payment</span>
                  </Button>
                  <Button variant="outline" className="h-24 flex-col gap-2">
                    <Wrench className="h-6 w-6" />
                    <span>Report Repair</span>
                  </Button>
                </div>
              </CardContent>
            </Card> */}
      </div>
    </>
  );
}
