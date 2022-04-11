import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { ElementRef } from '@angular/core';

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

  constructor(private router: Router, private userService: UserService) {
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
    this.router.navigate(['./login']);
  }

  saveChangesClicked() {
    this.user.updateCurrentUser(this.profileNameLabel.nativeElement.innerText,
                                this.nameInputValue,
                                this.lastnameInputValue,
                                this.emailInputValue);
  }

}
