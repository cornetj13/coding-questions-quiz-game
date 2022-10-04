/*        GLOBAL VARIABLES        */
// Document Selectors
var loadScoresElement     = document.getElementById("load-highscores");
var timerElement          = document.getElementById("timer-seconds");
var playElement           = document.getElementById("play-button");
var questionHeaderElement = document.getElementById("questions-header");
var questionElement       = document.getElementById("questions-paragraph");
var answersElement        = document.getElementById("answers-area");
var afterAnswerElement    = document.getElementById("after-answer-area");
var guessResultElement    = document.getElementById("guess-result");
var funFactElement        = document.getElementById("fun-fact");
var answerButtonElement1  = document.getElementById("button-1");
var answerButtonElement2  = document.getElementById("button-2");
var answerButtonElement3  = document.getElementById("button-3");
var answerButtonElement4  = document.getElementById("button-4");
var highscoreElement      = document.getElementById("highscore-area");
var scoreDisplayElement   = document.getElementById("display-score");
var scoreNameElement      = document.getElementById("highscore-name");
var submitScoreElement    = document.getElementById("submit");
var showHighscoresElement = document.getElementById("show-highscores");

// Gameplay Variables
var timerInterval;
var secondsLeft;
var questionCount;
var isPaused;
var randomIndex;
var highScores = [];

// Information Variables
var questionsArray = [
  "Which president is the only president to serve more than 2 terms in office?",
  "Which president played saxophone on national TV while on the campain trail?",
  "Which president was an actor in several major productions before serving in office?",
  "Which president was an owner of a baseball team?",
  "Which president served for just 31 days, the shortest term ever served by a US president?",
  "Which president went on to become the Chief Justice of the Supreme Court?"
]
var funFactArray = [
  "FDR had just began serving his FOURTH term in office when he passed away.",
  "Clinton is NOT the only president to play the saxophone, Richard Nixon also played. However, Nixon never played on national TV.",
  "While celebrity politicians is a popular trend nowadays, Reagan was the first president to be known from the silver screen before his presidency.",
  "Bush Jr. claimed he purchased the team to build his national profile, and not only be known as an former president's son.",
  "Poor Harrison died exactly one month after his inauguration from pneumonia, making him the first US president to die in office.",
  "Not only was Taft the only person to hold the top position in both the executice and judicial branches of the United States government, he NEVER got stuck in a bathtub in the White House!"
]
var answersArray = [
  ["Franklin D. Roosevelt", "Abraham Lincoln", "George Washington", "Harry S. Truman"],
  ["Bill Clinton", "Barack Obama", "Donald Trump", "Jimmy Carter"],
  ["Ronald Reagan", "John F. Kennedy", "Gerald Ford", "George H. W. Bush"],
  ["George W. Bush", "Donald Trump", "Lyndon B. Johnson", "Dwight D. Eisenhower"],
  ["William Henry Harrison", "Warren G. Harding", "John Tyler", "Martin Van Buren"],
  ["William Howard Taft", "Andrew Jackson", "Theodore Roosevelt", "Grover Cleveland"]
]

/*        FUNCTIONS        */
// Load Scores Function
function loadScores() {
  var storedScores = JSON.parse(localStorage.getItem("scores"));

  if (storedScores !== null) {
    highScores = storedScores;
  }
}

// Render Scores Function
function renderScores() {
  loadScores();
  for(let i = 0; i < highScores.length; i++) {
    var highScoreObj = highScores[i];
    var highScoreName = highScoreObj.nameValue;
    var highScoreValue = highScoreObj.scoreValue;
    showHighscoresElement.textContent = "The player " + highScoreName + " has a score of " + highScoreValue + ".";
  }
}

// Store Score Function
function storeScores(scores) {
  var scoresToStore = JSON.stringify(scores);
  localStorage.setItem("scores", scoresToStore);
}

// Submit Score Function
function submitScore(event) {
  event.preventDefault();
  submitScoreElement.disabled = true;
  var cleanScoreName = scoreNameElement.value.trim();
  highScores.push({
    nameValue:  cleanScoreName,
    scoreValue: secondsLeft,
  });
  storeScores(highScores);
}

// Function for timer.
function setTime() {
  timerElement.textContent = "Timer: " + secondsLeft + " ";

  // Sets interval in variable.
  timerInterval = setInterval(function() {
    if(!isPaused) {
      secondsLeft--;
      timerElement.textContent = "Timer: " + secondsLeft + " ";
    }

    if(secondsLeft === 0) {
      // Stops execution of action at set interval.
      clearInterval(timerInterval);
      // Calls function to go to score page.
      endGame();
    }
  }, 1000);
}

