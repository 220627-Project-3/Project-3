import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';
import { RegisterComponent } from './register.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';
import { Component } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  @Component({
    selector: 'app-navbar',
    template: '',
  })
  class MockNavComponent {}

  @Component({
    selector: 'app-footer',
    template: '',
  })
  class MockFooterComponent {}

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterComponent, MockNavComponent, MockFooterComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        ToastrModule.forRoot({
          positionClass: 'toast-bottom-right',
          preventDuplicates: true,
        }),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
