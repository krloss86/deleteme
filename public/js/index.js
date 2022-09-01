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
            //alert(xhr.response);
            var res = eval(xhr.response);
            Turnos(res);
            //alert(`Done, got ${xhr.response.length} bytes`); // response is the server response
        }
    };
}

function Turnos(turnosObj) {
    var tableTurnos = BuildTurno(turnosObj);
    document.getElementById('turnos').innerHTML =  tableTurnos;
}

function BuildTurno(turnosObj) {
    var turnos = '';
    for (var i = 0; i < turnosObj.length; i++) {
        var turno = turnosObj[i];
        turnos += RowTurno(turno);
    }
    return turnos;
}
function RowTurno(turno) {
    var sector = turno.agente.sector === 'OFICIAL' ? 'BOX' : turno.agente.sector;
    return '<li class="scale-up-center"><span class="doc-cliente">'
                + turno.presentar_dni + 
                '</span><span class="puesto-cliente">' +
                    sector + ' ' + turno.agente.puesto + 
                '</span></li>'
            ;
}

function App() {
    var path = window.location.href; // https://predev-svlc-tv.desa-comafidigital.com/?sucursal=0
    var idx = path.indexOf('=');
    if(idx >= 0){
        var sucursal = path.substring(idx+1,path.length);
        loadTurnos(sucursal);
    }
}

setInterval(App, 100 * 60);