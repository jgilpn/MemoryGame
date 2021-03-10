function getScore() {
    const xhttp = new XMLHttpRequest();
    xhttp.open(
        "GET", 
        "https://memorygame-leaderboard.herokuapp.com/scores/latest", 
        true
    );
    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            let res = JSON.parse(this.response)[0][0];
            document.getElementById("name").innerHTML = res.name;
            document.getElementById("score").innerHTML = res.score;
            document.getElementById("rank").innerHTML = res.rank;
        }
    };
}

function displayTopFive(scores) {
    const orderedList = document.getElementById("top-five");
    let count = 0;
    scores.forEach(score => {
        count += 1;
        const scoreList = document.createElement("div");
        scoreList.className = "leaderboard-item"
        scoreList.innerHTML = `<div>${count}. ${score.name}</div>`;
        scoreList.innerHTML += `<div>${score.score}</div>`;
        orderedList.appendChild(scoreList)
    });
}

function getTopScores() {
    const xhttp = new XMLHttpRequest();
    xhttp.open(
        "GET",
        "https://memorygame-leaderboard.herokuapp.com/scores/top",
        true
    );
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            let res = JSON.parse(this.response)[0];
            displayTopFive(res);
        }
    };
}

function populateStringConstants() {
    const docTitle = document.getElementById("doc-title");
    const title = document.getElementById("title");
    const nameTag = document.getElementById("name-tag");
    const scoreTag = document.getElementById("score-tag");
    const rankTag = document.getElementById("rank-tag");
    const topFiveTitle = document.getElementById("top-five-title");

    docTitle.innerHTML = LEADERBOARD_TITLE;
    title.innerHTML = LEADERBOARD_TITLE;
    nameTag.innerHTML = NAME_TAG;
    scoreTag.innerHTML = SCORE_TAG;
    rankTag.innerHTML = RANK_TAG;
    topFiveTitle.innerHTML = TOP_FIVE_TITLE;
}

populateStringConstants();
getScore();
getTopScores();