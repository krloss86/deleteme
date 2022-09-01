function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
 }
 
 var images = ['https://s3.amazonaws.com/imagesrepository.icommarketing.com/ImagesRepo/NTkwLTEwODYtY29tYWZpY29tdQ2/1086/Beneficios/Tienda+Virtual+teaser.jpg', 'https://s3.amazonaws.com/imagesrepository.icommarketing.com/ImagesRepo/NTkwLTEwODYtY29tYWZpY29tdQ2/1086/Varios/Nuevo+modelo+de+atenci%C3%B3n+A.jpg', 'https://s3.amazonaws.com/imagesrepository.icommarketing.com/ImagesRepo/NTkwLTEwODYtY29tYWZpY29tdQ2/1086/PAI/Envio-2-contrase%C3%B1as.jpg', 'https://s3.amazonaws.com/imagesrepository.icommarketing.com/ImagesRepo/NTkwLTEwODYtY29tYWZpY29tdQ2/1086/Beneficios/Beneficio-Tienda-Virtual-recordatorio-Comafi.jpg'];
 var image = 'https://s3.amazonaws.com/imagesrepository.icommarketing.com/ImagesRepo/NTkwLTEwODYtY29tYWZpY29tdQ2/1086/Beneficios/Tienda+Virtual+teaser.jpg';
 
 function updateImages() {
   document.getElementById('img').src = images[randomInteger(0,images.length-1)];
 }

 setInterval(updateImages,100 * 60 );
 