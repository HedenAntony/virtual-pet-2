class Food{

   constructor(){

    this.foodStock=0;
    this.image=loadImage("images/Milk.png");
    this.lastFed;

   }
   updateFoodStock(foodStock){
     this.foodStock=foodStock;
   }

   getFedTime(lastFed){
       this.lastFed=lastFed;
   }

   deductFood(){
       if(this.foodStock>0){
           this.foodStock=this.foodStock-1;;
       }
   }
   getFoodStock(){
       return this.foodStock;

   }

   display(){
       background(46,139,87)
       var x=80,y=100;
       imageMode(CENTER);
       image(this.image,720,220,70,70);
       if(this.foodStock!=0){
           for(var i=0;i<this.foodStock;i++){
               if(i%10==0){
                   x=80
                   y=y+50
               }
               image(this.image,x,y,50,50);
               x=x+30
           }
       }
    }
    bedroom(){
        console.log("bedroom")
        background(bedroom,400,200);
    }
     garden(){
        background(garden,1000,600);
    }
      washroom(){
        background(washroom,550,500);
    }
}
 