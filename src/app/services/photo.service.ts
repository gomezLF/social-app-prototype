import { Injectable } from '@angular/core';
import { filter, switchMap } from 'rxjs/operators';
import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';
import { BehaviorSubject, from, of } from 'rxjs';
import { Camera, CameraResultType, CameraSource, ImageOptions, Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Storage } from '@ionic/storage-angular';

const PUBLISH_KEY = 'publish';

@Injectable()
export class PhotoService {

  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  photo: string = '';

  publish: Array<{
    id: string;
    pathPhoto: string;
    message: string;
    place: string;
    idUser: string;
    profileNameUser: string;
    imageUser: string;
    time: string;
  }> = [];

  private storageReady = new BehaviorSubject(false);

  constructor(private storage: Storage) {
    //this.requestPermission();
    this.init();
    this.loadPublish();
  }

  async takephoto() {
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
      quality: 100
    });

    this.photo = capturedPhoto.dataUrl;
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

  makePulication(id: number, message: string, place: string, idUser: string, profileNameUser: string, imageUser: string) {
    let newId = id;
    const date = new Date();

    if(newId === 0) {
      newId = this.publish.length + 1;
    }

    const newPulication = {
      id: '' + newId,
      pathPhoto: this.photo,
      message: '' + message,
      place: '' + place,
      idUser: '' + idUser,
      profileNameUser: '' + profileNameUser,
      imageUser: '' + imageUser,
      time: '' + date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear()
    };

    this.publish.push(newPulication);
    this.photo = '';
    this.savePublish();
    console.log(this.publish);
  }

  savePublish() {
    this.storage.set(PUBLISH_KEY, this.publish);
  }

  loadPublish() {
    return this.storageReady.pipe(
      filter(ready => ready),
      switchMap(_ => from(this.storage.get(PUBLISH_KEY)) || of([]))
    );
  }

  private init() {
    this.storage.defineDriver(CordovaSQLiteDriver);
    this.storage.create();
    this.storageReady.next(true);
  }

  private requestPermission() {
    Camera.requestPermissions({permissions:['photos']});
  }
}
