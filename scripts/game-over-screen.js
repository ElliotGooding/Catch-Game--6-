//Get position of score in leaderboard
function calculatePosition(){
    for (lbPlayer of leaderboard){
        if (score > lbPlayer.score){
            return leaderboard.indexOf(lbPlayer);
        }
    }
    return leaderboard.length;
}

//Return suffix of a passed in number
function getSuffix(num){
    if (num === 1){
        return "st";
    } else if (num === 2){
        return "nd";
    } else if (num === 3){
        return "rd";
    } else {
        return "th";
    }
}

//Creates the leaderboard row with each attribute
function createLeaderboardRow(lbPlayer, position){
    //Create row attribute
    const row = document.createElement("div");
    row.classList.add("score-row");

    //Create child elements for each column
    const pos = document.createElement("div");
    const name = document.createElement("div");
    const score = document.createElement("div");

    //Get suffix of position
    let suffix = getSuffix(position);

    //Set text inside each column of the row
    pos.innerHTML = position + "<span>" + suffix + "</span>";
    name.innerHTML = lbPlayer.name;
    score.innerHTML = lbPlayer.score + "<span>points</span>";

    //Add necessary classes to each column
    pos.classList.add("score-position");
    name.classList.add("score-name");
    score.classList.add("score-score");

    //Add each attribute to the row
    row.appendChild(pos);
    row.appendChild(name);
    row.appendChild(score);

    //Create an empty row if the player is null
    if(lbPlayer.name === null){
        row.classList.add("empty-row");
        name.setAttribute("id", "new-name");
    }

    //Add row to leaderboard
    $(".scoreboard").append(row);
}

//Creates the leaderboard
function createLeaderboard(){
    $(".scoreboard").empty(); //Clears the previous leaderboard
    let pos = 0; //Counter for current pos
    let createdNewRow = false; //Flag to check if a new row has been created

    //Iterate over each leaderboard player
    for (let i = pos; i < leaderboard.length; i++){ 
        pos ++; //Increment counter
        const lbPlayer = leaderboard[i]; //Get reference to player

        //Checks if the player has a higher score than the current score
        if (lbPlayer.score < score && !createdNewRow){ 
            createLeaderboardRow({name: null, score: score}, pos); //Creates a new empty row in the leaderboard
            createdNewRow = true; 
        }
        createLeaderboardRow(lbPlayer, pos); //Creates a new row in the leaderboard for the current player
    }

    //Happens if the player has the new lowest score
    if (!createdNewRow){
        createLeaderboardRow({name: null, score: score}, pos+1);
    }
}


//Show game over screen when called
function showGameOverScreen(){
    //Transition in title
    $(".game-over-screen").addClass("transition-in");
    $("#game-over-title").addClass("transition-in");

    setTimeout(() => {
        $('.scoreboard').addClass('transition-in'); //Show leaderboard
        $("#name-input").addClass("transition-in"); //Show name input
        $("#submit-name").addClass("transition-in"); //Show name submission
    }, 2000);

    setTimeout(() => {
        $(".restart-game-button").addClass("transition-in"); //Show restart button
    }, 5000);
}

//Load game over screen
function gameOver(){
    createLeaderboard();
    showGameOverScreen();
}

//Scroll to the empty row in the leaderboard
function scrollToPos(){
    document.querySelector(".empty-row").scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center"
    });
}

function updateLeaderboard(){
    const lbElement = document.querySelector(".scoreboard"); //Get reference to leaderboard

    //insert player object into leaderboard array
    const name = $("#name-input").val();
    leaderboard.splice(calculatePosition(), 0, {name: name, score: score});
    $("#new-name").html(name); //Sets the new name in the empty row

    //Updates the position of players
    for (let pos=0; pos<leaderboard.length; pos++){
        const row = lbElement.children[pos];
        row.children[0].innerHTML = pos+1 + "<span>" + getSuffix(pos+1) + "</span>";
    }
}

//Expand the new row and remove name submission elements
function showUpdatedLB(){
    $("#submit-name").removeClass("transition-in");
    $("#name-input").removeClass("transition-in");
    $(".empty-row").addClass("expand");
}
//validates if an acceptable name is entered 
function validate(){
    value = $("#name-input").val().trim();
    if (
        (value == "")        ||
        (value == null)      || 
        (value == undefined) ||
        (value.length > 20)  ||
        (value.length < 2)   || 
        (!isNaN(value))  //testing length and acceptable characters/answers
    ) {
        return false;
    } else {
        return true
    }
}

//Adds functionality to submit name button
$("#submit-name").click(function(){
    if (validate()){ //Validates input
        scrollToPos(); //Scroll to position in lb
        updateLeaderboard();
        setTimeout(showUpdatedLB, 500);
    } else {
        //Make the name input box red
        $("#name-input").addClass("error"); 
        setTimeout(() => {
            $("#name-input").removeClass("error");
        }, 1500);
    }
});

//Adds functionality to restart button
$(".restart-game-button").click(function(){
    //Transition out the game-over-screen
    $(".game-over-screen").removeClass("transition-in");
    $("#game-over-title").removeClass("transition-in");
    $('.scoreboard').removeClass('transition-in');
    $(".restart-game-button").removeClass("transition-in");

    //Re-initalise variables
    draw = drawGame;
    fallingObjects = [];
    score = 0
    spawnRate = 0.01;
    missedItems = 0
    player = new Player(new Vec2(200, 500), 50, fallingObjects, "assets/images/blackhole.png");
    player.lives = 3;
});