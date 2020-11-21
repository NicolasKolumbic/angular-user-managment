import { _ParseAST } from '@angular/compiler';
import { UserModel } from '../models/user.model';

export class UserDto {
    public userId: number;
    public userName: string;
    public isActive: boolean;
    public password: string;
    public name: string;
    public lastName: string;
    public email: string;
    public address: string;
    public phone: string;
    public avatar: string;

    constructor(user: Partial<UserModel>) {
        this.name = user.nombre;
        this.lastName = user.apellido;
        this.address = user.direccion;
        this.phone = user.telefono;
        this.email = user.email;
        this.userName = user.usuario;
        this.password = user.clave;
        this.isActive = user.activo;
        this.userId = user.nrousu;
        this.avatar = user.imagen64;
    }
}
