import "next-auth";

declare module "next-auth" {
  interface User {
    displayName?: string | null;
    idToken?: string | null;
  }

  interface Session {
    idToken?: string;
    //uid?: string;
  }
}
