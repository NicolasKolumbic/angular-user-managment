import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { UserDto } from 'src/app/dtos/user.dto';
import { UserManagerService } from 'src/app/services/user-manager.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  userForm: FormGroup;

  @Input() user: UserDto;
  @Input() isEdit: boolean;

  @Output() closeDialogEvent = new EventEmitter<boolean>();

  constructor(
    private readonly formBuilder: FormBuilder,
    private userManagerService: UserManagerService,
    private messageService: MessageService
  ) {

    this.userForm = this.formBuilder.group({
      name: ['', [Validators.required ]],
      lastName: ['', [Validators.required ]],
      email: ['', [Validators.required, Validators.email]],
      address: [''],
      phone: ['', [Validators.required, Validators.pattern(/\d+/)]],
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]],
      avatar: [''],
      isActive: [false],
      userId: [0]
    });

  }

  ngOnInit() {
    if (this.user) {
      this.userForm.setValue(this.user);
    } else {
      this.user = new UserDto({});
    }

  }

  public closeDialog(refresh: boolean) {
    this.closeDialogEvent.emit(refresh);
  }

  public saveUser() {
    const userDto = this.userForm.value;
    if (this.isEdit) {
      this.userManagerService.update(userDto).subscribe( response => this.showMessage(response));
    } else {
      this.userManagerService.create(userDto).subscribe( response => this.showMessage(response));
    }

  }

  public showMessage(result) {
      if (!result || result && !result.pcErr) {
        this.messageService.add(
        {
          severity: 'success',
          summary: 'Operación Completa',
          detail: 'Se ha guardado el nuevo usuario'
        });
        this.closeDialog(true);
      } else {
        this.messageService.add(
        {
          severity: 'error',
          summary: 'Operación Fallida',
          detail: 'Se ha producido un error, vuelva a intentarlo o comuniquese con nuestro soporte'
        });
      }
  }

  public onSelectFile(imageBase64: any) {
    this.user.avatar = imageBase64;
    this.userForm.get('avatar').setValue(imageBase64);
  }

}
