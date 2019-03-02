var newGameButton = document.getElementById("new-game");
var placeholders = document.getElementById("placeholders");
var guessedLetters = document.getElementById("guessed");
var guesses = document.getElementById("guesses-left");
var wins = document.getElementById("wins");
var losses = document.getElementById("losses");

var wordBank = [
  "The big Bang Theory",
  "Games of Thrones",
  "Supernatural",
  "How to get away with murder",
  "The office",
  "Friends",
  "This is us",
  "Modern Family"
];
var pickedWord = "";
var pickedWordPlaceholdersArr = [];
var guessedLetterBank = [];
var incorrectLetterBank = [];
var guessesLeft = 10;
var winsCounter = 0;
var lossesCounter = 0;
var gameRunning = false;

function newGame() {
  gameRunning = true;
  guessesLeft = 10;
  guessedLetterBank = [];
  incorrectLetterBank = [];
  pickedWordPlaceholdersArr = [];

  pickedWord = wordBank[Math.floor(Math.random() * wordBank.length)];
  console.log(pickedWord);

  for (var i = 0; i < pickedWord.length; i++) {
    if (pickedWord[i] === " ") {
      pickedWordPlaceholdersArr.push(" ");
    } else {
      pickedWordPlaceholdersArr.push("_");
    }
  }

  guesses.textContent = guessesLeft;
  placeholders.textContent = pickedWordPlaceholdersArr.join("");
  guessedLetters.textContent = incorrectLetterBank;
}
function letterGuess(letter) {
  console.log(letter);
  if (gameRunning === true && guessedLetterBank.indexOf(letter) === -1) {
    guessedLetterBank.push(letter);

    for (var i = 0; i < pickedWord.length; i++) {
      if (pickedWord[i].toLowerCase() === letter.toLowerCase()) {
        pickedWordPlaceholdersArr[i] = pickedWord[i];
      }
    }
    placeholders.textContent = pickedWordPlaceholdersArr.join("");
    checkIncorrect(letter);
  } else {
    if (!gameRunning) {
      alert("Start a new game?");
    } else {
      alert("you have guessed this letter, choose another one");
    }
  }
}
function checkIncorrect(letter) {
  if (
    pickedWordPlaceholdersArr.indexOf(letter.toLowerCase()) === -1 &&
    pickedWordPlaceholdersArr.indexOf(letter.toUpperCase()) === -1
  ) {
    guessesLeft--;
    incorrectLetterBank.push(letter);
    guessedLetters.textContent = incorrectLetterBank.join(" ");
    guesses.textContent = guessesLeft;
  }
  checkLoss();
}
function checkLoss() {
  if (guessesLeft === 0) {
    lossesCounter++;
    gameRunning = false;
    losses.textContent = losseCounters;
    alert("You lose! Try again.");
  }
  checkWin();
}
function checkWin() {
  if (
    pickedWord.toLowerCase() ===
    pickedWordPlaceholdersArr.join("").toLowerCase()
  ) {
    winsCounter++;
    gameRunning = false;
    wins.textContent = winsCounter;
    alert("You Win!");
  }
}

newGameButton.addEventListener("click", newGame);

document.onkeyup = function(event) {
  console.dir(event);
  if (event.keyCode >= 65 && event.keyCode <= 90) {
    letterGuess(event.key);
  }
};
