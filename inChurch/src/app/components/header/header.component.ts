import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from './../../core/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ){}

  public logout(){
    this.snackBar.open('Volte sempre', 'OK', {
      duration: 3000
    })
    this.router.navigateByUrl("/login")
    this.authService.logout();
  }
}
