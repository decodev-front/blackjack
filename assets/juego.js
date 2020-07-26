/* Lógica del Juego 
 * {decodev}
 * 25-07-2019
 * C = (treboles) 
 * D = (DIAMANTES) 
 * H = (CORAZONES) 
 * S = (CORAZÓN NEGRO)
*/

// Declaración de variables
let deck = [],
    aleatorio, 
    seleccionado;


// Llamados al DOM
let cartasJugador = document.querySelector('#jugador-cartas'),
    cartasPC = document.querySelector('#computadora-cartas'),
    puntaJugador = document.getElementById('puntaje-jugador'),
    puntaPC = document.getElementById('puntaje-pc'),
    btnPedir = document.querySelector('.pedir');
// Declaración de constantes
const TIPOS = ['C', 'D', 'H', 'S'];
const LETRAS = ['J', 'Q', 'K', 'A'];


// Creamos el deck de las cartas
const crearDeck = () => {

    // Hacemos el primer llenado de las cartas, siendo estas las numericas
    // Se llena el deck con un objeto de las cartas: EJ { codigo:2S, valor: 2 }
    for( let i = 2; i <= 10 ;i++ ){
        for( let tipo of TIPOS){
            deck.push( {
                codigo: i + tipo,
                valor: i 
            });
        }
    }

    // Hacemos el segundo llenado de las cartas, siendo estas las que contienen letras
    // Se llena el deck con un objeto de las cartas: EJ { codigo:2S, valor: 2 }
    for (let tipo of TIPOS) {
        for (let letra of LETRAS) {
            let vt = 1;
            if( letra === 'J' ){
                vt = 11
            }else if( letra === 'Q' ){
                vt = 12
            } else if( letra === 'K' ){
                vt = 13
            }

            deck.push({
                codigo: letra + tipo,
                valor: vt
            })
        }
    }
}



function cartaAleatoria(){

    return aleatorio = Math.floor(Math.random()*(deck.length));
}

function calcularPuntaje( carta, turno ){

    let jugador = Number(puntaJugador.innerHTML);
    let pc = Number(puntaPC.innerHTML);

    img = document.createElement('img');

    seleccionado = deck[carta]
    console.log( seleccionado )
    img.src = `assets/img/${seleccionado.codigo}.png`;
    deck.splice(deck.indexOf(seleccionado), 1);
    img.classList = 'carta';


    if( turno === 'jugador' ){
        puntaJugador.innerHTML = jugador + seleccionado.valor

        cartasJugador.append(img)
        if( Number(puntaJugador.innerHTML) === 20 ){
            alert('GANA JUGADOR 1');
        } else if(Number(puntaJugador.innerHTML) > 20 ){
            computadora(puntaJugador.innerHTML)
        }
    } else if( turno === 'pc' ) {
        puntaPC.innerHTML = pc + seleccionado.valor;
        cartasPC.append(img);
        console.log( puntaPC.innerHTML );
        if( Number(puntaPC.innerHTML) === 20 ){
            alert('GANA EL PC');
            nuevoJuego();
        }else if( (Number(puntaPC.innerHTML) < 20) && ( Number(puntaPC.innerHTML) > Number(puntaJugador.innerHTML) )){
            alert('GANA EL PC');
            nuevoJuego();
        }else if( Number(puntaPC.innerHTML) > 20) {
            alert('GANA EL JUGADOR1');
            nuevoJuego();
        }
    }
}

function computadora() {

    console.log(puntaJugador.innerHTML);
    console.log(puntaPC.innerHTML);

    do {

        calcularPuntaje(aleatorio, 'pc');


        if( Number(puntaJugador.innerHTML) > 20 ){
            alert('GANA EL PC');
            nuevoJuego();
            return;
        }
    } while ( (Number(puntaPC.innerHTML) <= Number(puntaJugador.innerHTML)) && ( Number(puntaPC.innerHTML) <=20) );

}

function nuevoJuego() {
    setTimeout(()=>{
        puntaJugador.innerHTML = 0;
        puntaPC.innerHTML = 0;
        cartas = document.querySelectorAll('.carta')
        deck = [];
        crearDeck();

        for( let carta of cartas ){
            carta.remove();
        }

    }, 1500);

}

btnPedir.addEventListener("click", ()=> {

    calcularPuntaje(cartaAleatoria(), 'jugador')
});
document.querySelector('.btnStop').addEventListener('click', ()=> {
    computadora(puntaJugador);
})

document.querySelector('.btnNew').addEventListener('click', ()=> {
    nuevoJuego();
})

crearDeck();







