//Class for background of game throughout
class Background{
    constructor(planetImage1, planetImage2, planetImage3, planetImage4){
        //Create containers for background elements
        this.stars = [];
        this.shootingStars = [];
        this.planets = [];

        //Create stars
        //This can be done intially as no new stars are created during the game
        this.createStars();

        //Set images
        this.planetImage1 = planetImage1;
        this.planetImage2 = planetImage2;
        this.planetImage3 = planetImage3;
        this.planetImage4 = planetImage4;

        //Set starting positions of planets
        this.p1 = new Vec2(0.15, 0.15)
        this.p2 = new Vec2(0.25, 0.65)
        this.p3 = new Vec2(0.6, 0.3)
        this.p4 = new Vec2(0.75, 0.75)
        this.planets = [this.p1, this.p2, this.p3, this.p4]
    
    }

    //Creates stars
    createStars(){
        const nStars = 200; //Number of stars
        for (let i = 0; i < nStars; i++){
            //Randomise position
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight;
            const position = new Vec2(x, y);

            //Randomise size
            const size = Math.random() * 6;

            //Add star to array
            this.stars.push(new Star(position, size));
        }
    }

    //Creates shooting stars
    createShootingStar(){
        if (Math.random() < 0.007){ //Creation of shooting stars is random
            const x = Math.random() * window.innerWidth; //Randomise position across the top of the screen
            const y = 0; //Remains constant as they fall downards
            const position = new Vec2(x, y); //Set position
            this.shootingStars.push(new ShootingStar(position)); //Add shooting star to array
        }
    }
    
    //Updates the stars and shootingstars
    drawStars(){

        //Iterate over each star
        this.stars.forEach(function(star){ 
            star.draw(); //Draw
        });

        //Itearte over each shooting star
        this.shootingStars.forEach((shootingStar) => { 
            shootingStar.draw(); //Draw

            //Remove shooting star if offscreen
            if (!shootingStar.active){
                this.shootingStars.splice(this.shootingStars.indexOf(shootingStar), 1); //Remove from array
            }
        });

        //Create new shooting star
        this.createShootingStar();
    }
    
    //Draws planets and handles their movement
    drawPlanets(){
        //Create reference to positions
        const p1 = this.p1
        const p2 = this.p2
        const p3 = this.p3
        const p4 = this.p4

        this.planets.forEach((planet) =>{
            planet.add(new Vec2(-0.0001, 0.0001)) //Move planets at constant speed
        });

        //Get dimensions of window
        const vw = window.innerWidth;
        const vh = window.innerHeight;

        //Size modifiers
        const sizeMult = vw * 0.0005
        const sizeAdd = 50

        //Draws the planets
        image(this.planetImage1, p1.x * vw, p1.y * vh, this.planetImage1.width * sizeMult + sizeAdd, this.planetImage1.height * sizeMult + sizeAdd);
        image(this.planetImage2, p2.x * vw, p2.y * vh, this.planetImage2.width * sizeMult + sizeAdd, this.planetImage2.height * sizeMult + sizeAdd);
        image(this.planetImage3, p3.x * vw, p3.y * vh, this.planetImage3.width * sizeMult + sizeAdd, this.planetImage3.height * sizeMult + sizeAdd);
        image(this.planetImage4, p4.x * vw, p4.y * vh, this.planetImage4.width * sizeMult + sizeAdd, this.planetImage4.height * sizeMult + sizeAdd);
    }

    //Update background
    update(){
        this.drawStars();
        this.drawPlanets();
    }
}