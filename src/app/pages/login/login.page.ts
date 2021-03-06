
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user: UserService;
  loginForm: FormGroup;
  public errormessages: { email: { type: string; message: string }[]; password: { type: string; message: string }[] };

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private alertController: AlertController,
              private userService: UserService) {

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
    this.user = this.userService;
  }

  loginClicked() {
    if(this.user.validateUser(this.email.value, this.password.value)){
      this.router.navigate(['./initial-tab']);
    }else {
      this.invalidUserAlert();
    }
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

  private async invalidUserAlert(){
    const alert = await this.alertController.create({
      header: 'Usuario Incorrecto',
      message: 'Correo electrónico o contraseña incorrectas.',
      buttons: ['OK']
    });

    await alert.present();
  }


}
