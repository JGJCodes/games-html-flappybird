/** Archivo JS que incluye la definicion
 * de la vista del menu principal del juego
 * flappy bird
 */

var Menu = {
    preload: function(){ //Definicion del boton start
       // juego.stage.backgroundColor = '#FFF';
        juego.load.image('bg','img/fondo1.png')
        juego.load.image('boton','img/boton.png')
        juego.load.image('titulo','img/titulo.png')
    },

    //Definicion del titulo y subtitulo del juego
    create: function(){
        //define el fondo del juego
        bg = juego.add.tileSprite(0, 0, 370, 550, 'bg');

        var boton = this.add.button(juego.width/2, 
            juego.height/2, 'boton', 
            this.iniciarJuego, this);
        boton.anchor.setTo(0.5);
        
        var txtIniciar = juego.add.text(juego.width/2, 
            juego.height/2 -85, "Iniciar juego",{
                font: "bold 24px sans-serif", 
                fill:"white", 
                align:"center"});
        txtIniciar.anchor.setTo(0.5);

        var txtTitulo = juego.add.image(
            juego.width/2, 
            juego.height/2 - 145,
             "titulo", { 
                 align:"center"});
        txtTitulo.anchor.setTo(0.5);
        /*
        var txtTitulo = juego.add.text(juego.width/2, 
            juego.height/2 -125, "Flappy Bird", {
                font: "bold 30px sans-serif",
                 fill:"black", 
                 align:"center"});
        txtTitulo.anchor.setTo(0.5);*/
    },

    update: function(){
        bg.tilePosition.x -= 1; 
    },
    
    //Metodo que inicia el juego 
    iniciarJuego: function(){
        this.state.start('Juego');
    }
    
};