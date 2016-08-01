var game = new Phaser.Game(800,600,Phaser.CANVAS, 'gameDiv');

// background
var sffield;

// main menu background
var sfBackground;

// fight image
var fightImage;

// game variables
var player;
var player2;
var cursor;

// BUTTONS
var againButton;
var instructButton;
var mainButton;

//fireballs
var fireBalls;
var fireBallsTime = 0;
var fireBalls2;
var fireBalls2Time = 0;

var fireButton;
var enemies;

// create audio variables
var hadoSound;
var ehondaSound;
var fightSound;
var akumaSound;
var youSound;
var winSound;

var introSound;

// create score
var score = 0;
var scoreBox;

// create score
var score2 = 0;
var scoreBox2;

// YOU WIN TEXT BOX
var endMessage;

var mainState = {
  
  create:function(){
    // add the background
    sffield = game.add.tileSprite(0,0,800,600,'sffield');
    // add fight logo
    fightImage = game.add.sprite(game.world.centerX -100, game.world.centerY -80, 'fightImg');
    // add TIMER to remove fight logo - calls fadePicture()
    game.time.events.add(Phaser.Timer.SECOND * 1, fadePicture, this);

    // add player
    player = game.add.sprite(game.world.centerX -350, game.world.centerY + 130, 'player');
    player2 = game.add.sprite(game.world.centerX +210, game.world.centerY - 300, 'player2');
    // add physics to players
    game.physics.enable(player, Phaser.Physics.ARCADE);
    game.physics.enable(player2, Phaser.Physics.ARCADE);

    //add try again button
    againButton = game.add.button(game.world.centerX -80, game.world.centerY + 30, 'againButton', actionOnClick, this, 2, 1, 0);

    // add keyboard
    cursors = game.input.keyboard.createCursorKeys();

    // create fireballs
    fireBalls = game.add.group();
    // add physics to fireBalls
    fireBalls.enableBody = true;
    fireBalls.physicsBodyType = Phaser.Physics.ARCADE;

    // set fireBalls attributes
    fireBalls.createMultiple(2, 'fireBall');
    fireBalls.setAll('anchor.x', -1.5);
    fireBalls.setAll('anchor.y', 0.5);
    fireBalls.setAll('outOfBoundsKill', true);
    fireBalls.setAll('checkWorldBounds', true);


     // create fireballs2
    fireBalls2 = game.add.group();
    // add physics to fireBalls
    fireBalls2.enableBody = true;
    fireBalls2.physicsBodyType = Phaser.Physics.ARCADE;

    // set fireBalls attributes
    fireBalls2.createMultiple(1, 'fireBall2');
    fireBalls2.setAll('anchor.x', -1.5);
    fireBalls2.setAll('anchor.y', 0.5);
    fireBalls2.setAll('outOfBoundsKill', true);
    fireBalls2.setAll('checkWorldBounds', true);

    // SCORE
    scoreBox = game.add.text(0, 575, 'R:', {font: '20px Arial', fill: '#fff', backgroundColor: "black"});
    scoreBox2 = game.add.text(710, 0, 'A:', {font: '20px Arial', fill: '#fff', backgroundColor: "black"});
    // END MESSAGE
    endMessage = game.add.text(game.world.centerX -200, game.world.centerY - 100, "You Win!", {font: '100px Arial', fill: '#008CFF', fontWeight: 'bold', backgroundColor: 'black'});
    endMessage.visible = false;
    //TRY AGAIN BUTTON
    againButton.visible = false;

    // add audio
    hadoSound = game.add.audio('fireBallSound');
    ehondaSound = game.add.audio('ehonda');
    fightSound = game.add.audio('fight');
    akumaSound = game.add.audio('akuma');
    winSound = game.add.audio('winSound');

    // Loading music and other
    fightSound.play();
    ehondaSound.play();

  },
  update:function(){

    // Collision detection
    game.physics.arcade.overlap(fireBalls, fireBalls2, collisionHandler, null, this);
    // Collision detection - Ryu hits Akuma
    game.physics.arcade.overlap(fireBalls, player2, collisionHandler2, null, this);
    // Collision detection - Akuma hits Ryu
    game.physics.arcade.overlap(fireBalls2, player, collisionHandler3, null, this);
    
    //Player 1 controls
    player.body.velocity.x = 0;

    if(cursors.left.isDown){
      player.body.velocity.x = -450;
    }

    if(cursors.right.isDown){
      player.body.velocity.x = 450;
    }

    if(cursors.down.isDown){
      // call hadoken      
      hadoken();
    }

    // Player 2 Controls

    player2.body.velocity.x = 0;

    if(game.input.keyboard.isDown(Phaser.Keyboard.A)){
      player2.body.velocity.x = -400;
    }

    if(game.input.keyboard.isDown(Phaser.Keyboard.D)){
      player2.body.velocity.x = 400;
    }

    if(game.input.keyboard.isDown(Phaser.Keyboard.S)){
      // call hadoken      
      hadoken2();
    }
    if(game.input.keyboard.isDown(Phaser.Keyboard.W)){
      // call hadoken      
      hadoken3();
    }

    // SCORE
    scoreBox.text = "Ryu: " + score;
    scoreBox2.text = "Akuma: " + score2;

    if(score >= 2 || score2 >= 2){
      endMessage.visible = true;
      againButton.visible = true;
      //scoreBox.visible = false;
    }
  }
}

