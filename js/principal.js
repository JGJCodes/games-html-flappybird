/**Archivo JS que contiene los
 * diferentes ventanas del juego
 * y los graficos que utilizara
 */

var juego = new Phaser.Game(
    370, 550, 
    Phaser.CANVAS,
    'bloque_juego');

juego.state.add('Menu',Menu); //definido en menu.js
juego.state.add('Juego',Juego); //definido en juego.js
juego.state.add('Game_Over',Game_Over); //definido en gameover.js

juego.state.start('Menu');