
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  users: Array<{
    id: any;
    name: string;
    lastname: string;
    email: string;
    password: string;
  }>;

  currentUser: {
    id: string;
    name: string;
    lastname: string;
    email: string;
    password: string;
  };

  loginForm: FormGroup;
  public errormessages: { email: { type: string; message: string }[]; password: { type: string; message: string }[] };

  constructor(private formBuilder: FormBuilder,
              private router: Router, private http: HttpClient,
              private alertController: AlertController) {

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
    this.getUsers().subscribe(res=>{
      this.users = res;
    });
  }

  loginClicked() {
    let login = false;

    for (let index = 0; index < this.users.length && !login; index++) {
      const element = this.users[index];

      if(element.email === this.email.value && element.password === this.password.value){
        login = true;
        this.currentUser = element;
        this.router.navigate(['./initial-tab']);
      }
    }

    if(!login){
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

  private getUsers() {
    return this.http.
    get('../../../assets/files/users.json').
    pipe(
      map((res: any) =>res.users)
    );
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
