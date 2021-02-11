import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FfmpegConverterService } from './ffmpeg-converter.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'ffmpegInWeb';
  videoSrc;
  constructor(
    private service: FfmpegConverterService,
    private sanitizer: DomSanitizer
  ) {}
  async getVideos() {
    let result = await this.service.convertFile();
    if (result)
      result.then((res) => {
        this.videoSrc = this.sanitizer.bypassSecurityTrustResourceUrl(res);
      });
  }
}
