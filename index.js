var buttomColours = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

function nextSequence(){
    level++;
    $("h1").text("Level "+level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttomColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);

    userClickedPattern = [];
}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        if(gamePattern.length === userClickedPattern.length){
            setTimeout(()=>nextSequence(),1000);
        }
    }
    else{
        playSound('wrong');

        $("body").addClass('game-over');
        setTimeout(()=>$("body").removeClass('game-over'),400);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}

function playSound(name){
    var song = new Audio("./sounds/"+name+".mp3");
    song.play(); 
}

function animatePress(currentColour){
    $("."+currentColour).addClass('pressed')

    setTimeout(()=>$("."+currentColour).removeClass('pressed'),100);
}

$(".btn").click(function(){
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
})

$(document).keydown(function(){
    if(!started){
        nextSequence();
        started = true;
    }
});