/** Archivo JS Juego
 * Define los componentes de la ventana de juego
 * Contiene las variables y metodos del juegador 
 * y los obstaculos o enemigos del juego.
 */

var bg;       //Define el fondo de la pantalla
var tubos;    //Define los obstaculos del juego
var ave;      //Define el personaje del jugador
var salto;    //Define la accion a realizar con las peticiones del juegador
var timer;    //Define el cronometro de la partida
var puntos;   //Define los puntos obtenidos por el jugador en la partida
var txtPuntos;//Define la etiqueta del objeto puntaje

var Juego = {
    //metodo que carga los componentes de la ventana
    preload: function(){
        juego.load.image('bg', 'img/fondo2.png');
        juego.load.spritesheet('pajaros', 'img/pajaro2.png', 43, 30);
        juego.load.image('tubo', 'img/tubo2.png');
        
        juego.forceSingleUpdate = true;
    },
    
    //Define los componentes de la partida
    create: function(){
        //define el fondo del juego
        bg = juego.add.tileSprite(0, 0, 370, 550, 'bg');

        //ejecuta el inicio de la partida de juego
        juego.physics.startSystem(Phaser.Physics.ARCADE);
        
        //define las caracteristicas de los obstaculos
        tubos = juego.add.group();
        tubos.enableBody = true;
        tubos.createMultiple(20, 'tubo');
        
        //define las propiedades del personaje jugable
        ave = juego.add.sprite(100, 245, 'pajaros');
        ave.frame = 1;
        ave.anchor.setTo(0, 0.5);
        ave.animations.add('vuelo', [0,1,2], 10, true);
        juego.physics.arcade.enable(ave);
        ave.body.gravity.y = 1200;

        //define las acciones del jugador 
        salto = juego.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        salto.onDown.add(this.saltar, this);
        
        //define el contador del tiempo de la partida
        timer = juego.time.events.loop(1500, this.crearColumna, this);
        
        //define el objeto puntaje del jugador
        puntos = -1;
        txtPuntos = juego.add.text(20, 20, "0", {font: "30px Arial", fill: "#FFF"});
 
    },
    
    //metodo que realiza las acciones de actualizar el estado de la partida
    update: function(){
        if(ave.inWorld == false){
            //Reiniciar = enviar a Game_Over
            this.state.start('Game_Over');
        }
        else if(ave.position.y >460){
            //Reiniciar = enviar a Game_Over
            ave.alive = false;
            tubos.forEachAlive(function(t){
                   t.body.velocity.x = 0;
            }, this);
        } else {
            bg.tilePosition.x -= 1; 
        }
        //sobrecarga de los objetos
        juego.physics.arcade.overlap(ave, tubos, this.tocoTubo, null, this);
        //accion del jugador
        ave.animations.play('vuelo');
        if(ave.angle <20){
            ave.angle += 1;        
        }
    },
    
    /*Metodo que realiza la accion de saltar al momento 
    de obtener una lectura de pulsacion del usuario */
    saltar: function(){
        ave.body.velocity.y = -350;
        juego.add.tween(ave).to({angle:-20}, 100).start();
    },
    
    /*Funcion que genera un espacio en el obstaculo 
    para que el jugador pueda pasar por este mismo*/
    crearColumna: function(){
        var hueco = Math.floor(Math.random()*5)+1;
        for( var i = 0; i < 8; i++){
            if(i != hueco && i != hueco+1){
                this.crearUnTubo(370, i*55+20);
            }
        }
        puntos +=1;
        txtPuntos.text = puntos;
    }, 
    
    //Metodo que genera un obstaculo llamado tubo
    crearUnTubo: function(x, y){
        var tubo = tubos.getFirstDead();
        
        tubo.reset(x, y);
        tubo.body.velocity.x = -180;
        tubo.checkWorldBounds = true;
        tubo.outOfBoundsKill = true;
    },
    
    //Funcion que evalua la colision del tubo con el ave
    tocoTubo: function(){
        if(ave.alive == false)
            return;
        ave.alive = false;
        juego.time.events.remove(timer);
        
        tubos.forEachAlive(function(t){
            t.body.velocity.x = 0;
        }, this);
    }
};