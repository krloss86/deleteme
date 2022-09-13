//viene de algun api externo
var imagenesURL = ['video1.jpg', 'video2.jpg', 'video3.jpg'];
var videosURL = ['./videos/tevabien-turnero.mp4', './videos/Turnero-BCRA-completo.mp4','./videos/Turnero-Pymes-final.mp4','./videos/Turnero.mp4','./videos/RSCI-Parametros-turnero.mp4'];
var indiceVideoActual = 0;
var CANTIDAD_TOTAL_VIDEO = 0;
var videoTerminado = false;

function Carrousel(losVideos) {
    CANTIDAD_TOTAL_VIDEO = losVideos.length;
    indiceVideoActual = CANTIDAD_TOTAL_VIDEO-1;
    girar();
}

function girar() {
    if(indiceVideoActual < 0) {
        indiceVideoActual = CANTIDAD_TOTAL_VIDEO -1;
    }
    siguienteVideo();
}

function siguienteVideo() {
    //si hay video, tomo el primero
    var source = document.getElementById("video");
    source.src = videosURL[indiceVideoActual];
    source.loop = false;

    var videos = document.getElementById("videos");
    videos.load();

    videos.onended = function() {
        videoTerminado = true;
        indiceVideoActual--;        
    };
}

function controlarCarrousel() {
    if(videoTerminado) {
        videoTerminado = false;
        girar(); 
    }
}

//invocar al carrousel
Carrousel(videosURL);

// cada 1 segundo verificamos si debe cambiar el video
setInterval(controlarCarrousel, 500);