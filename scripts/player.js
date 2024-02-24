//Class for drawing/controlling player

class Player {
    constructor(position, radius, fallingObjects, imageURL) {
        //Load black hole image
        this.image = loadImage(imageURL);
        this.w = radius * 3;
        this.h = radius * 3;
        this.opacity = 255;

        //Movement
        this.rotateSpeed = 1;
        this.position = position;
        this.pullRadius = radius * 3; //The distance at which the blackhole pulls objects
        this.speed = window.innerWidth/100;

        //Create reference to falling objects
        this.fallingObjects = fallingObjects;

        //Intiate player lives
        this.lives = 3;
    }

    //Main update function
    update() {
        this.getInput();
        this.pullObjects();
        this.draw();
    }

    //Handle user input
    getInput() {
        //Temporary position variables needed for collision
        let newX = this.position.x;
        let newY = this.position.y;

        //  Detect key press         Move player 
        if (keyIsDown(LEFT_ARROW))  { newX -= this.speed }
        if (keyIsDown(RIGHT_ARROW)) { newX += this.speed }
        if (keyIsDown(UP_ARROW))    { newY -= this.speed }
        if (keyIsDown(DOWN_ARROW))  { newY += this.speed }

        //New position is validated in each axis before being set
        if (this.testVerticalBounds(newY)) {
            this.position.y = newY;
        }
        if (this.testHorizontalBounds(newX)) {
            this.position.x = newX;
        }
    }

    //Collision vertically
    testVerticalBounds(y) {
        //Temp variable
        const h = this.h; 
        const screenHeight = window.innerHeight; 

        const top = y - h / 2; //Get top of player sprite
        const bottom = y + h / 2; //Get bottom of player sprite
        if (top < 0 || bottom > screenHeight) { //Checks if player sprite is out of bounds
            return false;
        }
        return true;
    }

    //Collision horizontally
    testHorizontalBounds(x) {
        //Temp variable
        const w = this.w;  
        const screenWidth = window.innerWidth;
        
        const left = x - w / 2; //Get left of player sprite
        const right = x + w / 2; //Get right of player sprite
        if (left < 0 || right > screenWidth) { //Checks if player sprite is out of bounds
            return false;
        }
        return true;
    }

    //Draws the blackhole sprite
    draw() {
        push();
        
        //Reference to dimensions/position for better readability
        const w = this.w;
        const h = this.h;
        const x = this.position.x;
        const y = this.position.y;

        //Rotate image about its center
        translate(x, y);
        rotate(this.rotateSpeed * frameCount / 20);

        //Apply opacity
        tint(255, this.opacity)

        //Draw image
        image(this.image, -w / 2, -h / 2, w, h);
        
        pop();
    }

    //Fades out the blackhole
    //Used when the game enmds
    fadeOut(){
        this.opacity -= 10;
        this.rotateSpeed = 0;
        this.draw();
    }

    //Pulls objects towards the player
    pullObjects() {
        for (let object of this.fallingObjects) { //Iterate over all objects
            const vecToObj = this.position.sub(object.position, true); //Create vec to object
            const distToObj = vecToObj.length(); //Get distance to object

            //If object is within pull radius, pull it towards the player
            if ( distToObj < this.pullRadius) {
                //Calculate new object speed
                const v = vecToObj.clone();
                v.normalise();
                v.mult(this.speed * 1.5);

                //Set object speed
                object.velocity = v;

                //Remove acceleration
                object.accel = new Vec2(0, 0);
            }

            //If the object is inside the blackhole sprite, remove it
            if (distToObj <= 35) {
                object.disappears(this)
            }
        }
    }
}