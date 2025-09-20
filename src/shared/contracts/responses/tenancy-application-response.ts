export type TenancyApplicationResponse = {
  id: string;
  status: string;
  submittedDateUtc?: Date;

  user: TenancyApplicationUserResponse;
  property: TenancyApplicationPropertyResponse;
  personalReference: TenancyApplicationPersonalReferenceResponse;
};

type TenancyApplicationUserResponse = {
  id: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
  phoneNumber: string;
  dateOfBirth: Date;
};

type TenancyApplicationPropertyResponse = {
  id: string;
};

type TenancyApplicationPersonalReferenceResponse = {
  fullName: string;
  relationship: string;
  relationshipYears: number;
  relationshipMonths: number;
  emailAddress: string;
  phoneNumber: string;
};
