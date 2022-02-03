import { D } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss'],
})
export class ExploreComponent implements OnInit {
  public exploreSearch = '';
  public searchImages: any;
  public imagesLoaded = false;
  public noImages = false;
  public imagePage = 1;

  constructor(private imageService: ImageService) {}

  ngOnInit(): void {}

  public async loadMoreImages(): Promise<void> {
    this.imagePage += 1;

    const imageResults = await this.imageService.getPhotosForKeyword(
      this.exploreSearch,
      this.imagePage
    );
    
    this.searchImages = [...this.searchImages, ...imageResults];
  }

  public async onSearch(): Promise<void> {
    // RESET
    this.imagesLoaded = false;
    this.noImages = false;
    this.imagePage = 1;

    this.searchImages = await this.imageService.getPhotosForKeyword(
      this.exploreSearch,
      this.imagePage
    );

    if (this.searchImages.length > 0) {
      this.imagesLoaded = true;
    } else {
      this.noImages = true;
    }
  }

  public onImageClick(image: any): void {
    console.log(image);
    window.open(image.links.html, '_blank')!.focus();
  }
}
