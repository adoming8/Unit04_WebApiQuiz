// Questions
let questions = [{
        question : "Which event occurs when the user clicks on an HTML element?",
        choiceA : "onmouseclick",
        choiceB : "onmouseover",
        choiceC : "onclick",
        correct : "C"
    },{
        question : "How do you call a function named 'myFunction'?",
        choiceA : "call function myFunction()  ",
        choiceB : "call myFunction()",
        choiceC : "myFunction()  ",
        correct : "C"
    },{
        question : "Which operator is used to assign a value to a variable?",
        choiceA : "*",
        choiceB : "=",
        choiceC : "x",
        correct : "B"
    }
];

// select all elements
const startdiv = document.getElementById("start");

const quiztempdiv = document.getElementById("quiztemplate");
const questiondiv = document.getElementById("question");
const choicesdiv = document.getElementById("choices");


// Quiz questions & answers Section
var renderQsdiv = document.getElementById("renderQsdiv");

// const quiz = document.getElementById("quiz");
const qImg = document.getElementById("qImg");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");
const highscoresDiv = document.getElementById("highscoresDiv");
const gameOverDiv= document.getElementById("gameOverDiv");
const highScoreList= document.getElementById("highScoreList");


// Initial Variable deff.

const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 5; // 5s
const gaugeWidth = 150; // 150px
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;
let scorePerCent = 0;
let scores = []


// Quiz functions 
initViews();

function initViews() { 
    // hidding initial display of unnecessary divs @ beggining
    quizPanel.setAttribute("style", "display: none;");
    quiztempdiv.setAttribute("style", "display: none;");
    startdiv.setAttribute("style", "display: none;");
    gameOverDiv.setAttribute("style", "display: none")
    highscoresDiv.setAttribute("style", "display: none");

    getScoresLS = localStorage.getItem("scoresLS");
    scores = getScoresLS ? JSON.parse(getScoresLS): [];

};

function startQuiz(){
    gif.setAttribute("style", "display: none;");
    // quizPanel.setAttribute("style", "display");
    startdiv.setAttribute("style", "display");

};

function renderQs(){
    startdiv.setAttribute("style", "display: none;");
    quizPanel.setAttribute("style", "display");
    quiztempdiv.setAttribute("style", "display");

    let q = questions[runningQuestion];
    question.innerHTML = `<p><h3>${q.question}</h3></p>`;
    // qImg.innerHTML = "<img src="+ q.imgSrc +">";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
};

// render progress
function renderProgress(){
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
};

// counter render

function renderCounter(){
    if(count <= questionTime){
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    }else{
        count = 0;
        // change progress color to red
        answerIsWrong();
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQs();
        }else{
            // end the quiz and show the score
            clearInterval(TIMER);
            scoreRender();
        }
    }
};

// checkAnwer

function checkAnswer(answer){
    if( answer == questions[runningQuestion].correct){
        // answer is correct
        score++;
        // change progress color to green
        answerIsCorrect();
    }else{
        // answer is wrong
        // change progress color to red
        answerIsWrong();
    }
    count = 0;
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQs();
    }else{
        // end the quiz and show the score
        clearInterval(TIMER);
        scoreRender();
    }
};

// answer is correct
function answerIsCorrect(){
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
};

// answer is Wrong
function answerIsWrong(){
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
};

// score render
function scoreRender(){
    questiondiv.setAttribute("style", "display: none;");
    choices.setAttribute("style", "display: none;");
    progress.setAttribute("style", "display: none;");
    timer.setAttribute("style", "display: none;");
    quizPanel.setAttribute("style", "display: none;");
    gameOverDiv.setAttribute("style", "display")


    scoreDiv.style.display = "block";
    
    // calculate the amount of question percent answered by the user
    scorePerCent = Math.round(100 * score/questions.length);
 
    window.scorePerCent = scorePerCent
    
    // choose the image based on the scorePerCent
    let img = (scorePerCent >= 80) ? "img/5.png" :
              (scorePerCent >= 60) ? "img/4.png" :
              (scorePerCent >= 40) ? "img/3.png" :
              (scorePerCent >= 20) ? "img/2.png" :
              "img/1.png";
    
    scoreDiv.innerHTML = "<img src="+ img +">";
    scoreDiv.innerHTML += "<p>"+ scorePerCent +"%</p>";
}

// highscore render
function highscoreRender(){
    playerName = document.getElementById("playerInitials").value.trim();
    strScore = window.scorePerCent  ;
    // console.log(playerName);
    // console.log(strScore);
    //add to scores[]
    scores.push([playerName, strScore ]);
    console.log(scores);

    // local storage
    localStorage.setItem('scoresLS', JSON.stringify(scores));

   
    var highscoreList = document.getElementById("highScoreList");
    highscoreList.innerHTML = "";

    // Render a new li for each score
    for (var i = 0; i < scores.length; i++) {
        var score = scores[i];
        // console.log(scores[i] + " " + score);
        var li = document.createElement("li");
        li.textContent = [i+1] + ". " + scores[i][0].toString().toUpperCase() + " - " + scores[i][1];
        // li.setAttribute("data-index", i);
        highscoreList.appendChild(li);
    }
};



// DOM EventListners

$("#quizchallange").on("click", function(event) {  
    tabdiv.setAttribute("style", "display: none;");
    // console.log('hello');
    startQuiz()
  });

$("#start").on("click", function(event) {  
    // console.log('hello');
    renderQs();
    quiztempdiv.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter,1000); // 1000ms = 1s

  });

$("#submitScore").on("click", function() {  
    event.preventDefault();

    gameOverDiv.setAttribute("style", "display: none")
    scoreDiv.setAttribute("style", "display: none")
    highscoresDiv.setAttribute("style", "display");
    
    highscoreRender()
  });

$("#home").on("click", function() {   
    quizPanel.setAttribute("style", "display: none;");
    quiztempdiv.setAttribute("style", "display: none;");
    startdiv.setAttribute("style", "display: none;");
    gameOverDiv.setAttribute("style", "display: none")
    highscoresDiv.setAttribute("style", "display: none");
});

$("#highscorebtn").on("click", function() {  
    gif.setAttribute("style", "display: none;");
    quizPanel.setAttribute("style", "display: none;");
    quiztempdiv.setAttribute("style", "display: none;");
    startdiv.setAttribute("style", "display: none;");
    gameOverDiv.setAttribute("style", "display: none")

    // highscoreRender();

});