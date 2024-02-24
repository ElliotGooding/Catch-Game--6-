//Creates stars in the background
class Star{
    constructor(position, size){
        this.position = position;
        this.speed = size**2.5 * 0.0005; //Determine speed from size for parallax effect
        this.velocity = new Vec2(-this.speed, this.speed); //Set velocity from speed
        this.radius = size;

        //Initalise opacity
        this.opacity = Math.random() * 255;
        this.deltaOpacity = Math.random() * 5;
    }

    //Changes opacity to create "twinkling" effect
    updateOpacity(){
        //Switches direction of opacity change if out of range
        if (this.opacity < 0 || this.opacity > 255){
            this.deltaOpacity *= -1;
        }

        //updates opacity
        this.opacity += this.deltaOpacity; 
    }

    updatePosition(){
        //Moves a star to the other side of the screen if it goes offscreen
        this.position.add(this.velocity);
        if (this.position.x < 0){
            this.position.x = window.innerWidth;
        }
        if (this.position.y < 0){
            this.position.y = window.innerHeight;
        }
        if (this.position.x > window.innerWidth){
            this.position.x = 0;
        }
        if (this.position.y > window.innerHeight){
            this.position.y = 0;
        }
    }

    draw(){
        //Update star
        this.updateOpacity();
        this.updatePosition();
    
        //Draws the star            
        push();
        fill(255, 255, 255, this.opacity);
        ellipse(this.position.x, this.position.y, this.radius);
        pop();
    }
}