var cantTarjeta = 0;
var tarjetas = [];
let iconos = [];
let selects = [];

tablero(6);
      function loadIcons() {
        iconos = [
          '<i class="fas fa-ghost"></i>',
          '<i class="fas fa-paper-plane"></i>',
          '<i class="fa-sharp fa-solid fa-plane"></i>',
          '<i class="fa-sharp fa-solid fa-bomb"></i>',
          '<i class="fa-sharp fa-solid fa-gamepad"></i>',
          '<i class="fa-solid fa-guitar"></i>',
          '<i class="fa-sharp fa-solid fa-user-astronaut"></i>',
          '<i class="fa-solid fa-meteor"></i>',
          '<i class="fa-solid fa-cat"></i>',
          '<i class="fa-solid fa-dog"></i>',
          '<i class="fa-solid fa-car-side"></i>',
          '<i class="fa-solid fa-yin-yang"></i>',
        ];
      }

      function tablero(z) {
        loadIcons();
        cantTarjeta = z;
        selects = [];
        let board = document.getElementById("elementos");
        let cards = [];
        let partida = document.querySelector(".nueva-partida");
        if(z === 6){
          partida.setAttribute("onclick","tablero(6)");
        }else if(z === 12){
          partida.setAttribute("onclick","tablero(12)");
        }else if(z === 24){
          partida.setAttribute("onclick","tablero(24)");
        }
        for (let i = 0; i < z; i++) {
          cards.push(`
                <div class="area-card" onclick="selectCard(${i})">
                    <div class="card" id="card${i}">
                        <div class="face back" id="back${i}">
                            ${iconos[0]}
                        </div>
                        <div class="face top">
                          <img src="imagenes/logoBrain.png">
                        </div>
                    </div>
                </div>
                `);
          if (i % 2 == 1) {
            iconos.splice(0, 1);
          }
        }
        
        cards.sort(() => Math.random() - 0.5);
        board.innerHTML = cards.join(" ");
        
      }


      function selectCard(i) {
        let card = document.getElementById("card" + i);
        if (card.style.transform != "rotateY(180deg)") {
          card.style.transform = "rotateY(180deg)";
          selects.push(i);
        }
        if (selects.length === 2) {
          deselect(selects);
          selects = [];
        }
      }

      function deselect(selects) {
        setTimeout(() => {
          let back1 = document.getElementById("back" + selects[0]);
          let back2 = document.getElementById("back" + selects[1]);
          if (back1.innerHTML != back2.innerHTML) {
            let card1 = document.getElementById("card" + selects[0]);
            let card2 = document.getElementById("card" + selects[1]);
            card1.style.transform = "rotateY(0deg)";
            card2.style.transform = "rotateY(0deg)";
          } else {
            back1.style.background = "var(--card-correct-color)";
            back2.style.background = "var(--card-correct-color)";
            tarjetas.push(1,2);
            if(tarjetas.length === cantTarjeta){
              confirmacion();
            }
          }
          
        }, 1000);
      }


      let botonDark = document.getElementById("modo-dark");
      let partida = document.querySelector(".nueva-partida");

      botonDark.addEventListener("click", (e) => {
        const html = document.querySelector("html");
        html.classList.toggle("dark");
        if (html.classList.contains("dark")) {
          e.target.innerHTML = "Modo Claro";
          partida.style.color = "white";
          botonDark.style.color = "white";
        } else {
          e.target.innerHTML = "Modo Oscuro";
          partida.style.color = "black";
          botonDark.style.color = "black";
        }
      });

      function confirmacion(){
        setTimeout(function(){
          swal("FELICIDADES GANASTE!!!", "Tardaste: " + tiempoFormateado);
          detenerContador();
          tarjetas = [];
          cantTarjeta = 0;
        },500);
      }