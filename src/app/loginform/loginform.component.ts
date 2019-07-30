import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {CurrentUserService, UserAuthInfo} from '../auth/currentuser.service';
import {Router} from '@angular/router';
import {catchError} from 'rxjs/operators';
import {of as observableOf} from 'rxjs';
import {ValidationError} from 'ajv';

@Component({
  selector: 'app-loginform',
  templateUrl: './loginform.component.html',
  styleUrls: ['./loginform.component.scss']
})
export class LoginformComponent implements OnInit {
  _loginForm: FormGroup;
  hide = true;
  isLoadingResults = false;

  constructor(private fb: FormBuilder, private currentUserService: CurrentUserService, private router: Router) {
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
      this._loginForm.controls['password'].hasError('wrongPass') ? 'Либо в логине, либо в пароле ошибка' :
        '';
  }

  handleLoginClick() {
    this.isLoadingResults = true;
    this.currentUserService.authenticate(
      this._loginForm.controls['login'].value,
      this._loginForm.controls['password'].value
    ).pipe(
      catchError(() => {

        return observableOf({});
      })
    ).subscribe((response: UserAuthInfo) => {
      if (response.accessToken == undefined) {
        this.isLoadingResults = false;
        this._loginForm.controls['password'].setValue('');
      } else {
        this.router.navigate(['']);
      }

    });
  }
}
