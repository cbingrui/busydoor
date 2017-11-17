import { Profile } from './profile.model';

export class Comment {

    constructor(public text: string
        , public posted = new Date()
        , public username: string
        , public userid: string) {
    }
}
