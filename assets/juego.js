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


  // Eventos

  // Evento del boton( Pedir Carta ) para pedir un carta   
  btnPedir.addEventListener("click", ()=> {

      // Llamamos el Método calcularPuntaje el cual realzia la carga de la Carta a la mesa y el puntaje
      // Pasamos como parametro una cartaAleatoria, y la referencia al turno 'jugador'
      calcularPuntaje(cartaAleatoria(), 'jugador')
  });

  // Evento del boton( Detener ) para detener el juego por parte del Jugador 1, y dar inicio a la Computadora   
  document.querySelector('.btnStop').addEventListener('click', ()=> {

    // LLamada al Método que inicia la funcion del turno del PC
      computadora(puntaJugador);
  })
  
  // Evento del boton( Nuevo Juego ), para iniciar un nuevo juego
  document.querySelector('.btnNew').addEventListener('click', ()=> {
      nuevoJuego();
  })

  // Llamada principal al método que crea y carga el deck   
  crearDeck();



  // Cargamos la posicion de una carta aleatoriamente
  function cartaAleatoria(){ return aleatorio = Math.floor(Math.random()*(deck.length)); console.log(deck);}

  // Calculamos el puntaje para jugador, dependiendo del turno
  function calcularPuntaje( carta, turno ){

      //Creamos la varibale de los puntaje de cada jugador
      let jugador = Number(puntaJugador.innerHTML),
          pc = Number(puntaPC.innerHTML),
          cartaSeleccionada = deck[carta];

      // Creamos el elemento img de la carta que será ingresada
      img = document.createElement('img');

      // Le agregamos la imagen en el src del elemento img
      img.src = `assets/img/${cartaSeleccionada.codigo}.png`;

      // Agregamos la clase carta al elemento img, el cuall agrega ciertos estilos
      img.classList = 'carta';

      // Eliminamos la carta del deck, que se le fué asignada al jugador en Turno
      deck.splice(deck.indexOf(cartaSeleccionada), 1);

      // Hacemos la lógica dependiendo del jugador en turno
      if( turno === 'jugador' ){
          // Cargamos el puntaje acomulado del Jugado 1, al HTML
          puntaJugador.innerHTML = jugador + cartaSeleccionada.valor

          // Agregamos la img de la carta en la zona del Jugador 1
          cartasJugador.append(img)

          // Evaluamos las diferentes condiciones a las que se puede enfrentar el Jugador 1
          if( Number(puntaJugador.innerHTML) === 20 ){

              // Alertamos al Usuario de que Fué el ganado ya que su puntaje es un 20 perfecto
              alert('GANA JUGADOR 1');

              // cargamos un nuevo juego
              nuevoJuego(); 

          } else if(Number(puntaJugador.innerHTML) > 20 ){

              //En caso de que el puntaje del jugador se sobrepase de 20, la computadora tiene la oportunidad de ganar
              computadora(puntaJugador.innerHTML)

          }
          // Logica si el turno es del PC
      } else if( turno === 'pc' ) {

          // Cargamos el puntaje acomulado del PC, en el HTML
          puntaPC.innerHTML = pc + cartaSeleccionada.valor;

          // Agregamos la imagen de la carta en la zona del PC
          cartasPC.append(img);

          // Evaluamos todas las condiciones en las que pueda estar el Puntaje del PC
          if( Number(puntaPC.innerHTML) === 20 ){
              
              // Alertamos al Usuario que el PC a ganado con un 20 Perfecto
              alert('GANA EL PC');

              // Iniciamos un Nuevo Jeuego
              nuevoJuego();

              // En caso de que el puntaje del PC sea menor 
              // que 20 y mayor que el del Jugador, alertara al Usuario de que el PC ah ganado
          }else if( (Number(puntaPC.innerHTML) < 20) && ( Number(puntaPC.innerHTML) > Number(puntaJugador.innerHTML) )){

              // Alertamos que el PC ganó
              alert('GANA EL PC');

              // Iniciamos un nuevo juego
              nuevoJuego();

              // En caso de que el PC Obtenga mas de 20, se alerta que Ganó el Jugador 1
          }else if( Number(puntaPC.innerHTML) > 20) {

              // Alertamos que el Jugador 1 Ganó
              alert('GANA EL JUGADOR1');

              // Iniciamos un nuevo Juego
              nuevoJuego();
          }
      }
  }


  // Método que realiza la lógica del Turno del PC
  function computadora() {

      // Realizamos un Do{}While(), aclarando que sin importar el puntaje del Jugador 1
      // Siempre le PC carga/pide una carta
      do {

          // Calculamos el Puntaje del PC, mandando como parametro la carta aleatoria, 
          // Que nos regresa la funcion cartaAleatoria(), y el 2do parametro es la referencia al Turno 'pc'
          calcularPuntaje(cartaAleatoria(), 'pc');

          // Evaluamos si el puntaje del Jugador 1 es mayor a 20,
          // en caso de serlo, se alertará de inmediato, cargado la imagen con la que el PC gana
          // y se saldrá del Método
          if( Number(puntaJugador.innerHTML) > 20 ){

              // Alertara al usuario que el PC Ganó
              alert('GANA EL PC');

              // Inicia un nuevo juego
              nuevoJuego();

              // Termina la ejecución del Codigo
              return;
          }
      } while ( (Number(puntaPC.innerHTML) < Number(puntaJugador.innerHTML)) && ( Number(puntaPC.innerHTML) <=20) );
      // La evaluacion del While se realia de la siguiente manera, aclarando que;
      // puntaPC.innerHTML es el puntaje acumulado del PC
      // puntaJugador.innerHTML es el puntaje acumulado del Jugador 1
      // el while se recorrera hasta que;
      // el puntaje del PC sea mayor al puntaje de Jugador 1, Y el puntaje del PC sea menor a 20 
  }


  // Método que inicia un nuevo Juego
  function nuevoJuego() {

      // Cargamos un setTimeout, para que el Usuario pueda observar las cartas obtenidas por el PC
      setTimeout(()=>{

          // Cargamos el Puntaje del Jugador en 0 
          puntaJugador.innerHTML = 0;

          // Cargamos el Puntaje del PC en 0
          puntaPC.innerHTML = 0;

          // Recolectamos todas las cartas que hayan en la Mesa
          cartas = document.querySelectorAll('.carta')

          // Recorremos todas las cartas para ir borrandolas 1*1
          for( let carta of cartas ){

              // Removemos las cartas que hayan en la Mesa
              carta.remove();
          }

          // Inicializamos el deck de nuevo vacio
          deck = [];

          // Y lo volvemos a cargar y dejarlo listo para un nuevo juego
          crearDeck();

      }, 1200); // El tiempo de espera del setTimeout es de 1200 milesimas( 1.2s )

  }







