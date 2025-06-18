import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let snackBar: MatSnackBar;
  let authService: AuthService;
  let router: Router;
  
  const snackBarMock = {
    open: jasmine.createSpy('open')
  };

  const authServiceMock = {
    login: jasmine.createSpy('login').and.returnValue(true)
  };

  const routerMock = {
    navigateByUrl: jasmine.createSpy('navigateByUrl')
  };
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      providers: [
        { provide: MatSnackBar, useValue: snackBarMock },
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock },
        FormBuilder
      ],
      imports:[ReactiveFormsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    snackBar = TestBed.inject(MatSnackBar);
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should initialize the login form with validators', () => {
    expect(component.loginForm).toBeDefined();
    expect(component.loginForm.controls['email']).toBeDefined();
    expect(component.loginForm.controls['password']).toBeDefined();

    const emailControl = component.loginForm.get('email');
    expect(emailControl?.hasError('required')).toBeTruthy();
    
    emailControl?.setValue('invalid-email');
    expect(emailControl?.hasError('email')).toBeTruthy();

    const passwordControl = component.loginForm.get('password');
    expect(passwordControl?.hasError('required')).toBeTruthy();
    
    passwordControl?.setValue('123');
    expect(passwordControl?.hasError('minlength')).toBeTruthy();
  });

    
  it('should call authService.login and show success message when credentials are valid', () => {
    const testEmail = 'test@example.com';
    const testPassword = '1234';
    
    component.loginForm.controls['email'].setValue(testEmail);
    component.loginForm.controls['password'].setValue(testPassword);
    
    component.makeLogin();
    
    expect(authService.login).toHaveBeenCalledWith(testEmail, testPassword);
    expect(snackBarMock.open).toHaveBeenCalledWith('Login feito com sucesso', 'OK', { duration: 3000 });
    expect(routerMock.navigateByUrl).toHaveBeenCalledWith('/home');
  });
    
 

  it('should call snackBar.open with correct parameters', () => {
    const testMessage = 'Test message';
    const testAction = 'TestAction';
    
    component.openSnackBar(testMessage, testAction);
    
    expect(snackBarMock.open).toHaveBeenCalledWith(testMessage, testAction, { duration: 3000 });
  });
});
