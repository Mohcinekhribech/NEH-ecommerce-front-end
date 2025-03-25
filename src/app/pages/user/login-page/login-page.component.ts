import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { loginInfo } from 'src/app/core/models/loginInfo.model';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  info: loginInfo = {
    email: '',
    password: '',
  };
  error: String = '';
  login() {
    this.authService.authentication(this.info).subscribe(
      (data) => {
      if (data.access_token && data.user) {
        this.authService.setAuthInfo(data.access_token, data.user);
        if (data.user.role == 'Admin') this.router.navigate(['/dashboard']);
        else this.router.navigate(['/']);
      } else {
        this.error = 'email or password incorrect';
      }
      // return this.store.dispatch(
      //   successLogin({
      //     user: data.user,
      //     token: data.access_token,
      //   })
      // );
    },
    err => {
      this.error = 'email or password incorrect';
    }
  );
  }
}
