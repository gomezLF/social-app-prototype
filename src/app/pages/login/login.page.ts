
import { Component, forwardRef, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';
import { UserService } from '../../services/user.service';
import { AppModule } from 'src/app/app.module';

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
              private router: Router, private http: HttpClient,
              private alertController: AlertController,
              @Inject(forwardRef(() => UserService)) userService: UserService) {

    this.initializeForm();
    this.initializrErrorMessages();
    this.user = userService;
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
