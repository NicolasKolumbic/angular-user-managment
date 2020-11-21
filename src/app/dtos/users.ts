import { UserModel } from '../models/user.model';
import { UserDto } from './user.dto';

export class Users {
    ttusuarios: UserModel[] = [];

    constructor(user: Partial<UserDto>) {
        const userModel = new UserModel(user);
        this.ttusuarios.push(userModel);
    }
}
