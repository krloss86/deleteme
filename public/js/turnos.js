function loadTurnos (sucursal) {
     
    // 1. Create a new XMLHttpRequest object
    var xhr = new XMLHttpRequest();
    
    // 2. Configure it: GET-request for the URL /article/.../load
    xhr.open('GET', 'https://nxk47jdjyi-vpce-03c2b0c84a5da002a.execute-api.us-east-1.amazonaws.com/dev/turnos/sucursal/'+sucursal+'/tv'+'?_time=' + (new Date()).getTime());

    // 3. Send the request over the network
    xhr.send();

    // 4. This will be called after the response is received
    xhr.onload = function() {
      if (xhr.status != 200) { // analyze HTTP status of the response
        alert(xhr.status + ':' +  xhr.statusText); // e.g. 404: Not Found
      } else { // show the result
        //alert(xhr.response);
        var table = document.getElementById('trTurnos');
        table.innerHTML = '';
        // var tr =  document.createElement('tr');        
        var res = eval(xhr.response);
        for(var i=0; i < res.length; i++) {
          var s = res[i];
          table.innerHTML += '<tr><th scope="row">' +s.presentar_dni+ ' - '+ s.agente.sector +' </th></tr>';
        }
        //alert(`Done, got ${xhr.response.length} bytes`); // response is the server response
      }
    };

    //console.log(res.data);
  }
  
  function recargarTurno() {
    loadTurnos(0);      
  }
  
  setInterval(recargarTurno, 100 * 60);