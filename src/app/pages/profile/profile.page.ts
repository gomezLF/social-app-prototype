import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  user: any;

  constructor(private router: Router, private userService: UserService) {
    this.user = userService;
   }

  ngOnInit() {
  }

  changeProfileImageClicked() {
    console.log('hola');
  }

  moreOptionsClicked() {
    this.router.navigate(['./login']);
  }

}
