/**Archivo Javascript GameOver
 * Define las propiedades de la ventana de "gameover" o perdedor
 * Esta incluye dos funciones en que muestran el fin del juego
 * y un boton para iniciar otra partida en el juego
 */

var Game_Over = {
    
    //Carga el estilo de la ventana de fin de juego
    preload: function(){
        //juego.stage.backgroundColor = '#FFF';
        juego.load.image('bg','img/fondo1.png')
        juego.load.image('boton', 'img/boton.png');
        juego.load.image('gameover', 'img/gameover.png');
    }, 
    
    create: function(){
        //define el fondo del juego
        bg = juego.add.tileSprite(0, 0, 370, 550, 'bg');

        var boton = this.add.button(
                                    juego.width/2,
                                    juego.height/2,
                                    'boton',
                                    this.iniciarJuego, 
                                    this);
        boton.anchor.setTo(0.5);
        
        //Define el label o etiqueta del marcador de puntaje
        var txtPuntosEtiqueta = juego.add.text(
                                    juego.width/2 -50,
                                    juego.height/2 -85, 
                                    "Puntos: ", {
                                            font: "bold 20px sans-serif", 
                                            fill:"white",
                                            align:"center"});
        txtPuntosEtiqueta.anchor.setTo(0.5);

        if(puntos == -1)
            puntos = 0;

        //Impresion del puntaje obtenido en la partida terminada
        var txtPuntosNumero = juego.add.text(
                                    juego.width/2 +50,
                                    juego.height/2 -85,
                                    puntos.toString(), {
                                            font: "bold 20px sans-serif",
                                            fill:"white", 
                                            align:"center"});
        txtPuntosNumero.anchor.setTo(0.5);

        var txtTitulo = juego.add.image(
                                    juego.width/2,
                                    juego.height/2 -145,
                                    "gameover", { 
                                            align:"center"});
        txtTitulo.anchor.setTo(0.5);
        /*Label de game over
        var txtTitulo = juego.add.text(
                                    juego.width/2,
                                    juego.height/2 -125,
                                    "Juego terminado", {
                                            font: "bold 30px sans-serif",
                                            fill:"white", 
                                            align:"center"});
        txtTitulo.anchor.setTo(0.5);*/
    }, 

    update: function(){
        bg.tilePosition.x -= 1; 
    },
    
    //Iniciar nueva partida
    iniciarJuego: function(){
        this.state.start('Juego');
    }
    
};