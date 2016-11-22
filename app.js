const cp = require('child_process');
const url = 'rtmp://54.227.214.22:1935/live/myStream';

const index = 0;
const stitcherCmd = 'python';
const stitchrArgs = ['stitcher.py', '-s', '-i', index];

const ffmpegCmd = 'ffmpeg';
const ffmpegArgs = [
  '-y', '-f', 'rawvideo',
  '-s', '640x480', '-pix_fmt', 'bgr24', '-i','pipe:0','-vcodec',
  'libx264','-pix_fmt','uyvy422','-r','28','-an', '-f','flv', url
];

const stitcherProc = cp.spawn(stitcherCmd, stitchrArgs);
const ffmpegProc = cp.spawn(ffmpegCmd, ffmpegArgs);

const inStream = stitcherProc.stdout;
const outStream = ffmpegProc.stdin;

inStream.pipe(outStream);
