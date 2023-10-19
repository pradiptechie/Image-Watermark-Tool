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
    const mainImageFile = req.files.find((file) => file.fieldname === 'mainImage');
    const watermarkFile = req.files.find((file) => file.fieldname === 'watermarkImage');
    const textWatermark = req.body.textWatermark;
    const watermarkType = req.body.watermarkType;

    console.log(mainImageFile);
    console.log(watermarkType);
    console.log(watermarkFile);
    console.log(textWatermark);

    // if (!mainImageFile) {
    //     return res.redirect('/');
    // }
    
    // const mainImageBuffer = mainImageFile.buffer;

    // if (watermarkType === 'image' && watermarkFile) {
    //     const watermarkBuffer = watermarkFile.buffer;

    //     sharp(mainImageBuffer)
    //         .composite([{ input: watermarkBuffer }])
    //         .toBuffer()
    //         .then((processedImage) => {
    //             // Set the content type to display the image
    //             res.set('Content-Type', 'image/jpeg');
    //             res.send(processedImage);
    //         });
    // } else if (watermarkType === 'text' && textWatermark) {
    //     sharp(mainImageBuffer)
    //         .composite([{ input: Buffer.from(textWatermark) }])
    //         .toBuffer()
    //         .then((processedImage) => {
    //             // Set the content type to display the image
    //             res.set('Content-Type', 'image/jpeg');
    //             res.send(processedImage);
    //         });
    // } else {
    //     return res.redirect('/');
    // }
});

app.listen(port, () => console.log(`Server listening on port ${port}!`))