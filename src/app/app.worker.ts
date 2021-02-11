/// <reference lib="webworker" />
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
import { JSONfn } from 'jsonfn';

addEventListener('message', ({ data }) => {
  const myFunction = JSONfn.parse(data.func);
  const payload = JSONfn.parse(data.payload);
  postMessage(myFunction(payload));
});
