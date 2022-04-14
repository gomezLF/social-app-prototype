import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';
import { from, of } from 'rxjs';

const USERS_KEY = 'users';

@Injectable()
export class UserService {

  login = false;

  users: Array<{
    id: string;
    profileName: string;
    profileImage: string;
    name: string;
    lastname: string;
    email: string;
    password: string;
    login: boolean;
  }> = [];

  currentUser: {
    id: string;
    profileName: string;
    profileImage: string;
    name: string;
    lastname: string;
    email: string;
    password: string;
    login: boolean;
  };

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

  async init() {
    await this.storage.defineDriver(CordovaSQLiteDriver);
    await this.storage.create();
    //this.storageReady.next(true);
    //this.getUsers();
    this.verifyUsersFile();
    //this.createInitialUsers();
  }

  async getUsers() {
    this.loadUser().subscribe(res => {
      this.users = res;
    });
  }

  validateUser(email: string, password: string): boolean {
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
      profileImage: '',
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

  updateCurrentUserProfileImage(profileImage: string) {
    this.currentUser.profileImage = profileImage;

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
    return from(this.storage.get(USERS_KEY)) || of([]);
  }

  private verifyUsersFile(){
    this.getUsers();

    if(this.users.length === 0){
      console.log('Hola he creado los usuarios xd');
      this.createInitialUsers();
    }
  }

}