// Function for correct guess.
function correctGuess() {
  isPaused = true;
  afterAnswerElement.setAttribute("style", "display: block;");
  guessResultElement.innerHTML = '<span class="correct">Correct!</span>';
  funFactElement.textContent = funFactArray[questionCount];
  answerButtonElement1.disabled = true;
  answerButtonElement2.disabled = true;
  answerButtonElement3.disabled = true;
  answerButtonElement4.disabled = true;
  setTimeout(timeBeforeNext, 6000);
}

// Function for incorrect guess.
function incorrectGuess() {
  isPaused = true;
  secondsLeft = secondsLeft - 9;
  afterAnswerElement.setAttribute("style", "display: block;");
  guessResultElement.innerHTML = '<span class="incorrect">Incorrect.</span> The correct answer is: ' + answersArray[questionCount][0] + '.';
  funFactElement.textContent = funFactArray[questionCount];
  answerButtonElement1.disabled = true;
  answerButtonElement2.disabled = true;
  answerButtonElement3.disabled = true;
  answerButtonElement4.disabled = true;
  setTimeout(timeBeforeNext, 6000);
}

// Function for pausing game for guess status.
function timeBeforeNext() {
  questionCount++;
  askQuestion();
  isPaused = false;
  afterAnswerElement.setAttribute("style", "display: none;");
  answerButtonElement1.disabled = false;
  answerButtonElement2.disabled = false;
  answerButtonElement3.disabled = false;
  answerButtonElement4.disabled = false;
}

// Function for end of game.
function endGame() {
  timerElement.textContent = "Timer: " + secondsLeft + " ";
  clearInterval(timerInterval);
  answersElement.setAttribute("style", "display: none;");
  afterAnswerElement.setAttribute("style", "display: none;");
  questionHeaderElement.setAttribute("style", "display: none;");
  questionElement.setAttribute("style", "display: none;");
  highscoreElement.setAttribute("style", "display: flex; flex-direction: column;");
  playElement.setAttribute("style", "display: block;");
  scoreDisplayElement.textContent = "Your score is: " + secondsLeft;
  submitScoreElement.addEventListener("click", submitScore)
  playElement.textContent = "Play again"
  playElement.addEventListener("click", playGame);
}

// Function for game.
function askQuestion() {
  answersElement.setAttribute("style", "display: grid; grid-template-columns: 1fr 1fr; gap: 2em;");
  if(questionCount < questionsArray.length) {
    randomIndex1 = Math.floor(Math.random() * 100);
    randomIndex2 = Math.floor(Math.random() * 100);
    randomIndex3 = Math.floor(Math.random() * 100);
    randomIndex4 = Math.floor(Math.random() * 100);
    answerButtonElement1.setAttribute("style", "order: " + randomIndex1 + ";")
    answerButtonElement2.setAttribute("style", "order: " + randomIndex2 + ";")
    answerButtonElement3.setAttribute("style", "order: " + randomIndex3 + ";")
    answerButtonElement4.setAttribute("style", "order: " + randomIndex4 + ";")
    questionHeaderElement.textContent = "Question " + (questionCount + 1) + ":";
    questionElement.textContent = questionsArray[questionCount];
    answerButtonElement1.textContent = answersArray[questionCount][0];
    answerButtonElement2.textContent = answersArray[questionCount][1];
    answerButtonElement3.textContent = answersArray[questionCount][2];
    answerButtonElement4.textContent = answersArray[questionCount][3];
  } else {
    endGame();
  }
}

// Function for play button.
function playGame() {
  submitScoreElement.disabled = false;
  scoreNameElement.value = "";
  playElement.setAttribute("style", "display: none;");
  highscoreElement.setAttribute("style", "display: none;");
  questionHeaderElement.setAttribute("style", "display: block;");
  questionElement.setAttribute("style", "display: block;");
  secondsLeft = 100;
  questionCount = 0;
  isPaused = false;
  loadScores();
  setTime();
  askQuestion();
}

/*        MAIN CODE        */

// Hidden elements at start.
answersElement.setAttribute("style", "display: none;");
afterAnswerElement.setAttribute("style", "display: none;");
highscoreElement.setAttribute("style", "display: none;");

// Event listeners for game.
playElement.addEventListener("click", playGame);
loadScoresElement.addEventListener("click", renderScores);

answerButtonElement1.addEventListener("click", correctGuess);
answerButtonElement2.addEventListener("click", incorrectGuess);
answerButtonElement3.addEventListener("click", incorrectGuess);
answerButtonElement4.addEventListener("click", incorrectGuess);
