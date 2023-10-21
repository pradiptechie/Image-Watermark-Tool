# Image-Watermark-Tool
This is a MINI project that take text or image  as input and apply it as watermark on your Photo and gives download option for output image.

https://github.com/pradiptechie/Image-Watermark-Tool.git


.then((response) => response.text()) // Convert the response to text
        .then((dataUrl) => {
        // Create an image element and set its src attribute to the data URL
        const imageElement = document.createElement('img');
        imageElement.src = dataUrl;

        // Clear the result container and append the image element
        preview.innerHTML = '';
        preview.appendChild(imageElement);

        // Set the download link's href and display it
        download.href = dataUrl;
        download.style.display = 'block';
        })
        .catch((error) => {
        console.error('Error:', error);
        });
