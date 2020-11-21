import { async, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserManagerService } from './user-manager.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { UserModel } from '../models/user.model';
import { Users } from '../dtos/users';
import { UserDto } from '../dtos/user.dto';


describe('UserManagerService', () => {

  let service: UserManagerService;
  let httpClientSpy;
  let httpMock: HttpTestingController;

  beforeEach(
    async(() => TestBed.configureTestingModule({
                imports: [
                  HttpClientTestingModule
                ],
                schemas: [CUSTOM_ELEMENTS_SCHEMA]
              })
        )
  );

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'put']);
    service = TestBed.get(UserManagerService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return list of user', () => {
    // Arrange
    const usersMock = [{
      nombre : 'Nicolás Test',
      apellido: 'Kolumbic Test',
      email: 'nicolas@chess.com',
      direccion: 'test',
      telefono: '123456789',
      usuario: 'nicolas',
      clave: 'abcd1234',
      imagen64: 'test'
    }];

    const response = {
      response: {
        dsUsuariosDemo: {
          ttusuarios: usersMock
        }
      }
    };

    // Act
    service.getAll().subscribe((users) => {
      // Assert
      expect(users.length).toBe(usersMock.length);
    });

    // Assert
    const req = httpMock.expectOne('http://190.210.222.36:8083//web/pdo/DemoWS/demo/obtenerUsuarios');
    expect(req.request.method).toEqual('PUT');

    req.flush(response);

    httpMock.verify();
  });

  it('should be insert a new user', () => {
    // Arrange
    const userMock =
      {
        name : 'Nicolás Test',
        lastName: 'Kolumbic Test',
        email: 'nicolas@chess.com',
        address: 'test',
        phone: '123456789',
        userName: 'nicolas',
        password: 'abcd1234',
        avatar: 'test',
        userId: 1
      } as UserDto;
    const responseMock = {
      response: {
        pcErr: ''
      }
    };

    (service as any).usersIds = [];

    // Act
    service.create(userMock).subscribe((response: any) => {
      // Assert
      expect(response.pcErr).toEqual(responseMock.response.pcErr);
    });

    // Assert
    const req = httpMock.expectOne('http://190.210.222.36:8083//web/pdo/DemoWS/demo/gestionarUsuarios');
    expect(req.request.method).toEqual('PUT');

    req.flush(responseMock);

    httpMock.verify();
  });

  it('should be update a user', () => {
    // Arrange
    const userMock =
      {
        name : 'Nicolás Test',
        lastName: 'Kolumbic Test',
        email: 'nicolas@chess.com',
        address: 'test',
        phone: '123456789',
        userName: 'nicolas',
        password: 'abcd1234',
        avatar: 'test',
        userId: 1
      } as UserDto;
    const responseMock = {
      response: {
        pcErr: ''
      }
    };

    (service as any).usersIds = [1];

    // Act
    service.update(userMock).subscribe((response: any) => {
      // Assert
      expect(response.pcErr).toEqual(responseMock.response.pcErr);
    });

    // Assert
    const req = httpMock.expectOne('http://190.210.222.36:8083//web/pdo/DemoWS/demo/gestionarUsuarios');
    expect(req.request.method).toEqual('PUT');

    req.flush(responseMock);

    httpMock.verify();
  });

  it('should be delete a user', () => {
    // Arrange
    const userMock =
      {
        name : 'Nicolás Test',
        lastName: 'Kolumbic Test',
        email: 'nicolas@chess.com',
        address: 'test',
        phone: '123456789',
        userName: 'nicolas',
        password: 'abcd1234',
        avatar: 'test',
        userId: 1
      } as UserDto;

    const responseMock = {
      response: {
        pcErr: ''
      }
    };

    (service as any).usersIds = [1];

    // Act
    service.delete(userMock).subscribe((response: any) => {
      // Assert
      expect(response.pcErr).toEqual(responseMock.response.pcErr);
    });

    // Assert
    const req = httpMock.expectOne('http://190.210.222.36:8083//web/pdo/DemoWS/demo/gestionarUsuarios');
    expect(req.request.method).toEqual('PUT');

    req.flush(responseMock);

    httpMock.verify();
  });


});
