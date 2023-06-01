let contadorElemento = document.getElementById('contador');
let intervalo;
let tiempo = 0;
var tiempoFormateado;

function iniciarContador(){
    detenerContador(); 
    tiempo = 0;
    actualizarContador();
    intervalo = setInterval(function() {
    tiempo++;
    actualizarContador();
  }, 1000);
}

function detenerContador() {
  clearInterval(intervalo); 
}

function actualizarContador() {
  var horas = Math.floor(tiempo / 3600);
  var minutos = Math.floor((tiempo % 3600) / 60);
  var segundos = tiempo % 60;
  tiempoFormateado = pad(horas) + ':' + pad(minutos) + ':' + pad(segundos);
  contadorElemento.textContent = tiempoFormateado;
}

function pad(numero) {
  return numero < 10 ? '0' + numero : numero;
}

localStorage.setItem("tiempo",tiempo);

console.log("tiempo");