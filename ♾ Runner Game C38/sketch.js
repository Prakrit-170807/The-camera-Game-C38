var Ship, Ship_image,ship_imgBRK;
var back, back_img;
var asteroid, asteroid_image, asteroidGroup;
var asteroid2, asteroid2_image, asteroidGroup2;
var asteroid3, asteroid3_image, asteroidGroup3;
var asteroid4, asteroid4_image, asteroidGroup4;
var hitcount=0,hiteffect=0
var GameMode = "Play";
Score = 0;


function preload() {
  Ship_image = loadImage("Spaceship.png")
  back_img = loadImage("background.png")
  asteroid_image = loadImage("asteroid.png")
  asteroid2_image = loadImage("asteroid2.png")
  asteroid3_image = loadImage("asteroid3.png")
  asteroid4_image = loadImage("asteroid4.png")

}


function setup() {
  createCanvas(windowWidth,windowHeight);
  Ship = createSprite(width/2, 100, 10, 10);
  Ship.addImage(Ship_image)
  Ship.scale =0.5;

  back = createSprite(width/2,-4500,windowWidth,windowHeight)
  back.addImage(back_img)
  
  Score = 0

  asteroidGroup = new Group()
  asteroidGroup2 = new Group()
  asteroidGroup3 = new Group()
  asteroidGroup4 = new Group()

}

function draw() {
  background(0)
  Ship.setCollider("rectangle", 0, 0, 220, 330)
  Ship.debug=true
  
  if (GameMode == "Play") {
    
    Score = Score + Math.round(frameRate() / 60)
    if ((keyWentDown("w") || touches.length > 0)) {
      Ship.velocityY=-10;
      touches = []
    }
    if ((keyWentDown("a") || touches.length > 0)) {
      Ship.x=Ship.x-40;
      touches = []
    }
    if ((keyWentDown("s") || touches.length > 0)) {
      Ship.y=Ship.y+100;
      touches = []
    }
    if ((keyWentDown("d") || touches.length > 0)) {
      Ship.x=Ship.x+40;
      touches = []
    }
    

    Asteroid();
    if (asteroidGroup.isTouching(Ship)) {
      hitcount=hitcount+1
    }
    if (asteroidGroup2.isTouching(Ship)) {
      hitcount=hitcount+1
    }
    if (asteroidGroup3.isTouching(Ship)) {
      hitcount=hitcount+1
    }
    if (asteroidGroup4.isTouching(Ship)) {
      hitcount=hitcount+1
    }
    if(hitcount>=10){
      hiteffect=10
      Ship.y=Ship.y+random(0,hiteffect)
    }
    if(hitcount==20){
      hiteffect=20
      GameMode="END"
      
    }
  }
  if (GameMode == "END") {
    asteroidGroup.setVelocityXEach(0)
    asteroidGroup.setLifetimeEach(-1)
    Ship.y=Ship.y+random(0,40)
    text("Game Over Press 'R' to Restart", width / 2 , height / 2- 100)
    if (keyDown("R") || touches.length > 0) {
      GameMode = "Play"
      asteroidGroup.destroyEach()
      asteroidGroup.setVelocityXEach(10)
      Ship.x=width/2
      Ship.y=100
      hiteffect=0
      hitcount=0
      Score = 0
      touches = []
    }
  }
  back.depth=-1
  camera.x=windowWidth/2
  camera.y=Ship.y
  drawSprites();

}


function Asteroid() {
  if (frameCount % 120 == 0) {
    asteroid = createSprite(random(50,1400), Ship.y-400, 10, 10)
    asteroid.setCollider("circle",0,0,200)
    asteroid.addImage(asteroid_image)
    asteroid.scale = 0.25
    asteroid.velocityY =+10
    asteroid.lifetime = 210
    asteroidGroup.add(asteroid)
    asteroid.debug=true
  }
  if (frameCount % 170 == 0) {
    asteroid2 = createSprite(random(20,1400), Ship.y-400, 10, 10)
    asteroid2.setCollider("circle",0,0,200)
    asteroid2.addImage(asteroid2_image)
    asteroid2.scale = 0.25
    asteroid2.velocityY = +10
    asteroid2.lifetime = 210
    asteroidGroup2.add(asteroid2)
    asteroid2.debug=true
  }
  if (frameCount % 130 == 0) {
    asteroid3 = createSprite(random(20,1400), Ship.y-400, 10, 10)
    asteroid3.setCollider("circle",0,0,200)
    asteroid3.addImage(asteroid3_image)
    asteroid3.scale = 0.25
    asteroid3.velocityY = +10
    asteroid3.lifetime = 210
    asteroidGroup3.add(asteroid3)
    asteroid3.debug=true
  }
  if (frameCount % 230 == 0) {
    asteroid4 = createSprite(random(20,1400), Ship.y-400, 10, 10)
    asteroid4.setCollider("circle",0,0,200)
    asteroid4.addImage(asteroid4_image)
    asteroid4.scale = 0.25
    asteroid4.velocityY = +10
    asteroid4.lifetime = 210
    asteroidGroup4.add(asteroid4)
    asteroid4.debug=true
  }
}