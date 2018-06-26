import { UserProfile } from "./user-profile";

export class User {
    id: number;
    ssoId: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    userProfiles: UserProfile[];
}
