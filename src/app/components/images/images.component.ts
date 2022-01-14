import { Component, OnInit } from '@angular/core';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss']
})
export class ImagesComponent implements OnInit {

  public imagesForKeyword: any[] = [];
  public showImages: boolean = false;

  constructor(private imageService: ImageService) { }

  ngOnInit(): void {
  }

  public getPhotosForKeyword() {
    const word = 'porsche';

    this.imageService.getPhotosForKeyword(word).then((data: any[]) => {
      this.imagesForKeyword = data;
      this.showImages = true;
    });
  }

}
