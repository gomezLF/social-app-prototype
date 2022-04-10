import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm = this.formBuilder.group({
    email: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
    password: new FormControl('',Validators.required)
  });

  public errormessages = {
    email: [
      { type: 'required', message: 'El correo electrónico es obligatorio'},
      { type: 'pattern', message: 'Ingrese un correo electrónico válido'}
    ],
    password: [
      { type: 'required', message: 'La contraseña es obligatoria'},
    ]
  };

  constructor(private formBuilder: FormBuilder, private router: Router) {}

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  ngOnInit() {
  }

  loginClicked() {
    this.router.navigate(['./initial-tab']);
  }

  singupClicked() {
    this.router.navigate(['./singup']);
  }


}
