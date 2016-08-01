var nBack = nBack || {};

nBack.Preload = function() {};

nBack.Preload.prototype = {
    preload: function() {
    
     // load images
    this.load.image('background', 'assets/sfBackground.png');
    this.load.image('sffield', "assets/honda1.png");
    this.load.image('fightImg', 'assets/fightImage.png');
    this.load.image('player','assets/ryu-sm.png');
    this.load.image('player2','assets/akuma2.png');
    this.load.image('fireBall', 'assets/hado.png');
    this.load.image('fireBall2', 'assets/hadoAkuma.png');
    this.load.image('enemy', 'assets/hado.png');
    this.load.image('againButton', 'assets/button.png');
    this.load.image('mainButton', 'assets/mainButton.png');
    this.load.image('instructButton', 'assets/instructButton.png');
    this.load.image('playButton', 'assets/playButton.png');

    // load audio and mp3
    this.load.audio('fireBallSound', 'assets/hadoSound.mp3');
    this.load.audio('ehonda', 'assets/ehonda.mp3');
    this.load.audio('fight', 'assets/fight.mp3');
    this.load.audio('akuma', 'assets/akuma.mp3');
    this.load.audio('winSound', 'assets/win.mp3');
    this.load.audio('introSound', 'assets/intro.mp3');
        
    },
    create: function() {
        game.state.start('MainMenu');
    }
};