function hadoken(){
  // play audio 
  hadoSound.play();
  // checks fireball amount limits
  if(game.time.now > fireBallsTime){
    // get first bullet
    var fireBall = fireBalls.getFirstExists(false);

      if(fireBall){

        //console.log(fireBall);
        // match bullet position to players position
        fireBall.reset(player.x + 14, player.y);

        // add physics to fireball to make it go up, set bullet speed
        fireBall.body.velocity.y = -300;
        fireBall.body.velocity.x = 0;

        // update fireball time in ms
        fireBallsTime = game.time.now + 200;
      }
  } 
}

function hadoken2(){
  // play audio 
  akumaSound.play();
  // checks fireball amount limits
  if(game.time.now > fireBallsTime){
    // get first bullet
    var fireBall2 = fireBalls2.getFirstExists(false);

      if(fireBall2){

        //console.log(fireBall);
        // match bullet position to players position
        fireBall2.reset(player2.x, player2.y);

        // add physics to fireball to make it go up, set bullet speed
        fireBall2.body.velocity.y = 400;
        fireBall2.body.velocity.x = 300;

        // update fireball time in ms
        fireBalls2Time = game.time.now + 200;
      }
  } 
}

function hadoken3(){
  // play audio 
  akumaSound.play();
  // checks fireball amount limits
  if(game.time.now > fireBallsTime){
    // get first bullet
    var fireBall2 = fireBalls2.getFirstExists(false);

      if(fireBall2){

        //console.log(fireBall);
        // match bullet position to players position
        fireBall2.reset(player2.x, player2.y);

        // add physics to fireball to make it go up, set bullet speed
        fireBall2.body.velocity.y = 400;
        fireBall2.body.velocity.x = -300;

        // update fireball time in ms
        fireBalls2Time = game.time.now + 200;
      }
  } 
}

// fireballs colliding with fireballs
function collisionHandler(fireBalls, fireBalls2){
  fireBalls.kill();
  fireBalls2.kill();
}

// Ryu hits Akuma
function collisionHandler2(fireBalls, fireBalls2){
  
  player2.kill();

  winSound.play();
  
  game.time.events.add(Phaser.Timer.SECOND * 1, raiseAkuma, this);

  // increment score
  score += 1;
}

// Akuma hits RYU
function collisionHandler3(fireBalls, fireBalls2){
  
  player.kill();

  winSound.play();

  game.time.events.add(Phaser.Timer.SECOND * 1, raiseRyu, this);

  // increment score
  score2 += 1;
}

function fadePicture(){
  game.add.tween(fightImage).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
}

function picture(){
  fightSound.play();
  game.add.tween(fightImage).to({ alpha: 1 }, 0, Phaser.Easing.Linear.None, true);

  // call to fadePic to remove fight logo
  game.time.events.add(Phaser.Timer.SECOND * 1, fadePicture, this);

}

function raiseAkuma(){
  // if score is less than - revive akuma and call picture, bring fight logo and fight sound
  if(score < 2){
    player2.reset(game.world.centerX +100, game.world.centerY - 300, 'player2');
    picture();
  }
}

function raiseRyu(){
  if(score2 < 2){
    player.reset(game.world.centerX -300, game.world.centerY + 130, 'player');
    picture();
  }
}

// try again button
function actionOnClick(){
  score = 0;
  score2 = 0;
  ehondaSound.destroy();
  game.state.start('mainState');
}

game.state.add('mainState', mainState);
game.state.add('Preload', nBack.Preload);
game.state.add('MainMenu', nBack.MainMenu);
game.state.add('Instruct', nBack.Instruct);

game.state.start('Preload');