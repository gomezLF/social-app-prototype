import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  public errormessages: { email: { type: string; message: string }[]; password: { type: string; message: string }[] };

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.initializeForm();
    this.initializrErrorMessages();
  }

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

  private initializeForm() {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      password: new FormControl('',Validators.required)
    });
  }

  private initializrErrorMessages() {
    this.errormessages = {
      email: [
        { type: 'required', message: 'El correo electrónico es obligatorio'},
        { type: 'pattern', message: 'Ingrese un correo electrónico válido'}
      ],
      password: [
        { type: 'required', message: 'La contraseña es obligatoria'},
      ]
    };
  }




}
