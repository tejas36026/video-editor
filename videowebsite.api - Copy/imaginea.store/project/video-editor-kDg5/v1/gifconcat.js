// const concat = require('ffmpeg-concat')

// async function concatenateGifs() {
//   // Concatenate 2 GIFs together using a 500ms fade transition
//   await concat({
//     output: 'output.gif',
//     videos: [
//       'https://media3.giphy.com/media/w8VuZaBbV7Adi/giphy.gif?cid=da20ff0bv2x6f6kugzm7iydma4gj0f3akxkmmxled3m7lwod&ep=v1_gifs_search&rid=giphy.gif&ct=g',
//       'https://media1.giphy.com/media/qu865rEor7r6xjaOyQ/giphy.gif?cid=da20ff0bt4yzasbagtz7cwc1gfqwrsykguq2mh0irkowtazb&ep=v1_gifs_search&rid=giphy.gif&ct=g'
//     ],
//     transition: {
//       name: 'fade',
//       duration: 500
//     }
//   })
// }

// concatenateGifs().catch(console.error);


const ffmpegInstaller = require("@ffmpeg-installer/ffmpeg");
const ffprobe = require("@ffprobe-installer/ffprobe");
 
const ffmpeg = require("fluent-ffmpeg")()
  .setFfprobePath(ffprobe.path)
  .setFfmpegPath(ffmpegInstaller.path);
 
app.get('/gif-to-video', (req, res) => {
  ffmpeg
    .input('./images/result.gif')
    .noAudio()
    .outputOptions('-pix_fmt yuv420p')
    .output(`./output/result.mp4`)
    .on("end", () => {
      res.send({ message: 'Video Generated!' });
    })
    .on("error", (e) => console.log(e))
    .run();
});
