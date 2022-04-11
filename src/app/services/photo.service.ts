import { Injectable } from '@angular/core';
import { filter, switchMap } from 'rxjs/operators';
import { Storage } from '@ionic/storage-angular';
import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';
import { BehaviorSubject, from, of } from 'rxjs';
import { UserService } from './user.service';

@Injectable()
export class PhotoService {

  pothos: Array<{
    id: number;
    pathPhoto: string;
    message: string;
    place: string;
    idUser: number;
    profileNameUser: string;
    imageUser: string;
  }> = [];

  currentPhoto: {
    id: number;
    pathPhoto: string;
    message: string;
    place: string;
    idUser: number;
    profileNameUser: string;
    imageUser: string;
  };

  user: UserService;

  constructor(private userService: UserService) {
    this.user = this.userService;
  }
}
