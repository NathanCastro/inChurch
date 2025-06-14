import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ){}

  ngOnInit(): void{
    this.setForm();
  }

  makeLogin(){




    // this.snackBar.open('funcionou', 'ok',{
    //   duration: 3000,
    // });
  }

  private setForm(): void{
    this.loginForm = this.fb.group({
      email:['', [Validators.email, Validators.required]],
      password:['', [Validators.required, Validators.minLength(4)]]
    })
  }
}
