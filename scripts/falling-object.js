//Parent class for all falling objects
class FallingObject {
    constructor(position, velocity, image) {
        this.active = true;
        
        //Image variables
        this.image = image
        this.scale = 0.1
        this.w = this.image.width * this.scale;
        this.h = this.image.height * this.scale;
        this.opacity = 255

        //Motion variables
        this.position = position;
        this.velocity = velocity;
        this.accel = new Vec2(0, 0.05)
    }

    draw() {
        //Refence to dimensions/position for better readability
        const x = this.position.x - this.w/2;
        const y = this.position.y - this.h/2;
        const w = this.w
        const h = this.h

        
        //Draws the object        
        push();
        tint(255, this.opacity); //Apply opacity
        image(this.image, x, y, w, h); 
        pop();
    }

    //Checks if the object if offscreen
    offScreen() {
        if (
            this.position.x < 0      ||
            this.position.x > width  ||
            this.position.y < 0      ||
            this.position.y > height
        ) {
            return true;
        }
        return false;
    }

    //Fades out the object
    fadeOut(){
        this.opacity -= 10;
        this.draw();
    }
}

//Child class used for grenades
class NegativeItem extends FallingObject {
    constructor(position, velocity, image) {
        super(position, velocity, image);
    }

    //Removes the object
    disappears(player) {
        this.active = false
        player.lives --; //Decrament lives
    }

    //Updates the object
    update() {
        this.position.add(this.velocity);
        this.velocity.add(this.accel);
        this.draw();

        if (this.offScreen()) {
            this.active = false;
        }
    }
}

//Child class used for astronaut/aliens
class PositiveItem extends FallingObject {
    constructor(position, velocity, image) {
        super(position, velocity, image);
    }

    disappears(player) {
        this.active = false;
        score ++; //Increments score
    }

    //Updates the object
    update() {
        this.position.add(this.velocity);
        this.velocity.add(this.accel);
        this.draw();

        if (this.offScreen()) {
            this.active = false;
            missedItems ++ //Increments missed items
        }
    }
}