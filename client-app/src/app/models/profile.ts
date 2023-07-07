import { User } from "./user";

export interface Profile{
    username: string;
    displayName: string;
    followersCount: number;
    followingCount: number;
    following: boolean;
    image?: string;
    bio?: string;
    photos?: Photo[];
}

export class Profile implements Profile{
    constructor(user: User) {
        this.username = user.username;
        this.displayName = user.displayName;
        this.image = user.image;
    }
}

export interface Photo{
    id: string;
    url: string;
    isMain: boolean;
}
