var ironMan, ironManImg;
var bgImg, bg;
var floor;

var rocks, rocksImg, rocksGroup;
var diamond, diamondImg, diamondGroup;

var sound, score = 0;


function preload() {
    ironManImg = loadImage("images/iron.png");
    bgImg = loadImage("images/bg.jpg");
    rocksImg = loadImage("images/stone.png");
    diamondImg = loadImage("images/diamond.png");
    sound = loadSound("sounds/coinSound.mp3")
}


function setup() {

    createCanvas(1100, 710);

    bg = createSprite(580, 300);
    bg.addImage(bgImg);
    bg.scale = 4;
    bg.velocityY = -10;
    
    ironMan = createSprite(70, 670, 20, 20);
    ironMan.addImage(ironManImg);
    ironMan.scale = 0.4; 
    
    // floor = createSprite(550, 710, 1100, 11)
    // floor.visible = 0;
    // ironMan.debug = 1;

    rocksGroup = new Group();
    diamondGroup = new Group()
}


function draw() {


    if(bg.y < 10){
        bg.y = bg.width/2;
    }

    {
        if(ironMan.x < 50){
            ironMan.x = 50;
        }

        if(ironMan.x > 1000){
            ironMan.x = 1000;
        }

        if(ironMan.y < 74){
            ironMan.y = 74;
        }

        if(ironMan.y > 630){
            ironMan.y = 630;
        }    
    }


    {
        
        if(keyDown("space")){
            ironMan.velocityY = -7;
        }
        
        if(keyDown("up")){
            ironMan.velocityY = -7;
        }
        
        if(keyDown("right")){
            ironMan.velocityX = +10;
        }
        
        if(keyDown("left")){
            ironMan.velocityX = -10;
        }
    
        ironMan.velocityY += 0.5;
        
    }
    

    {    
        ironMan.setCollider("rectangle", 70, -20, 365, 445)
        // ironMan.collide(floor);
        
        ironMan.collide(rocksGroup)
    }

    {
        createDiamonds();

        createRocks();
    }


    {
        for(var i = 0; i < diamondGroup.length; i++){
            var b = (diamondGroup).get(i);

            if (ironMan.isTouching(b)){
                b.destroy();
                sound.play();
                score += 5;                
            }
        }
    }


    drawSprites();
}

function createRocks() {
    if(frameCount % 65 === 0){
        rocks = createSprite(random(50, 1000), 0, 190, 35);
        rocks.velocityY += 7;
        rocks.addImage(rocksImg);
        // rocks.debug = 1;
        rocks.setCollider("rectangle", 0, 0, 190, 30)

        rocksGroup.add(rocks);       
    }
}

function createDiamonds() {
    if (frameCount % 85  === 0){
        diamond = createSprite(random(50, 1000), 0, 10, 35);
        diamond.velocityY += 12;
        diamond.addImage(diamondImg);
        diamond.scale = 0.4;

        diamondGroup.add(diamond)
    }
}