import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CheckoutComponent } from './checkout.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';
import { Component } from '@angular/core';

describe('CheckoutComponent', () => {
  let component: CheckoutComponent;
  let fixture: ComponentFixture<CheckoutComponent>;

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
      declarations: [CheckoutComponent, MockNavComponent, MockFooterComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ToastrModule.forRoot({
          positionClass: 'toast-bottom-right',
          preventDuplicates: true,
        }),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
