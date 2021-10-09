window.onload=function()
{
cargaXml();
bGrabar.addEventListener("click", grabar,false);
bModificar.addEventListener("click", modificar,false); 
bBorrar.addEventListener("click", borrar,false); 
bSiguiente.addEventListener("click", siguiente,false); 
bAnterior.addEventListener("click", anterior,false); 
bTabla.addEventListener("click", imprimirentabla,false); 
}


var datos = new Array();

var contador = 0; var pos = 0;
var puente = new Object();

function datospuente(Nombre, Calle, Latitud, Longitud, URL) {
    this.Nombre = Nombre;
    this.Calle = Calle;
    this.Latitud = Latitud;
    this.Longitud = Longitud;
    this.URL = URL;

    this.guarda = guardadatos;

}

function guardadatos() {
    datos[contador] = this;
    contador = contador + 1;
    pos = contador;
}


function leerdatos(c) {
    var da = new datoslibro();
    da = datos[c];
    document.write("<tr><td>" + da.Nombre + "</td><td>" + da.Calle + "</td><td>" + da.Latitud + "</td><td>" + da.Longitud + "</td><td>" + da.URL + "</td></tr>");

}

//////////////////////////////////// G R A B A R //////////////////////////////////
function grabar() {

    var Nombre = document.getElementById("Nombre").value;
    var Calle = document.getElementById("Calle").value;
    var Latitud = document.getElementById("Latitud").value;
    var Longitud = document.getElementById("Longitud").value;
    var URL = document.getElementById("Imagen").value;

    puente = new datospuente(Nombre, Calle, Latitud, Longitud, URL);
    puente.guarda();
}
//////////////////////////////////// G R A B A R //////////////////////////////////

//////////////////////////////////// modificar //////////////////////////////////
function modificar() {
    var Nombre = document.getElementById("Nombre").value;
    var Calle = document.getElementById("Calle").value;
    var Latitud = document.getElementById("Latitud").value;
    var Longitud = document.getElementById("Longitud").value;
    var URL = document.getElementById("Imagen").value;
    puente = new datospuente(Nombre, Calle, Latitud, Longitud, URL);
    datos[pos] = puente;
}
//////////////////////////////////// modificar //////////////////////////////////

//////////////////////////////////// borrar //////////////////////////////////
function borrar() {
    datos.splice(pos, 1);
    contador--;
    pos = 0;
    visualiza(pos);
}

//////////////////////////////////// borrar //////////////////////////////////

// //////////////////// i m p r i m i r /////////////////////////
function imprimirentabla() {
    document.getElementById("cuerpo").innerHTML= '<tr><td style="height: 25px; width:30%">Nombre</td>'+
    '<td style=" width:30% ;height: 25px">Calle</td>'+
    '<td style=" width:20% ;height: 25px">Latitud</td>'+
    '<td style=" width:20% ; height: 25px;">Longitud</td>';
    for (c = 0; c < contador; c++) {
        var da = new datospuente();
        da = datos[c];
        var tabla = document.getElementById("tabla");
        var cuerpo = document.getElementById("cuerpo");
        linea = document.createElement("tr");
        parrafo = document.createElement("p");
        dato = document.createTextNode(da.Nombre);
        Columna = document.createElement("td");
        Columna.appendChild(dato);
        linea.appendChild(Columna);

        parrafo = document.createElement("p");
        dato = document.createTextNode(da.Calle);
        Columna = document.createElement("td");
        Columna.appendChild(dato);
        linea.appendChild(Columna)


        parrafo = document.createElement("p");
        dato = document.createTextNode(da.Latitud);
        Columna = document.createElement("td");
        Columna.appendChild(dato);
        linea.appendChild(Columna)
        parrafo = document.createElement("p");
        dato = document.createTextNode(da.Longitud);
        Columna = document.createElement("td");
        Columna.appendChild(dato);
        linea.appendChild(Columna)
        cuerpo.appendChild(linea);
    }
    
    tabla.appendChild(cuerpo);
}
// //////////////////// i m p r i m i r /////////////////////////


function siguiente() {
    if (pos + 1 < datos.length) {
        pos = pos + 1; visualiza(pos);
    }

}
function anterior() {
    if (pos - 1 >= 0) {
        pos = pos - 1; visualiza(pos);
    }

}
function visualiza(pos) {
    puente = new datospuente();
    puente = datos[pos];
    if (puente == undefined) { return; }
    var imagen=document.getElementById("Imagen");
    document.getElementById("Nombre").value = puente.Nombre;
    document.getElementById("Calle").value = puente.Calle;
    document.getElementById("Latitud").value = puente.Latitud;
    document.getElementById("Longitud").value = puente.Longitud;
    imagen.src =puente.URL;
}


function cargaXml() {
    var codigo = new DOMParser();
    var myXml = codigo.parseFromString(datosFichero, "text/xml");


    var aNombre = new Array();
    var aCalle = new Array();
    var aLatitud = new Array();
    var aLongitud = new Array();
    var aUrl = new Array();

    aNombre = myXml.getElementsByTagName("nombre");
    aCalle = myXml.getElementsByTagName("calle");
    aLatitud = myXml.getElementsByTagName("latitud");
    aLongitud = myXml.getElementsByTagName("longitud");
    aUrl = myXml.getElementsByTagName("imagen");

    for (var i = 0; i < aNombre.length; i++) {
        // alert(aisbn);
        p = new datospuente(aNombre.item(i).firstChild.nodeValue, aCalle.item(i).firstChild.nodeValue, aLatitud.item(i).firstChild.nodeValue, aLongitud.item(i).firstChild.nodeValue,aUrl.item(i).firstChild.nodeValue);

        datos[i] = p;

    }
    c = i; contador = c;
    visualiza(0);
}