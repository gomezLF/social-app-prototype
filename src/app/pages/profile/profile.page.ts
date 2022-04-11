import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { ElementRef } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  @ViewChild('labelProfileName') profileNameLabel: ElementRef;

  user: any;
  nameInputValue: string;
  lastnameInputValue: string;
  emailInputValue: string;

  constructor(private actionSheetController: ActionSheetController, private router: Router, private userService: UserService) {
    this.user = userService;

    this.nameInputValue = this.user.currentUser.name;
    this.lastnameInputValue = this.user.currentUser.lastname;
    this.emailInputValue = this.user.currentUser.email;
   }

  ngOnInit() {
  }

  changeProfileImageClicked() {
    console.log('hola');
  }

  moreOptionsClicked() {
    this.presentActionSheet();
  }

  saveChangesClicked() {
    this.user.updateCurrentUser(this.profileNameLabel.nativeElement.innerText,
                                this.nameInputValue,
                                this.lastnameInputValue,
                                this.emailInputValue);
  }

  private async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: '¿Desea cerrar sesión?',
      buttons: [{
        text: 'Cerrar sesión',
        icon: 'log-out',
        handler: () => {
          //this.user.currentUser.login = false;
          this.user.saveUsers();
          this.router.navigate(['./login']);
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

}
