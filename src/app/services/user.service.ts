import { Injectable } from '@angular/core';
import { filter, switchMap } from 'rxjs/operators';
import { Storage } from '@ionic/storage-angular';
import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';
import { BehaviorSubject, from, of } from 'rxjs';

const USERS_KEY = 'users';

@Injectable()
export class UserService {

  login = false;

  users: Array<{
    id: string;
    profileName: string;
    name: string;
    lastname: string;
    email: string;
    password: string;
    login: boolean;
  }> = [];

  currentUser: {
    id: string;
    profileName: string;
    name: string;
    lastname: string;
    email: string;
    password: string;
    login: boolean;
  };

  private storageReady = new BehaviorSubject(false);

  constructor(private storage: Storage) {
    this.init();
  }

  setProfileName(profileName: string){
    this.currentUser.profileName = profileName;
  }

  setName(name: string){
    this.currentUser.name = name;
  }

  setLastname(lastname: string) {
    this.currentUser.lastname = lastname;
  }

  setEmail(email: string){
    this.currentUser.email = email;
  }

  init() {
    this.storage.defineDriver(CordovaSQLiteDriver);
    this.storage.create();
    this.storageReady.next(true);
    this.createInitialUsers();
  }

  getUsers() {
    this.loadUser().subscribe(res=>{
      this.users = res;
    });
  }

  validateUser(email, password): boolean {
    let stop = false;

    for (let index = 0; index < this.users.length && !stop; index++) {
      const element = this.users[index];

      if(element.email === email && element.password === password){
        stop = true;
        element.login = true;
        this.currentUser = element;

        this.saveUsers();
      }
    }
    return stop;
  }

  createNewUser(id: number, name: string, lastname: string, email: string, password: string) {
    let newId = id;

    if(newId === 0){
      newId = this.users.length + 1;
    }

    const newUser = {
      id: '' + newId,
      profileName: '' + name + ' ' + lastname,
      name: '' + name,
      lastname: '' + lastname,
      email: '' + email,
      password: '' + password,
      login: false
    };

    this.users.push(newUser);
    this.saveUsers();
  }

  saveUsers() {
    this.storage.set(USERS_KEY, this.users);
  }

  updateCurrentUser(profileName: string, name: string, lastname: string, email: string) {
    this.currentUser.profileName = profileName;
    this.currentUser.name = name;
    this.currentUser.lastname = lastname;
    this.currentUser.email = email;

    console.log(this.users);
    this.saveUsers();
  }

  private validateLogin() {
    let stop = false;

    for (let index = 0; index < this.users.length && !stop; index++) {
      const element = this.users[index];

      if(element.login === true){
        stop = true;
        this.login = true;
        this.currentUser = element;
      }
    }
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

  private verifyUsersFile(){
    this.getUsers();

    if(this.users.length === 0){
      this.createInitialUsers();
    }
  }

}
