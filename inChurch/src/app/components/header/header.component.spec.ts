import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from 'src/app/core/auth/auth.service';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let router: Router;
  let authService: AuthService;
  let snackBar: MatSnackBar;

  beforeEach(() => {
    const authServiceMock = {
      logout: jasmine.createSpy('logout')
    };
    const snackBarMock = {
      open: jasmine.createSpy('open')
    };

    TestBed.configureTestingModule({
      imports: [
        MatIconModule,
        RouterTestingModule, 
        NoopAnimationsModule
      ],
      declarations: [HeaderComponent],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: MatSnackBar, useValue: snackBarMock }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    router = TestBed.inject(Router);
    authService = TestBed.inject(AuthService);
    snackBar = TestBed.inject(MatSnackBar);
    spyOn(router, 'navigateByUrl');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open snackbar with correct message', () => {
    component.logout();
    
    expect(snackBar.open).toHaveBeenCalledWith(
      'Volte sempre', 
      'OK', 
      { duration: 3000 }
    );
  });

  it('should navigate to login page', () => {
    component.logout();
    
    expect(router.navigateByUrl).toHaveBeenCalledWith('/login');
  });

  it('should call authService logout', () => {
    component.logout();
    
    expect(authService.logout).toHaveBeenCalled();
  });
});
