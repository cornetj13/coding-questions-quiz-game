/*        GLOBAL VARIABLES        */
//
// Document Selectors
var showHighscoresElement = document.getElementById("show-highscores");

// Gameplay Variables
var highScores = [];

/*        FUNCTIONS        */
//
// Load Scores Function - a function for loading the scores array out of local storage and saving it in an array.
function loadScores() {
  var storedScores = JSON.parse(localStorage.getItem("scores"));

  if (storedScores !== null) {
    highScores = storedScores;
  }
}

// Render Scores Function - a function for displaying the top 5 highest scores, from highest to lowest. The function will display a no scores message if there are no previous scores, and all the available scores (in descending order) if there are less than 5.
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

/*        MAIN CODE        */
//
// Render scores on page load.
renderScores();