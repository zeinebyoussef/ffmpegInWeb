import { TestBed } from '@angular/core/testing';

import { FfmpegConverterService } from './ffmpeg-converter.service';

describe('FfmpegConverterService', () => {
  let service: FfmpegConverterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FfmpegConverterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
