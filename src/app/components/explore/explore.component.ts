import { Component, OnInit } from '@angular/core';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit {

  public exploreSearch = '';
  public searchImages: any;

  constructor(private imageService: ImageService) { }

  ngOnInit(): void {
    
  }

  public async onSearch(): Promise<void> {
    this.searchImages = await this.imageService.getPhotosForKeyword(this.exploreSearch);
  }

}
