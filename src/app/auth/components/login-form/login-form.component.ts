import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  public form: FormGroup;

  public emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  public loginFormControl = new FormControl('', [Validators.required]);

  public passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
  ]);

  constructor(public authService: AuthService) {
    this.form = new FormGroup({
      email: this.emailFormControl,
      login: this.loginFormControl,
      password: this.passwordFormControl,
    });
  }
  ngOnInit(): void {

  }

  login() {
    this.authService.login(this.form.value.login);
  }

  loginAsAdmin() {
    this.login();
    this.authService.loginAsAdmin();
  }
}
