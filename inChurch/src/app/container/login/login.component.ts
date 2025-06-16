import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private authService: AuthService
  ){}

  ngOnInit(): void{
    this.setForm();
  }

  public makeLogin(){
    if(this.loginForm.valid){
      const { email, password } = this.loginForm.value;
      const isAuthenticated = this.authService.login(email,password);

      if(isAuthenticated){
        this.openSnackBar('Login feito com sucesso');
        this.router.navigateByUrl("/home")
      } else {
        this.openSnackBar('Email ou senha estão errados')
      }
    }
  }

  public openSnackBar(message: string, action: string = 'OK'){
    this.snackBar.open(message, action, {
      duration:3000
    })
  }

  private setForm(): void{
    this.loginForm = this.fb.group({
      email:['', [Validators.email, Validators.required]],
      password:['', [Validators.required, Validators.minLength(4)]]
    })
  }
}
