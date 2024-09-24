const lienzo = document.getElementById("lienzo");
const ctx = lienzo.getContext("2d");
const botonGirar = document.getElementById("boton-girar");
const textoResultado = document.getElementById("resultado");

const premios = ["50% de descuento ", "20% de descuento", "30% de descuento", "5% de descuento", "10% de descuento", "1% de descuento"];
const colores = ["#ffde59", "#88bff6", "#ffde59", "#88bff6", "#ffde59", "#88bff6"]

let anguloRotacion = 0;
let girando = false;
let yaGano = false; // Nueva variable para controlar si ya ha ganado

// Dibujar la ruleta
function dibujarRuleta() {
    const tamanoArco = (2 * Math.PI) / premios.length;
    premios.forEach((premio, indice) => {
        const angulo = tamanoArco * indice + anguloRotacion;
        ctx.beginPath();
        ctx.arc(250, 250, 200, angulo, angulo + tamanoArco);
        ctx.lineTo(250, 250);
        ctx.fillStyle = colores[indice];
        ctx.fill();
        ctx.save();

        // Agregar texto
        ctx.translate(250, 250);
        ctx.rotate(angulo + tamanoArco / 2);
        ctx.textAlign = "center";
        ctx.fillStyle = "#000";
        ctx.font = "16px Arial";
        ctx.fillText(premio, 120, 10);
        ctx.restore();
    });
}

// Girar la ruleta
function girarRuleta() {
    if (!girando && !yaGano) { // Verificar que no esté girando y que no haya ganado antes
        girando = true;
        let tiempoGiro = Math.random() * 3000 + 2000; // Tiempo aleatorio entre 2 y 5 segundos
        let velocidadGiro = Math.random() * 10 + 10; // Velocidad de giro aleatoria
        let anguloTotal = 0;

        const intervaloGiro = setInterval(() => {
            ctx.clearRect(0, 0, lienzo.width, lienzo.height);
            anguloRotacion += velocidadGiro;
            anguloTotal += velocidadGiro;
            dibujarRuleta();
            velocidadGiro *= 0.98; // Reducir velocidad gradualmente

            if (velocidadGiro <= 0.2) {
                clearInterval(intervaloGiro);
                girando = false;
                yaGano = true; // Establecer que ya ha ganado

                const indiceGanador = Math.floor((anguloRotacion / (2 * Math.PI)) % premios.length);
                textoResultado.innerText = `¡Ganaste ${premios[indiceGanador]}!`;

                // Deshabilitar el botón después de ganar
                botonGirar.disabled = true;
                botonGirar.style.backgroundColor = "#ffde59"; // Cambiar el estilo del botón para indicar que está deshabilitado
                botonGirar.innerText = "Intento Completado"; // Cambiar el texto del botón
            }
        }, 30);
    }
}

dibujarRuleta();

// Escuchar el evento de clic para girar la ruleta
botonGirar.addEventListener("click", girarRuleta);


