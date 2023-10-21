const express = require('express')
const app = express()
const port = 3000

const bodyParser = require ('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname)); // Serve static files, including uploaded images

const multer = require('multer');
const upload = new multer ();

const sharp = require('sharp');
const fs = require('fs');

app.set('view engine', "hbs"); //setting view engine


app.get('/', (req, res) => {
    res.render('imgWatermark');
})

app.post("/", upload.any(), (req, res) => {
    const mainImage = req.files.find((file) => file.fieldname === 'mainImage');
    const watermarkType = req.body.watermarkType;
    const watermarkImage = req.files.find((file) => file.fieldname === 'watermarkImage');
    const watermarkText = req.body.watermarkText;

    console.log(mainImage);
    console.log(watermarkType);
    console.log(watermarkImage);
    console.log(watermarkText);

    if (!mainImage) {
        return res.redirect('/');
    }
    
    const mainImageBuffer = mainImage.buffer;

    if (watermarkType === 'image' && watermarkImage) {
        const watermarkBuffer = watermarkImage.buffer;

        sharp(mainImageBuffer)
            .composite([
              {
                input: watermarkBuffer,
                gravity: 'southeast', // Position the watermark (southeast = bottom-right)
              }
            
            ])
            .toBuffer()
            .then((processedImage) => {
                // Set the content type to display the image
                res.set('Content-Type', 'image/jpeg');
                res.end(processedImage);
            }).catch((error) => {
                console.error('Error:', error);
                res.status(500).send('Image processing error');
            });
    }
    // else if (watermarkType === 'text' && watermarkText) {

    // }
  
});

app.listen(port, () => console.log(`Server listening on port ${port}!`))