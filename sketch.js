var dog, happyDog, dogImg, happyDogImg, sadDog;
var database;
var foodS, foodStock;
var fedTime, lastFed;
var feed, addFood;
var foodObj;
var bedroom,garden, washroom;
var gameState, readState; 

function preload(){
  dogImg = loadImage("images/dogImg.png");
  happyDogImg = loadImage("images/dogImg1.png");
  bedroom = loadImage("images/Bed Room.png");
  washroom = loadImage("images/Wash Room.png");
  garden = loadImage("images/Garden.png");
  sadDog = loadImage("images/Lazy.png");
	
}

function setup() {
  createCanvas(500, 500);

  
  dog = createSprite(400,300,30,30);
  dog.scale = 0.25;
  dog.addImage(dogImg);
  
  foodObj = new Food();

  database = firebase.database();

  foodStock = foodObj.getFoodStock();  
  //foodStock = database.ref("Food");
  //foodStock.on("value",readStock);

  feed = createButton("Feed the dog");
  feed.position(500,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(600,95);
  addFood.mousePressed(addFoods);

  readState = database.ref("gameState");
  readState.on("value",function(data){
    gameState = data.val();
  });

  fedTime = database.ref("FeedTime");
  fedTime.on("value",function(data){
    lastFed = data.val();
  });
  
}


function draw() {
  background(46, 139, 87);
   

  fill(255,255,254);
        textSize(15);
        if(lastFed >= 12){
            text("Last Feed : "+ lastFed%12 + " PM", 350,30);
        }else if(lastFed == 0){
            text("Last Feed : 12 AM", 350,30);
        }else{
            text("Last Feed : "+ lastFed + " AM", 350,30);
        }

  if(gameState!="Hungry"){
    feed.hide();
    addFood.hide();
   // dog.remove();
  }else{
    feed.show();
    addFood.show();
    dog.scale = 0.25;
    //dog.addImage(sadDog);
  }
  
  var currentTime = hour();
  if(currentTime==(lastFed+1)){
    update("Playing");
    foodObj.garden();
  }else if(currentTime==(lastFed+2)){
    update("Sleeping");
    foodObj.bedroom();
  }else if(currentTime>(lastFed+2) && currentTime<=(lastFed+4)){
    update("Bathing");
    foodObj.washroom();
  }else{
    update("Hungry");
    foodObj.display();
    drawSprites();
  }

 // drawSprites();
  
}
/*
function readStock(data){
  foodS = data.val();
}

function writeStock(x){

  database.ref("/").update({
    Food:x
  })
}*/

function feedDog(){
  dog.addImage(happyDogImg);
  //var foodS = foodObj.getFoodStock();
 // console.log("foodS", foodS);
  //foodObj.updateFoodStock(foodS-1);
  database.ref("/").update({
    Food:foodObj.getFoodStock()-1,
    FeedTime:hour()
  })
}

function addFoods(){
  var foodS = foodObj.getFoodStock();
  //console.log("foodS", foodS);
  foodS++;
  //console.log("foodS", foodS);
  database.ref("/").update({
    Food:foodS
  })
}

function update(state){
  database.ref("/").update({
    gameState:state
  });
}



