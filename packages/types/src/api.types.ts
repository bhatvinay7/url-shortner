export interface userResponse{
    message:string
}


export interface userSigninData{
    email:string,
    password:string
}

export interface userCredentials{
    username:string |null
    userId:string |null,
    isVerified:boolean |null,
    picture:string |null,
    emailId:string,
    token:string
}

// export interface GoogleProfile {
//   id: string;
//   displayName: string;
//   name: { givenName: string; familyName: string };
//   emails?: { value: string }[];
//   photos?: { value: string }[];
//   provider: string;
// }



// declare module "passport-google-oidc" {
//   import { Strategy as PassportStrategy } from "passport";
//   import { VerifyCallback } from "passport-oauth2";


//   interface GoogleStrategyOptions {
//     clientID: string;
//     clientSecret: string;
//     callbackURL: string;
//     scope?: string[];
//   }

//   class Strategy extends PassportStrategy {
//     constructor(
//       options: GoogleStrategyOptions,
//       verify: (issuer: string, profile: GoogleProfile, done: VerifyCallback) => void
//     );
//   }

//   export default Strategy;
// }

