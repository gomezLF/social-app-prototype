import { Injectable } from '@angular/core';
import { filter, switchMap } from 'rxjs/operators';
import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';
import { BehaviorSubject, from, of } from 'rxjs';
import { UserService } from './user.service';
import { Camera, CameraResultType, CameraSource, ImageOptions, Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Storage } from '@capacitor/storage';

const PUBLISH_KEY = 'publish';

@Injectable()
export class PhotoService {

  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  photo: string = '';

  pothos: Array<{
    id: string;
    pathPhoto: string;
    message: string;
    place: string;
    idUser: string;
    profileNameUser: string;
    imageUser: string;
  }> = [];

  currentPhoto: {
    id: string;
    pathPhoto: string;
    message: string;
    place: string;
    idUser: string;
    profileNameUser: string;
    imageUser: string;
  };

  user: UserService;

  constructor(private userService: UserService) {
    this.user = this.userService;
    this.requestPermission();
    //this.getCurrentUser();
  }

  async takephoto() {
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    });
  }

  pickPicture() {
    const options: ImageOptions = {
      source: CameraSource.Photos,
      resultType: CameraResultType.DataUrl
    };

    Camera.getPhoto(options).then((result) => {
      this.photo = result.dataUrl;
    });
  }

  private requestPermission() {
    Camera.requestPermissions({permissions:['photos']});
  }

  private getCurrentUser() {
    this.currentPhoto.idUser = this.user.currentUser.id;
    this.currentPhoto.profileNameUser = this.user.currentUser.profileName;
  }
}
