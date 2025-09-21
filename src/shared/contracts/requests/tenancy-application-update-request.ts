type PersonalReference = {
  fullName: string
  relationship: string
  relationshipYears: number
  relationshipMonths: number
  emailAddress: string
  phoneNumber: string
  refereeAuthority: boolean
}

export type TenancyApplicationUpdateRequest = {
  personalReference: PersonalReference
}
