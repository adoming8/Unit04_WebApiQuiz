// select all elements
var start = document.getElementById("start");
var quiz = document.getElementById("quiz");
var question = document.getElementById("question");
var counter = document.getElementById("counter");
var timeGauge = document.getElementById("timer");
var progress = document.getElementById("progress");


// create our questions
var questions = [
    {  
        asked : "What is your name?",
        answers:['Funda','Jose','David','Alfredo'],
        correct : "Alfredo"
    },{
        asked : "What month is it?",
        answers:['October','November','January','May'],
        correct : "November"
    },
    {
        asked : "What is your fav. color?",
        answers:['blue','red','brown','purple'],
        correct : "purple"
    },
    {
        asked : "favority dish?",
        answers:['pasta','fried rice','burger','rice'],
        correct : "rice"
    }
]


var random = Math.floor(Math.random() * (questions.length));
var thisQuestion = questions[random];
var questionToAsk =  thisQuestion.asked;
question.innerHTML = questionToAsk;
var answersArray = questions[random].answers;

for(var i=0; i < answersArray.length; i++){
    
    var choices = document.getElementById("test-div");
    var choice = answersArray[i];
    var choiceElement = document.createElement('BUTTON');

    if (questionToAsk === "What is your name?" && choice === "Alfredo"){
        choiceElement.setAttribute('data-correct','true')
        choiceElement.innerHTML = choice;
        choices.appendChild(choiceElement);

    }else{
        choiceElement.setAttribute('data-correct','false')
        choiceElement.innerHTML = choice;
        choices.appendChild(choiceElement);
    }
}



