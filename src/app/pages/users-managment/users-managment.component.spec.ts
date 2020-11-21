import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { UserFormComponent } from 'src/app/components/user-form/user-form.component';

import { UsersManagmentComponent } from './users-managment.component';

describe('UsersManagmentComponent', () => {
  let component: UsersManagmentComponent;
  let fixture: ComponentFixture<UsersManagmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        UsersManagmentComponent,
        UserFormComponent
      ],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        TableModule,
        ButtonModule,
        SplitButtonModule,
        DialogModule,
        ConfirmDialogModule,
        ToastModule,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersManagmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


});
