var nBack = nBack || {};

nBack.MainMenu = function() {};

var count = 0;

nBack.MainMenu.prototype = {
    create: function() {
        this.game.add.tileSprite(0,0,800,600,'background');
        this.game.stage.backgroundColor = '#91E4FF';                
        
        playButton = this.game.add.button(200, 400, 'playButton', this.play, this);
        instructButton  = this.game.add.button(430, 400, 'instructButton', this.instruct, this);

        introSound = game.add.audio('introSound');
        introSound.play();
    },
    update: function() {
        if(count === 1){
          game.state.start('mainState');
          count = 0;
        } else if (count === -1){
          game.state.start('Instruct');
          count = 0;
        } 
    },
    play: function() {
        introSound.destroy();
        count += 1;
    },
    instruct: function() {
        introSound.destroy();
        count -= 1;
    }
}
