const Jimp = require('jimp');

// Read the images
Promise.all([
    Jimp.read('https://media3.giphy.com/media/w8VuZaBbV7Adi/giphy.gif?cid=da20ff0bv2x6f6kugzm7iydma4gj0f3akxkmmxled3m7lwod&ep=v1_gifs_search&rid=giphy.gif&ct=g'),
    Jimp.read('https://media1.giphy.com/media/qu865rEor7r6xjaOyQ/giphy.gif?cid=da20ff0bt4yzasbagtz7cwc1gfqwrsykguq2mh0irkowtazb&ep=v1_gifs_search&rid=giphy.gif&ct=g')
]).then(images => {
    const [image1, image2] = images;

    // Ensure images are the same size (optional)
    image2.resize(image1.bitmap.width, image1.bitmap.height);

    // Composite image2 over image1
    image1.composite(image2, 0, 0);

    // Write the image to a file
    image1.write('output.gif');
}).catch(err => {
    console.error(err);
});