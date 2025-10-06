export interface userResponse{
    message:string
}

export interface userSignupData{
    username:string,
    email:string,
    password:string
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