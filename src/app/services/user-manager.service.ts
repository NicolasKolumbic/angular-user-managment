import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';

import { catchError, map, pluck, tap } from 'rxjs/operators';
import { UserModel } from '../models/user.model';
import { UserDto } from '../dtos/user.dto';
import { UserRequest } from '../dtos/user-request';
import { Action } from '../helpers/action.enum';
import { Users } from '../dtos/users';


@Injectable({
  providedIn: 'root'
})
export class UserManagerService {

  private basePath = 'http://190.210.222.36:8083//web/pdo/DemoWS/demo';
  private usersIds: number[];

  constructor(private readonly httpClient: HttpClient) { }

  public getAll() {
    return this.httpClient
    .put(`${this.basePath}/obtenerUsuarios`, {})
    .pipe(
      pluck('response', 'dsUsuariosDemo', 'ttusuarios'),
      map((users: UserModel[]) => {
        return users.map((user: UserModel) => {
          return new UserDto(user);
        });
      }),
      tap((users: UserDto[]) => {
        this.usersIds = users.map((userDto: UserDto) => userDto.userId );
      })
    );
  }

  public update(user: UserDto) {
    const updateReq =  this.GetUpdateRequest(user);
    return this.userManagment(updateReq);
  }

  public create(user: UserDto) {
    const createReq =  this.GetCreateRequest(user);
    return this.userManagment(createReq);
  }

  public delete(user: UserDto) {
    const deleteReq =  this.GetDeleteRequest(user);
    return this.userManagment(deleteReq);
  }

  private userManagment(req: UserRequest) {
    return this.httpClient
    .put(`${this.basePath}/gestionarUsuarios`, req)
    .pipe(
      pluck('response')
    );
  }

  private GetUpdateRequest(user: UserDto) {
    const request = new UserRequest();
    request.pcaccion = Action.UPDATE;
    request.dsUsuariosDemo = new Users(user);

    return request;
  }

  private GetCreateRequest(user: UserDto) {
    user.userId = this.GenerateRandomId();

    const request = new UserRequest();
    request.pcaccion = Action.CREATE;
    request.dsUsuariosDemo = new Users(user);

    return request;
  }

  private GetDeleteRequest(user: UserDto) {
    const request = new UserRequest();
    request.pcaccion = Action.DELETE;
    request.dsUsuariosDemo = new Users(user);

    return request;
  }

  private GenerateRandomId() {
    const id = Math.round(Math.random() * 200);

    if (this.usersIds.includes(id)) {
      this.GenerateRandomId();
    }

    return id;
  }

}
