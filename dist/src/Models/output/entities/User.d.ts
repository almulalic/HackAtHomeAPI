import { Post } from "../../Entities/Post";
export declare class User {
    id: number;
    firstName: string;
    lastName: string;
    email: string | null;
    role: number | null;
    isConfirmed: number;
    dateOfBirth: string | null;
    telephoneNumber: string | null;
    refreshToken: string | null;
    createdAt: Date | null;
    modifiedAt: Date | null;
    archivedAt: Date | null;
    posts: Post[];
}
