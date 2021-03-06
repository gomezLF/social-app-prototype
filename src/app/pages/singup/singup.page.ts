import { Component, forwardRef, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.page.html',
  styleUrls: ['./singup.page.scss'],
})
export class SingupPage implements OnInit {

  user: UserService;
  singupForm: FormGroup;
  public errormessages: { name: { type: string; message: string }[];
                          lastname: { type: string; message: string }[];
                          email: { type: string; message: string }[];
                          password: { type: string; message: string }[];
                          confirmPassword: { type: string; message: string }[]; };

  constructor(private formBuilder: FormBuilder,
                      private router: Router,
                      @Inject(forwardRef(() => UserService)) userService: UserService) {

    this.initializeForm();
    this.initializeErrorMessages();
    this.user = userService;
  }

  get name() {
    return this.singupForm.get('name');
  }

  get lastname() {
    return this.singupForm.get('lastname');
  }

  get email() {
    return this.singupForm.get('email');
  }

  get password() {
    return this.singupForm.get('password');
  }

  get confirmPassword() {
    return this.singupForm.get('confirmPassword');
  }

  ngOnInit() {
  }

  singupClicked() {
    if(this.password.value === this.confirmPassword.value){
      this.user.createNewUser(0, this.name.value, this.lastname.value, this.email.value, this.password.value);
    }

    this.router.navigate(['./login']);
  }

  private initializeForm() {
    this.singupForm = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required])
    });
  }

  private initializeErrorMessages() {
    this.errormessages = {
      name: [
        { type: 'required', message: 'El nombre es requerido'}
      ],
      lastname: [
        { type: 'required', message: 'Los apellidos son requeridos'}
      ],
      email: [
        { type: 'required', message: 'El correo electr??nico es obligatorio'},
        { type: 'pattern', message: 'Ingrese un correo electr??nico v??lido'}
      ],
      password: [
        { type: 'required', message: 'La contrase??a es obligatoria'}
      ],
      confirmPassword: [
        { type: 'required', message: 'Este campo es requerido' }
      ]
    };
  }
}
