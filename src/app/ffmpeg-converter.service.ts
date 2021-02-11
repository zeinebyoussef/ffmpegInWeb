import { Injectable } from '@angular/core';
import { createFFmpeg, fetchFile, FFmpeg } from '@ffmpeg/ffmpeg';
import { JSONfn } from 'jsonfn';
@Injectable({
  providedIn: 'root',
})
export class FfmpegConverterService {
  result;
  ffmpeg = createFFmpeg({
    log: true,
  });
  private webworker: Worker;
  constructor() {
    if (typeof Worker !== 'undefined') {
      // Create a new
      this.webworker = new Worker('./app.worker', { type: 'module' });
      this.webworker.onmessage = async ({ data }) => {
        this.result = await data;
      };
    } else {
      // Web Workers are not supported in this environment.
      // You should add a fallback so that your program still executes correctly.
    }
  }

  async convertFile() {
    //await this.ffmpeg.load();
    let ffmpeg = createFFmpeg({
      log: true,
    });
    try {
      if (!ffmpeg.isLoaded) await ffmpeg.load();
      ffmpeg.FS(
        'writeFile',
        'x.mp4',
        await fetchFile(
          'https://firebasestorage.googleapis.com/v0/b/tested4you-t4ulabs.appspot.com/o/videos%2F11111111111111111%2F1080.mp4?alt=media&token=8c711235-028d-4b26-a61c-79e5f0b7c161'
        )
      );
    } catch {
      await ffmpeg.load();
      ffmpeg.FS(
        'writeFile',
        'x.mp4',
        await fetchFile(
          'https://firebasestorage.googleapis.com/v0/b/tested4you-t4ulabs.appspot.com/o/videos%2F11111111111111111%2F1080.mp4?alt=media&token=8c711235-028d-4b26-a61c-79e5f0b7c161'
        )
      );
    }
    let test = ffmpeg.FS('readFile', 'x.mp4');
    console.log(test);
    // await this.ffmpeg.run(
    //   '-safe',
    //   '0',
    //   '-f',
    //   'concat',
    //   '-i',
    //   'list.txt',
    //   '-c',
    //   'copy',
    //   'output.mp4'
    // );
    let res;
    this.webworker.postMessage({
      func: JSONfn.stringify((arg: FFmpeg) => {
       return arg.run('-i', 'x.mp4', 'output.mp4');
      }),
      payload: JSONfn.stringify(ffmpeg),
    });
    if (res) console.log(res);
    if (this.result)
      this.result.then(() => {
        console.log('okk');
        let data = ffmpeg.FS('readFile', 'output.mp4');
        return URL.createObjectURL(
          new Blob([data.buffer], { type: 'video/mp4' })
        );
      });
    return this.result;
  }
}
