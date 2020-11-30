class Food{
    constructor(){
        var foodStock;
      //  var lastFed;

        this.image = loadImage("images/Milk.png");
    }

    

    getFoodStock(){
        var foodStockRef = database.ref("Food");
        foodStockRef.on("value",(data)=>{
            foodStock = data.val();
            //console.log("test", foodStock, foodS);
        })
        return(foodStock);
    }

    updateFoodStock(foodS){
        //console.log("foodS",foodS);
        database.ref("/").update({
            Food: foodS
        });
    }

    bedroom(){
        background(bedroom,500,500);
    }

    garden(){
        background(garden,500,500);
    }

    washroom(){
        background(washroom,500,500);
    }

    display(){
        var x=80,y=100;

        imageMode(CENTER);
        image(this.image,300,310,70,70);
        if(foodStock!=0){
            for(var i=0;i<foodStock;i++){
              if(i%10 == 0){
                x = 80;
                y=y+50;
              }
              image(this.image,x,y,50,50);
              x=x+30;  
            }
        }
        
    }



}