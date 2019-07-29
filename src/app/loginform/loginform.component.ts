import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoginService, Tokens} from './login.service';
import {CurrentUserService} from '../auth/currentuser.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-loginform',
  templateUrl: './loginform.component.html',
  styleUrls: ['./loginform.component.scss']
})
export class LoginformComponent implements OnInit {
  _loginForm: FormGroup;

  constructor(private fb: FormBuilder, private loginService: LoginService,
              private currentUserService: CurrentUserService, private router: Router) {
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

  handleLoginClick() {
    this.currentUserService.authenticate(
      this._loginForm.controls['login'].value,
      this._loginForm.controls['password'].value
    ).subscribe(() => this.router.navigate(['']));
  }

  handleLogOutClick() {
    this.currentUserService.logout();
  }
}
