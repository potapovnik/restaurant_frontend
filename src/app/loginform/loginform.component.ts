import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoginService, Tokens} from './login.service';

@Component({
  selector: 'app-loginform',
  templateUrl: './loginform.component.html',
  styleUrls: ['./loginform.component.scss']
})
export class LoginformComponent implements OnInit {
  _loginForm: FormGroup;
  hide = true;

  constructor(private fb: FormBuilder, private loginService: LoginService) {
    this._loginForm = fb.group({
      login: fb.control(undefined, [Validators.required]),
      password: fb.control(undefined, [Validators.required])
    });
  }

  ngOnInit() {
  }

  getErrorLogin() {
    return this._loginForm.controls['login'].hasError('required') ? 'Не может быть пустым' :
      '';
  }

  getErrorPassword() {
    return this._loginForm.controls['password'].hasError('required') ? 'Не может быть пустым' :
      '';
  }

  login() {
    this.loginService.login(this._loginForm.value).subscribe(
      (data: Tokens) => {
        this.loginService.AUTH_TOKEN = data.authToken;
        this.loginService.REFRESH_TOKEN = data.refreshToken;
      });
  }

}
