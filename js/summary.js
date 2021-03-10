// Get the score passed from the Memory Game.
const score = window.location.search.split("=")[1];

// Populate String Constants
function populateStringConstants() {
  const docTitle = document.getElementById("doc-title");
  const title = document.getElementById("title");
  const hrText = document.getElementById("hr-text");
  const scoreTag = document.getElementById("score-tag");

  docTitle.innerHTML = SUMMARY_TITLE;
  title.innerHTML = SUMMARY_TITLE;
  hrText.innerHTML = HR_TEXT;
  scoreTag.innerHTML = SCORE_TAG;
}

if (score) {
  // Dynamically display the score.
  document.querySelector("#score").innerHTML = score;
  populateStringConstants();
} else {
  // Send user back to the Game if score not found.
  location.href = "./index.html";
}

// Submit score to leaderboard
function submitToLeaderboard() {
  const nameInput = document.getElementById("input");
  const name = nameInput.value;
  if (name) {
    
    const scoreJSON = {
      name: name,
      score: score
    };

    const xhr = new XMLHttpRequest();
    const url = "https://memorygame-leaderboard.herokuapp.com/scores";
    
    const loader = document.getElementById("loader");
    loader.className = "loader";

    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
          loader.className = "";
          location.href = "./leaderboard.html";
      }
    };
    const data = JSON.stringify(scoreJSON);
    xhr.send(data);

  }
}
