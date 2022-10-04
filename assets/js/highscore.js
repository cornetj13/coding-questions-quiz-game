/*        GLOBAL VARIABLES        */
// Document Selectors
var showHighscoresElement = document.getElementById("show-highscores");

// Gameplay Variables
var highScores = [];

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
  if(highScores.length === 0) {
    var liTag = document.createElement("li");
    liTag.setAttribute("class", "spacing lg-font")
    liTag.textContent = "There are no scores to display.";
    showHighscoresElement.appendChild(liTag);
  }

  highScores.sort((a, b) => (a.scoreValue > b.scoreValue) ? -1 : 1)

  if(highScores.length > 5) {
    for(let i = 0; i < 5; i++) {
      var highScoreObj = highScores[i];
      var highScoreName = highScoreObj.nameValue;
      var highScoreValue = highScoreObj.scoreValue;
      var liTag = document.createElement("li");
      liTag.setAttribute("class", "spacing md-font")
      liTag.textContent = "The player " + highScoreName + " has a score of " + highScoreValue + ".";
      showHighscoresElement.appendChild(liTag);
    }
  } else {
    for(let i = 0; i < highScores.length; i++) {
      var highScoreObj = highScores[i];
      var highScoreName = highScoreObj.nameValue;
      var highScoreValue = highScoreObj.scoreValue;
      var liTag = document.createElement("li");
      liTag.setAttribute("class", "spacing md-font")
      liTag.textContent = "The player " + highScoreName + " has a score of " + highScoreValue + ".";
      showHighscoresElement.appendChild(liTag);
    }
  }
}

renderScores();