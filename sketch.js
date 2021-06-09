//Create variables here
var dog,sadDog,happydog;
var foodObj;
var foodS,foodStock;
var lastFed,fedTime,feed,addFood
var bedroom,garden,washroom;
var  readState;

var gameState="hungry";
var currentTime;

function preload()
{
	//load images here
  sadDog=loadImage("images/sad.png");
  happyDog=loadImage("images/happy.png")
  bedroom=loadImage("images/bedroom.png");
  garden=loadImage("images/garden.png");
  washroom=loadImage("images/washroom.png");

  
}

function setup() {
	
  createCanvas(900,500);
  database = firebase.database()

  foodObj=new Food();


  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15

  feed=createButton("Feed the pet");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
  
}


function draw() {  

 // background(46,139,87);

  foodObj.display();

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  })
   readState=database.ref('gameState');
   readState.on("value",function(data){
     gameState=data.val();
   })

  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Feed :"+lastFed+"PM",310,30)
  }
  else if(lastFed==0){
    text("Last Feed :12AM",310,30);
  }
  else{
    text("Last Feed :"+lastFed+"AM",310,50);
  }
  if(gameState!="hungry"){
    feed.hide();
    addFood.hide();
    dog.remove();
  }
  currentTime=hour();

  if(currentTime==(lastFed+1)){
    update("Playing");
    foodObj.garden();
  }
  else if(currentTime==(lastFed+2)){
   
    console.log("Current time: ",currentTime)
  console.log(lastFed)
    update("sleeping");
    foodObj.bedroom();
  }
  else if(currentTime>(lastFed+2)&&currentTime<=(lastFed+4)){
    update("bathing");
    foodObj.washroom();
  }
  
  drawSprites();
  //add styles here

}
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS)
}

function feedDog(){
  dog.addImage(happyDog);
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
function update(state){
  console.log("Inside update function")
  database.ref('/').update({
    gameState:state
  })
}





