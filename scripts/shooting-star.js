//Creates shooting stars in the background 
class ShootingStar{
    constructor(position){
        //Set visual attributes
        this.position = position;
        this.active = true;
        this.tailLength = 40;
        this.radius = 3; //Radius of head of shooting star

        //Calculate velocity
        this.speed = Math.random() * 5 + 5; //Randomised
        this.velocity = new Vec2(-Math.random(), Math.random()); //Randomised but always downwards and to the left
        this.velocity.normalise();
        this.velocity.mult(this.speed);
    }

    //Draws the circles that make up the shooting star
    drawCircles(){
        //Get position and direction of tail
        const tempVel = this.velocity.clone();
        tempVel.mult(this.tailLength);
        const prevPos = this.position.sub(tempVel, true);

        //Create reference to attributes for better readability
        const r = this.radius;
        const x = this.position.x;
        const y = this.position.y;
        const pX = prevPos.x;
        const pY = prevPos.y;

        //Creates tail through a series of circles
        for (let i = 0; i < 100; i++){
            //Interpolate values
            const t = i / 100;

            //    var                   start  end  percent
            const size    = interpolate(r,     0,   t);
            const opacity = interpolate(255,   0,   t);
            const calcX   = interpolate(x,     pX,  t);
            const calcY   = interpolate(y,     pY,  t);

            //Draw circle
            push();
            fill(255, 207, 64, opacity);
            ellipse(calcX, calcY, size);
            pop();
        }
    }

    //Remove star if offscreen
    testBounds(){
        if (
            this.position.x < -1000 || //Extra 1000 is to account for length of shooting star
            this.position.x > window.innerWidth + 1000 ||
            this.position.y < -1000 ||
            this.position.y > window.innerHeight + 1000
        ){
            this.active = false;
        }
    }

    //Updates position and draws
    draw(){
        this.position.add(this.velocity);
        this.drawCircles();
        this.testBounds();
    }
}