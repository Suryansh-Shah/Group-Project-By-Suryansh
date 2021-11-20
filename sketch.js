var backImage,backgr;
var player, player_running;
var ground,ground_img;

var FoodGroup, bananaImage;
var obstaclesGroup, obstacle_img,obstacle_img2,obstaclesGroup2;

var eatingSound;
var gameoverSound;
var disgustSound;

var END =0;
var PLAY =1;
var gameState = PLAY;

var gameOver;
var restart; 
var restart_png;
var score=0;

function preload(){
  backImage=loadImage("images/jungle.jpg");
  player_running = loadAnimation("images/Monkey_01.png","images/Monkey_02.png","images/Monkey_03.png","images/Monkey_04.png","images/Monkey_05.png","images/Monkey_06.png","images/Monkey_07.png","images/Monkey_08.png","images/Monkey_09.png","images/Monkey_10.png");
  bananaImage = loadImage("images/banana.png");
  obstacle_img = loadImage("images/stone.png"); 
  gameOverImg = loadImage("images/gameOver.png");
  obstacle_img2=loadImage("images/obstacle.png");
  restart_png = loadImage("images/re-start.png");
  eatingSound = loadSound("images/Eat.wav");
  gameoverSound = loadSound("images/gameover.wav");
  disgustSound = loadSound("images/Disgust.mp4");
}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.988;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;
  
  FoodGroup = new Group();
  obstaclesGroup = new Group();
  obstaclesGroup2 = new Group();

  score = 0;

  gameOver = createSprite(370,220)
  gameOver.addImage(gameOverImg);
  gameOver.visible = false;

  restart = createSprite(370,280);
  restart.addImage(restart_png);
  restart.visible = false;
  restart.scale = 0.26;
}


function draw() { 
  background(0);
  
  if(gameState===PLAY){
  
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
  if(FoodGroup.isTouching(player)){
      eatingSound.play();
      FoodGroup.destroyEach();
      player.scale += 0.05
      score = score + 2;
    }
  
    if(obstaclesGroup2.isTouching(player)){
      disgustSound.play();
      obstaclesGroup2.destroyEach();
      player.scale -= 0.05
      score = score - 1;
      
    }
    if(keyDown("space")&& player.y >= 250) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
    
    player.collide(ground);
    spawnFood();
    spawnObstacles();  
    spawnObstacles2();  
    if(obstaclesGroup.isTouching(player)){ 
      goSound();  
      gameState = END;
    }
  }else if(gameState === END){

    backgr.velocityX = 0;
    player.visible = false;
    
    FoodGroup.destroyEach();
    obstaclesGroup.destroyEach();
    obstaclesGroup2.destroyEach();
    
    gameOver.visible = true;
    restart.visible = true;
  }

if(mousePressedOver(restart)){
 gameState = PLAY;
 gameOver.visible = false;
 restart.visible = false;
 player.visible = true;
 backgr.x=backgr.width/2;
 backgr.velocityX=-4;
 player.scale = 0.1;
 player.x = 100;
 player.y = 340;
 score = 0;
}

drawSprites();
if(gameState===PLAY){
stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 550,50);
  text("Press Space to jump!", 50,50);
}
}
function spawnFood() {
  //write code here to spawn the food
  if (frameCount % 80 === 0) {
    var banana = createSprite(800,250,40,10);
    banana.y = random(120,200);    
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.velocityX= -4; 
    
    banana.lifetime = 300;
    player.depth = banana.depth + 1;
    FoodGroup.add(banana);
  }
}

function spawnObstacles() {
  //write code here to spawn the obstacles
  if(frameCount % 300 === 0) {
    var obstacle = createSprite(800,350,10,40);
    obstacle.velocityX=-4; 
    obstacle.addImage(obstacle_img);
    
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
    obstaclesGroup.add(obstacle);
  }
}
function spawnObstacles2() {
  //write code here to spawn the obstacles
  if(frameCount % 300 === 0) {
    var obstacle2 = createSprite(800,300,10,20);
    obstacle2.y = random(100,200);    
    obstacle2.addImage(obstacle_img2);
    obstacle2.velocityX= -4;   
    obstacle2.scale = 0.03;
    obstacle2.lifetime = 1000;
    obstaclesGroup2.add(obstacle2);
  }
}

function goSound(){
  gameoverSound.play();
}