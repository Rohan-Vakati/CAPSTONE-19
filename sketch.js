var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");

  doorsGroup = new Group();
  
  climbersGroup = new Group();

  invisibleBlockGroup = new Group();

}



function setup() {
  createCanvas(800, 800);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  ghost = createSprite(200,200);
  ghost.addImage("ghost", ghostImg);
  ghost.scale = 0.3;

  spookySound.loop()
}

function draw() {
  background(200);
  if(gameState == "play"){
  if(tower.y > 400){
      tower.y = 300
    }

  
  if(keyDown("space")){
    ghost.velocityY = -7;
  }
 
  ghost.velocityY = ghost.velocityY + 0.8;

  if(keyDown("right")){
    ghost.x = ghost.x + 4;
  }

  if(keyDown("left")){
    ghost.x = ghost.x - 4;
  }
  
  if(climbersGroup.isTouching(ghost)){
    ghost.velocityY = 0;
    
  }
  
  if(invisibleBlockGroup.isTouching(ghost)|| ghost.y>800){
    ghost.destroy();
    gameState = "end"
  }
  







 spawnDoors();



drawSprites();
}
if(gameState == "end"){
  textSize(30);
  fill ("red");
  stroke ("white");
  text ("GAME OVER!!!", 400, 400);
  
}
  }





function spawnDoors(){
 if (frameCount % 120 == 0){
 door = createSprite(200,50);
 door.addImage("door", doorImg);
 door.velocityY = 3;
 door.x = Math.round(random(120,400))
 door.lifetime = 800;
 doorsGroup.add(door);
 
 climber = createSprite(200,120);
 climber.addImage("climber", climberImg);
 climber.velocityY = 3;
 climber.x = door.x;
 climber.lifetime = 800;
 climbersGroup.add(climber);
 
 invisibleBlock = createSprite(200,120);
 invisibleBlock.velocityY = 3;
 invisibleBlock.x = climber.x;
 invisibleBlock.lifetime = 800;
 invisibleBlockGroup.add(invisibleBlock);
 invisibleBlock.width = climber.width;
 invisibleBlock.height = 2;
 invisibleBlock.visible = false;
 
 door.depth = ghost.depth;
 ghost.depth += 1;


 }



 




}