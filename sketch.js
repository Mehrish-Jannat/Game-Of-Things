var mario,RIPmario,Gold,Thething,ITsOK,WheresMyThing;
var Mario,ground;
var gameState = 1;
var score = 0;
function preload (){
    mario = loadAnimation("Capture1.png","Capture3.png","Capture4.png")
    RIPmario = loadAnimation("mariodead.png")
    Gold = loadImage("coin.png")
    Thething = loadImage("obstacle1.png")
    ITsOK = loadImage("obstacle2.png") 
    ThingEnded = loadImage("gameOver.png")
}

function setup(){
   createCanvas(windowWidth,windowHeight)
   Mario = createSprite(100,height-70)
   Mario.addAnimation("walking",mario)
   ground = createSprite(width/2,height-10,width,20)
   edges = createEdgeSprites()
   Money = createGroup()
   Happiness = createGroup()
}

function draw(){
    background("blue")
    textSize(25)
    text("How rich I am : " + score,width-400,80)
    Mario.collide(ground)
    Mario.collide(edges)
    if (gameState === 1){
        if (keyDown("space") && Mario.y>150 && frameCount%5===0 ){
            Mario.velocityY = -15
        }
        Mario.velocityY += 0.8
        things()
        things_season_2()

       for (var i=0;i<Money.length;i++){
           if (Mario.isTouching(Money.get(i))){
               Money.get(i).destroy()
               score++
           }
       }
       if (Mario.isTouching(Happiness)){
           gameState = 0
       }
    }
    if (gameState === 0){
        Happiness.setVelocityXEach(0)
        Money.setVelocityXEach(0)
        Mario.velocityY = 0
        image(ThingEnded,width/2,height/2)
        Mario.addAnimation("RIP",RIPmario)
        Mario.changeAnimation("RIP",RIPmario)
        Mario.scale = 0.5
    }
    drawSprites()
}

function things(){
    if (frameCount%100===0){
        thing = createSprite(width,height-100)
        thing.velocityX = -(8+score/3)
        thing.scale = 0.3
        switch(Math.round(random(1,2))){
            case 1 : thing.addImage(Thething)
            break
            case 2 : thing.addImage(ITsOK)
            break
        }
        Happiness.add(thing)
    }
}

function things_season_2(){
    if (frameCount%60===0){
        thing2 = createSprite(width,random(50,150))
        thing2.velocityX = -5
        thing2.addImage(Gold)  
        thing2.scale = 0.2
        Money.add(thing2)
    }
}