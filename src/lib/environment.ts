const environment = {
  FeatureFlags: {
    TenancyApplicationEnabled: process.env.NEXT_PUBLIC_APP_ENV !== "production",
  },
  BlobStorageUrl:
    process.env.NEXT_PUBLIC_APP_ENV === "production"
      ? "https://housemottoproduction.blob.core.windows.net"
      : "https://housemottostaging.blob.core.windows.net",
  Environment: process.env.NEXT_PUBLIC_APP_ENV,
  IsProduction: process.env.NEXT_PUBLIC_APP_ENV === "production",
};

export default environment;
