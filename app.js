//rock paper scissors AFE Edition
var seanScore = 0;
var davidScore = 0;
var playerScore = 0;
var playerSelection = '';
var seanSelection = '';
var davidSelection = '';


var buttons = document.querySelectorAll('.button');
buttons.forEach(button => button.addEventListener('mouseover', function(){button.classList.add('button-hover');}));
buttons.forEach(button => button.addEventListener('mouseout', function(){button.classList.remove('button-hover');}));
buttons.forEach(button => button.addEventListener('click', playOneRound));

function playOneRound(e) {
    playerSelection = e.srcElement.textContent.replace(/[\n\r]+|[\s]{2,}/g, ' ').trim().toLowerCase();
    seanSelection = computerPlay();
    davidSelection = computerPlay();
    if (checkTie(playerSelection, seanSelection, davidSelection)) {
        document.getElementById('roundWinner').innerHTML = 'Tie Game';
    } else if (seanWins(playerSelection, seanSelection, davidSelection)) {
        seanScore++;
        document.getElementById('roundWinner').innerHTML = 'Sean Wins';
    } else if (davidWins(playerSelection, seanSelection, davidSelection)){
        davidScore++;
        const audio = document.querySelector('#davidWinsAudio');
        audio.play();
        console.log(audio);
        document.getElementById('roundWinner').innerHTML = 'David Wins';
    } else {
        playerScore++;
        document.getElementById('roundWinner').innerHTML = 'You Win!';
    }
    document.getElementById('seanSelection').src = 'images/' + seanSelection + '.png';
    document.getElementById('davidSelection').src = 'images/' + davidSelection + '.png';
    document.getElementById('playerSelection').src = 'images/' + playerSelection + '.png';
    document.getElementById('seanScore').innerHTML = seanScore;
    document.getElementById('davidScore').innerHTML = davidScore;
    document.getElementById('playerScore').innerHTML = playerScore;
}

function computerPlay() {
    var selections = Array('rock', 'paper', 'scissors');
    return selections[Math.floor(Math.random() * selections.length)];
}

function checkTie(playerSelection, seanSelection, davidSelection) {
    if (playerSelection === seanSelection && playerSelection === davidSelection) {
        return true;
    } else if (playerSelection !== seanSelection && seanSelection !== davidSelection && playerSelection !== davidSelection) {
        return true;
    } else {
        return false;
    }
}

function seanWins(playerSelection, seanSelection, davidSelection) {
    switch (seanSelection){
        case playerSelection:
            return false;
        case davidSelection:
            return false;
        default:
            return true;
    }
}

function davidWins(playerSelection, seanSelection, davidSelection) {
    switch (davidSelection){
        case seanSelection:
            return false;
        case playerSelection:
            return false;
        default:
            return true;
    }
}



function declareWinner(playerScore, computerScore, winningScore) {
    if (playerScore === winningScore) {
        return 'You WIN The Whole Game!!!! ' +
        '\nScoreboard:' +
        '\nPlayer1: ' + playerScore +
        '\nSean:' + seanScore +
        '\nDavid:' + davidScore;
    } else if (seanScore === winningScore || davidScore === winningScore) {
        return 'You Lose. :( ' +
        '\nFinal Score:' +
        '\nPlayer1: ' + playerScore +
        '\nComputer:' + computerScore;
    } else {
        return 'something went wrong in the playFullRPSGame final score display';
    }
}


function playFullRPSGame() {
    seanScore = 0;
    davidScore = 0;
    playerScore = 0;
    var winningScore = prompt('Welcome to RPS! What would you like to play to?', '5');
    do {
        playRPSOneRound(requestPlayerInput(), computerPlay());
    }
    while (playerScore < winningScore && computerScore < winningScore);
    return declareWinner(playerScore, computerScore, winningScore);
}
