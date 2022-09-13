var turnosOriginales = [];

var options = { hour: '2-digit', minute: '2-digit' };
function updateHora() {
    var fecha = new Date();
    document.getElementById('reloj').innerHTML = fecha.toLocaleString('es-ES', options);
}
setInterval(updateHora, 1 * 60 );

function loadTurnos(sucursal) {
    // 1. Create a new XMLHttpRequest object
    var xhr = new XMLHttpRequest();

    // 2. Configure it: GET-request for the URL /article/.../load
    xhr.open('GET', 'https://nxk47jdjyi-vpce-03c2b0c84a5da002a.execute-api.us-east-1.amazonaws.com/dev/turnos/sucursal/' + sucursal + '/tv' + '?_time=' + (new Date()).getTime());

    // 3. Send the request over the network
    xhr.send();

    // 4. This will be called after the response is received
    xhr.onload = function () {
        if (xhr.status != 200) { // analyze HTTP status of the response
            alert(xhr.status + ':' + xhr.statusText); // e.g. 404: Not Found
        } else { // show the result
            var res = eval(xhr.response);
            Turnos(res);
            //alert(`Done, got ${xhr.response.length} bytes`); // response is the server response
        }
    };
}

function Turnos(turnosObj) {
    
    if(hasChange(turnosObj)){   
        var tableTurnos = BuildTurno(turnosObj);
        document.getElementById('turnos').innerHTML =  tableTurnos;

        turnosOriginales = turnosObj;
        if(turnosObj.length > 0) {
            reproducirTimbre();
        }
    }
}

function reproducirTimbre() {
    var videos = document.getElementById("videos");
    videos.pause();

    var timbre = document.getElementById("timbres");
    timbre.load();
    timbre.onloadeddata = function() {
        timbre.play();
    };
    timbre.onended = function() {
        videos.play();
    };
}

function BuildTurno(turnosObj) {
    var turnos = '';
    for (var i = 0; i < turnosObj.length; i++) {
        var turno = turnosObj[i];
        turnos += RowTurno(turno);
    }
    return turnos;
}

var getKey = function(item) {
    return item.id;
};

var compareItems = function(a, b) {
    return a.id === b.id;
};

function hasChange(turnos){
    var detectedChanges = detectChanges(turnosOriginales, turnos, getKey, compareItems);
    return detectedChanges.addedItems.length > 0 || detectedChanges.removedItems.length > 0;
}

function RowTurno(turno) {
    var sector = turno.agente.sector === 'OFICIAL' ? 'BOX' : turno.agente.sector;
    return '<li><span class="doc-cliente">'
                + turno.presentar_dni + 
                '</span><span class="puesto-cliente">' +
                    sector + ' ' + turno.agente.puesto + 
                '</span></li>'
            ;
}

function App() {
    var path = window.location.href;
    var idx = path.indexOf('=');
    if(idx >= 0){
        var sucursal = path.substring(idx+1,path.length);
        loadTurnos(sucursal);
    }
}

setInterval(App, 100 * 60);