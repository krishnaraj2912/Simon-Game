
var buttonColors = ["red", "blue", "green", "yellow"];
var gameSequence = [];
var userClickedPattern = [];
var level = 0;

function nextSequence(){
    $("#level-title").text("Level "+level);
    level+=1;
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    gameSequence.push(randomChosenColor);
    playSound(randomChosenColor);
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
}

$(document).keydown(function(event){
    if(event.key === "a")
    {
        startOver();
        nextSequence();    
    }
});

$(".btn").on("click",function(event){
    var userChosenColor = event.target.id;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
});

function playSound(color){
    var audio = new Audio("sounds/"+color+".mp3");
    audio.play();
}

function animatePress(color){
    $("#"+color).addClass("pressed");
    setTimeout(function () {
        $("#" + color).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentIdx){
    if(gameSequence[currentIdx]===userClickedPattern[currentIdx]){
        if(currentIdx+1===level){
            userClickedPattern=[];
            $("#level-title").text("Well Done");    
            setTimeout(function () {
                nextSequence();
            }, 700);
        }
    }
    else{
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");;
        }, 200);
        playSound("wrong");
        $("#level-title").text("Game Over😔, Press 'A' Key to Restart");
    }
}

function startOver(){
    level=0;
    gameSequence=[];
    userClickedPattern=[];
}