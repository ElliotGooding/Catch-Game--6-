//Intialise global vars
let
fallingObjects, 
player, 
astronaut, 
alien,
grenade, 
score, 
missedItems;

let spawnRate = 0.005; //Inital spawn rate 

//Template leaderboard
const leaderboard = [
    {name: "Alex"    , score: 100},
    {name: "Bob"     , score: 50 },
    {name: "Charlie" , score: 25 },
    {name: "David"   , score: 10 },
    {name: "Eve"     , score: 5  },
    {name: "Frank"   , score: 2  },
    {name: "Grace"   , score: 1  }
]

//Updates all the falling objects
function updateFallingObjects() {
    fallingObjects.forEach(function(object) { //Iterates over each object
        object.update(); //Updates the object

        //Removes the object if it is nolonger in use
        if (!object.active) {
            fallingObjects.splice(fallingObjects.indexOf(object), 1);
        }
    });
}

//Fades out all falling objects during game over
function fadeOutFallingObjects() {
    fallingObjects.forEach(function(object) {
        object.fadeOut(); 
    });
}

function createObject() {
    spawnRate += 0.00003 //Increase spawn rate every frame to increase difficulty
    if (Math.random() < spawnRate && fallingObjects.length < 3) { // Then create a new object
        const x = Math.random() * window.innerWidth; //Picks a random position on the screen to spawn from
        if (Math.random() > 0.2){ //Pick which type of object to create
            fallingObjects.push(new PositiveItem(new Vec2(x, 0), new Vec2(0, 5), fallingObjType)); //Creates alien/astronaut
        } else {
            fallingObjects.push(new NegativeItem(new Vec2(x, 0), new Vec2(0, 5), grenade)); //Creates grenade
        }
    }
}

//P5 SPECIFIC FUNCTION
function preload() {
    draw = initialDraw; //Sets the initial draw function 

    //Load all images
    astronaut       =  loadImage("assets/images/astronaut.png");
    alien           =  loadImage("assets/images/alien.png");
    grenade         =  loadImage("assets/images/grenade.png");
    const planet1   =  loadImage("assets/images/planet1.png");
    const planet2   =  loadImage("assets/images/planet2.png");
    const planet3   =  loadImage("assets/images/planet3.png");
    const planet4   =  loadImage("assets/images/planet4.png");

    //Initalise game variables
    fallingObjType = alien;
    fallingObjects = [];
    score = 0
    missedItems = 0

    player = new Player(new Vec2(200, 500), 50, fallingObjects, "assets/images/blackhole.png");
    background = new Background(planet1, planet2, planet3, planet4);
}

//P5 SPECIFIC FUNCTION
function setup() {
    //Creates canvas
    const w = window.innerWidth;
    const h = window.innerHeight;
    const canvas = createCanvas(w, h);
    canvas.parent("game-container");

    noStroke(); //Removes stroke from shapes
}

//Draw function for background during menu screen
function initialDraw(){
    clear();
    background.update();
}

//Draw function for background during game
function drawGame() {
    //Draw game
    clear();
    background.update();
    player.update();
    updateFallingObjects();
    createObject();

    //Check for game over
    if (player.lives <= 0 || missedItems >= 5){
        draw=drawGameOver //Set draw function to draw the game over screen
        setTimeout(() => { //timeout needed for fade out animation
            gameOver(); //Ends game 
        }, 1000);
    }

    //Shows stats
    fill(255,255,255)
    text("score " + score, 20, 20)
    text("missed " + missedItems, 20, 40)
    text("lives " + player.lives, 20, 60)
}

//Draw function for background during game over screen
function drawGameOver(){
    clear();
    background.update(); //Maintain background movement during game over screen

    //Fade out animation 
    player.fadeOut();
    fadeOutFallingObjects(); 
}

