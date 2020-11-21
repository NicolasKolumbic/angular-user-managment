import { UserDto } from '../dtos/user.dto';

export class UserModel {
    public nrousu: number;
    public usuario: string;
    public activo: boolean;
    public clave: string;
    public nombre: string;
    public apellido: string;
    public email: string;
    public direccion: string;
    public telefono: string;
    public imagen64: string;

    constructor(user: Partial<UserDto>) {
        this.email = user.email;
        this.nrousu = user.userId;
        this.activo = user.isActive;
        this.nombre = user.name;
        this.apellido = user.lastName;
        this.clave = user.password;
        this.direccion = user.address;
        this.telefono = user.phone;
        this.usuario = user.userName;
        this.imagen64 = user.avatar;
    }
}
