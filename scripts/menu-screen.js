//Add functionality to start game button
$("#start-game").on("click", () => {
    //Hide menu-screen
    $("#title").addClass("transition-out");
    $(".menu").addClass("transition-out");
    draw = drawGame; //Set draw function to draw game
})

//Add functionality to alien button
$('.aliens-selector').on('click', function() {
    fallingObjType = alien;
    $('.aliens-selector').addClass('selected');
    $('.astronauts-selector').removeClass('selected');
});

//Add functionality to astronaut button
$('.astronauts-selector').on('click', function() {
    fallingObjType = astronaut;
    $('.astronauts-selector').addClass('selected');
    $('.aliens-selector').removeClass('selected');
});