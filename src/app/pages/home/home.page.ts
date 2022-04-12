import { Component, OnInit } from '@angular/core';
import { PhotoService } from 'src/app/services/photo.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  publish: PhotoService;

  constructor(private publishService: PhotoService) {
    this.publish = this.publishService;
   }

  ngOnInit() {

  }

}
