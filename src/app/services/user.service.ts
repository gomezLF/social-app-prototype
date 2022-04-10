import { Injectable } from '@angular/core';
import { filter, switchMap } from 'rxjs/operators';
import { Storage } from '@ionic/storage-angular';
import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';
import { BehaviorSubject, from, of } from 'rxjs';

const USERS_KEY = 'users';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  users: Array<{
    id: number;
    name: string;
    lastname: string;
    email: string;
    password: string;
  }>;

  currentUser: {
    id: number;
    name: string;
    lastname: string;
    email: string;
    password: string;
  };

  private storageReady = new BehaviorSubject(false);

  constructor(private storage: Storage) {
    this.users = [];
    this.init();
   }

  async init() {
    await this.storage.defineDriver(CordovaSQLiteDriver);
    await this.storage.create();
    this.storageReady.next(true);
    this.createInitialUsers();
  }

  getUsers() {
    this.loadUser().subscribe(res=>{
      this.users = res;
    });
  }

  validateUser(email, password): boolean {
    let login = false;

    for (let index = 0; index < this.users.length && !login; index++) {
      const element = this.users[index];

      if(element.email === email && element.password === password){
        login = true;
        this.currentUser = element;
      }
    }
    return login;
  }

  createNewUser(id: number, name: string, lastname: string, email: string, password: string) {
    console.log(this.users);
    let newId = id;

    if(newId === 0){
      newId = this.users.length + 1;
    }

    const newUser = {
      id: newId,
      name: '' + name,
      lastname: '' + lastname,
      email: '' + email,
      password: '' + password,
    };

    this.users.push(newUser);
    this.saveUsers();
  }

  private createInitialUsers() {
    this.createNewUser(1, 'Luis Pepito', 'Gomez Andrade', 'alfa@gmail.com', 'aplicacionesmoviles');
    this.createNewUser(2, 'Fulanito', 'Andrade Gomez', 'beta@gmail.com', 'aplicacionesmoviles');
  }

  private loadUser() {
    return this.storageReady.pipe(
      filter(ready => ready),
      switchMap(_ => from(this.storage.get(USERS_KEY)) || of([]))
    );
  }

  private async saveUsers() {
    this.storage.set(USERS_KEY, this.users);
  }
}
