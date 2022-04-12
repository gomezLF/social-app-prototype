import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { PhotoService } from '../../services/photo.service';

@Component({
  selector: 'app-publish',
  templateUrl: './publish.page.html',
  styleUrls: ['./publish.page.scss'],
})
export class PublishPage implements OnInit {

  photo: PhotoService;
  cities: any;

  constructor(private photoService: PhotoService,
              private actionSheetController: ActionSheetController) {
    this.photo = this.photoService;
  }

  ngOnInit() {
    this.loadCities();
  }

  async optionsClicked() {
    const actionSheet = await this.actionSheetController.create({
      header: '¿Qué desea realizar?',
      buttons: [{
        text: 'Tomar foto',
        icon: 'camera',
        handler: () => {
          this.photo.takephoto();
        }
      },
      {
        text: 'Escoger imagen de la galeria',
        icon: 'image',
        handler: () => {
          this.photo.pickPicture();
        }
      },
      {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {

        }
      }]
    });
    await actionSheet.present();
  }

  publishClicked() {

  }

  private loadCities() {
    fetch('../../../assets/files/co.json').then(res=>res.json()).then(json=>{
      this.cities = json.data;
    });


    /*
    return this.httpClient.get('../../../assets/files/co.json')
    .pipe(map((res: any) => res.data));*/
  }

}
