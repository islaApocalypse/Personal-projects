
let Game = document.querySelector('#GameDiv');
let QuestionText = document.querySelector('#Question');
let HintText = document.querySelector('#Hint');
let GuessText = document.querySelector('#UserGuess');
let Answer = document.querySelector('#Answer');
let PointText = document.querySelector('#Points');
let ScoreText = document.querySelector('#Score');
let PlayBtn = document.querySelector('#PlayBtn');
let UserPoints = 0;
let UserScore = 0;
let PossiblePoints = 4;
const HINT_PENALTY = 1;
let Hero = '';
const MAX_HINTS = 3;
const MAX_QUESTIONS = 1;
let Hints = [];
let Questions = [];
let HintCount = 0;
let QuestionCount = 0;
let HintTimer;
let HintDelay = 10000;

let Heros = [ [ 'spider man', 'What hero is the youngest member of the Avengers?', 'Neighbourly', 'bug bite', 'web-slinger' ],
    [ 'human torch', 'Which hero can go as hot as the sun?', 'member of the fantastic 4', 'cosmic radiation', 'on fire' ], 
    [ 'daredevil', 'Which hero is a lawyer by day?', 'blind', 'loves elektra', 'best friends with Foggy' ], 
    [ 'vision', 'What hero is made from Jarvis?', 'super intelligent', 'connected to the mind stone', 'loves Wanda' ], 
    [ 'scarlet witch', 'What hero used to be a villian with Ultron?', 'chaos magic', 'lastname: Maximoff', 'from Sokovia' ], 
    [ 'hulk', 'What hero is always chased by the military?', 'big & green', 'Gamma radiation', 'smashes everything' ],
    [ 'superman', 'What hero is faster than a speeding bullet?', 'man of steel', 'kryptonite', 'loves Louis Lane' ], 
    [ 'batman', 'Which hero seems grim and has a cave?', 'parents death', 'has a butler', 'likes black' ], 
    [ 'wonder woman', 'Which heros father is Zeus?', 'lasso', 'invisable jet', 'amazonian' ], 
    [ 'cyborg', 'Which hero was made in a lab by their father?', 'S.T.A.R labs', 'part super computer', 'lastname: Stone' ], 
    [ 'flash', 'What hero can manipulate time due to their speed?', 'struck by lightning', 'super fast', 'lastname: Allen' ], 
    [ 'aquaman', 'What hero is the king of a subsurface kingdom?', 'can command the sea', 'trident', 'atlantian' ] ];

function StartGame() {
    PlayBtn.innerHTML = "Play Again";
    PlayBtn.setAttribute('onclick', 'PlayAgain();');
    Game.setAttribute('class', 'visable');
    SetRandomHero();
    // start first question
    ShowQuestion();
   /* QuestionTimer = setInterval('ShowQuestion()', 30000); <----add once I figure out how to switch Questions */
    // start hint timer
    HintTimer = setInterval('ShowHint()', HintDelay);
    PossiblePoints -= HINT_PENALTY;
} // StartGame()

function SetRandomHero() {
     // randomly select hero & question
     let RandomNum = Math.floor(Math.random() * Heros.length);
     // set the selected hero string
     Hero = Heros[RandomNum][0];
     // add question to the array
     for(let i = 1; i <= MAX_QUESTIONS; i++) {
         Questions.push(Heros[RandomNum][i]);
     }
     // add hints to the array
     for(let j = 2; j <= MAX_HINTS + 1; j++) {
         Hints.push(Heros[RandomNum][j]);
     }
}

function ShowQuestion() {
    QuestionText.innerHTML = Questions[QuestionCount];
    QuestionCount++;
    if(QuestionCount >= MAX_QUESTIONS) {
        QuestionCount = 0;
    }
} // ShowQuestion

function ShowHint() {
    HintText.innerHTML = Hints[HintCount];
    if(HintCount != 0) 
        PossiblePoints -= HINT_PENALTY;
    PointText.innerHTML = PossiblePoints + ' Points';
    HintCount++;
    if(HintCount >= MAX_HINTS) {
        clearInterval(HintTimer);
    }
} // ShowHint()

function SubmitGuess() {
    // clears hint timer 
    clearInterval(HintTimer)
    // compare the UserGuess with the Hero
    let UserGuess = GuessText.value;
    if(UserGuess === Hero) {
        Answer.innerHTML = Hero + ' was correct';
        UserScore += PossiblePoints;
        PossiblePoints = UserPoints;
    }
    else {
        Answer.innerHTML = 'Sorry wrong answer, hero was: ' + Hero;
    }
    ScoreText.innerHTML = 'Score: ' + UserScore;
} // SubmitGuess()

function PlayAgain() {
    UserPoints = 0;
    HintCount = 0;
    PossiblePoints = 4;
    GuessText.value = '';
    GuessText.focus();
    Questions = [];
    Hints = [];
    SetRandomHero();
    QuestionText.innerHTML = Questions[QuestionCount];
    HintText.innerHTML = []; // update hint!
    Answer.innerHTML = '';
    PointText.innerHTML = PossiblePoints + ' Points';
    HintTimer = setInterval('ShowHint()', HintDelay);
    PossiblePoints -= HINT_PENALTY;
} 