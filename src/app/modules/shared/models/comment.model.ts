import { Profile } from './profile.model';

export class Comment {

    constructor(public body: string, public createdAt = new Date(), public author: Profile = new Profile('ray', '')) {

    }
    id: number;
}
