
import fs from 'fs/promises';
import { createFFmpeg } from '@ffmpeg/ffmpeg';

const ffmpeg = createFFmpeg();


  // Replace with your GIF URLs
  const gifUrls = [
    'https://media3.giphy.com/media/w8VuZaBbV7Adi/giphy.gif?cid=da20ff0bv2x6f6kugzm7iydma4gj0f3akxkmmxled3m7lwod&ep=v1_gifs_search&rid=giphy.gif&ct=g',
    'https://media1.giphy.com/media/qu865rEor7r6xjaOyQ/giphy.gif?cid=da20ff0bt4yzasbagtz7cwc1gfqwrsykguq2mh0irkowtazb&ep=v1_gifs_search&rid=giphy.gif&ct=g'
  ];

  (async () => {

    const { createFFmpeg, fetchFile } = await import('@ffmpeg/ffmpeg');
    const ffmpeg = createFFmpeg({ log: true });
  
    await ffmpeg.load();
  
    for (const gifUrl of gifUrls) {
      const gifData = await fetchFile(gifUrl);
      const gifName = `${__dirname}/input.gif`;  
      const videoName = `${__dirname}/output.mp4`;
  
      await fs.writeFile(gifName, gifData);
      
      ffmpeg.FS('writeFile', 'input.gif', await fs.readFile(gifName));
  
      await ffmpeg.run('-i', 'input.gif', 'output.mp4');
  
      await fs.writeFile(videoName, ffmpeg.FS('readFile', 'output.mp4')); 
    }
    
    ffmpeg.exit();
  
  })()