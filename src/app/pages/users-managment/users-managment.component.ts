import { Component, OnInit } from '@angular/core';
import { Column } from 'src/app/dtos/column';
import { UserDto } from 'src/app/dtos/user.dto';
import { UserManagerService } from 'src/app/services/user-manager.service';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-users-managment',
  templateUrl: './users-managment.component.html',
  styleUrls: ['./users-managment.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class UsersManagmentComponent implements OnInit {

  users: UserDto[];
  cols: Column[];
  productDialog: boolean;
  user: UserDto;
  submitted: boolean;
  isEdit: boolean;

  constructor(
    private userManagerService: UserManagerService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {  }

  ngOnInit() {
    this.loadGrid();
  }

  public openNew() {
    this.submitted = false;
    this.productDialog = true;
    this.user = null;
    this.isEdit = false;
  }

  public onClose(refresh: boolean) {
    this.productDialog = false;
    if (refresh) {
      this.loadGrid();
    }
  }

  public editUser(user: UserDto) {
    this.user = user;
    this.isEdit = true;
    this.submitted = false;
    this.productDialog = true;
  }

  public deleteUser(user: UserDto) {
    this.confirmationService.confirm({
      message: 'Esta por eliminar un usuario, desea confirmar la acción?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Si',
      rejectLabel: 'No',
      accept: () => {
        this.userManagerService.delete(user).subscribe((result: any) => {
         if (!result.pcErr) {
            this.messageService.add(
              {
                severity: 'success',
                summary: 'Operación Completa',
                detail: 'Se ha eliminado el usuario'
              });
            this.loadGrid();
         } else {
          this.messageService.add(
            {
              severity: 'error',
              summary: 'Operación Fallida',
              detail: 'Se ha producido un error, vuelva a intentarlo o comuniquese con nuestro soporte'
            });
         }
        });
      }
  });
  }

  private getUsersManagmentColumns() {

    const usuario = new Column();
    usuario.field = 'userName';
    usuario.header = 'Usuario';

    const activo = new Column();
    activo.field = 'isActive';
    activo.header = 'Estado';

    const nombre = new Column();
    nombre.field = 'name';
    nombre.header = 'Nombre';

    const apellido = new Column();
    apellido.field = 'lastName';
    apellido.header = 'Apellido';

    const email = new Column();
    email.field = 'email';
    email.header = 'Email';

    const telefono = new Column();
    telefono.field = 'phone';
    telefono.header = 'Teléfono';

    const actions = new Column();
    actions.field = 'actions';

    return [
      usuario,
      activo,
      nombre,
      apellido,
      email,
      telefono,
      actions
    ];
  }

  private loadGrid() {
    this.userManagerService.getAll().subscribe(users =>  this.users = users);
    this.cols = this.getUsersManagmentColumns();
  }

}
