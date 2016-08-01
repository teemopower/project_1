var nBack = nBack || {};

nBack.Instruct = function() {};

var count = 0;

nBack.Instruct.prototype = {
    create: function() {
        this.game.stage.backgroundColor = '#91E4FF';
        this.game.add.text(120,100, 'Akuma: \n W - Left Fireball \n S - Right Fireball \n D - Move Right \n A - Move Left', {font: '30px Arial', fill: '#000000'});
        this.game.add.text(450,100, 'Ryu: \n DOWN - Fireball \n RIGHT - Move Right \n LEFT - Move Left', {font: '30px Arial', fill: '#000000'});                 
        
        mainButton = this.game.add.button(16, 500, 'mainButton', this.options, this);   
    },
    update: function() {
        if(count > 0){
          game.state.start('MainMenu');
          count = 0;
        }   
    },
    options: function(){
        count += 1;
    }
}