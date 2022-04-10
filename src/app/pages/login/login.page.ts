
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

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

  constructor(private formBuilder: FormBuilder, private router: Router, private http: HttpClient) {
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

    for (const iterator of this.users) {
      if(iterator.email === this.email.value && iterator.password === this.password.value){
        this.router.navigate(['./initial-tab']);
      }else {
        console.log('INcorrectos');
      }
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


}
