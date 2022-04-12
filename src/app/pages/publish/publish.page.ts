import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
import { PhotoService } from '../../services/photo.service';

@Component({
  selector: 'app-publish',
  templateUrl: './publish.page.html',
  styleUrls: ['./publish.page.scss'],
})
export class PublishPage implements OnInit {

  //@ViewChild('citySelected') citySelected: ElementRef;
  //@ViewChild('messageText') messageText: ElementRef;

  photo: PhotoService;
  user: UserService;
  cities: any;

  citySelected: any;
  messageText;

  constructor(private photoService: PhotoService,
              private userService: UserService,
              private actionSheetController: ActionSheetController,
              private alertController: AlertController) {
    this.photo = this.photoService;
    this.user = this.userService;
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

    if(this.checkFields()){
      this.photo.makePulication(0, this.messageText,
        'Colombia, ' + this.citySelected.city,
        this.user.currentUser.id,
        this.user.currentUser.profileName,
        this.user.currentUser.profileImage);

        this.cleanFields();

    }else {
      this.invalidPublication();
    }
  }

  private loadCities() {
    fetch('../../../assets/files/co.json').then(res=>res.json()).then(json=>{
      this.cities = json.data;
    });
  }

  private checkFields() {
    let publish = false;

    if(this.photo.photo !== '') {
      if(this.citySelected !== undefined) {
        if(this.messageText !== undefined) {
          publish = true;
        }
      }
    }

    return publish;
  }

  private async invalidPublication(){
    const alert = await this.alertController.create({
      header: 'Campos vacíos',
      message: 'Para hacer una publicación, primero debe de llenar todos los campos correspondientes',
      buttons: ['OK']
    });

    await alert.present();
  }

  private cleanFields() {
    this.citySelected = undefined;
    this.messageText = undefined;
  }

}
