import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../../services/photo.service';

@Component({
  selector: 'app-publish',
  templateUrl: './publish.page.html',
  styleUrls: ['./publish.page.scss'],
})
export class PublishPage implements OnInit {

  photo: PhotoService;

  constructor(private photoService: PhotoService) {
    this.photo = this.photoService;
  }

  ngOnInit() {
  }

}
