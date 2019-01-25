// GLOBAL VARIABLES
//----------------------
// Arrays and variables for holding data
var wordOptions = ["marvin"];
var selectedWord = "" ;
var lettersInWord  = [];
var numBlanks = 0;
var blanksAndSuccesses = [];
var wrongLetters = [];

// Game Counters

var winCount = 0;
var lossCount = 0;
var guessesLeft= 9;

//FUNCTIONS

function startGame () {
    selectedWord = wordOptions[Math.floor(Math.random() * wordOptions.length)];
    lettersInWord = selectedWord.split("");
    numBlanks = lettersInWord.length;

    //Reset
    guessesLeft = 9;
    wrongLetters = [];
    blanksAndSuccesses = [];

    //Populate blanks and successes with right number of blanks.
    for (var i=0; i<numBlanks; i++) {
        blanksAndSuccesses.push("_");
    }

    //Change HTML to reflect round conditions
    document.getElementById("wordToGuess").innerHTML = blanksAndSuccesses.join("  ");
    document.getElementById("numGuesses").innerHTML = guessesLeft;
    document.getElementById("winCounter").innerHTML = winCount;
    document.getElementById("lossCounter").innerHTML = lossCount;
    document.getElementById("wrongGuesses").innerHTML = wrongLetters;
   
    //Testing/ Debugging
    console.log (selectedWord);
    console.log (lettersInWord);
    console.log (numBlanks);
    console.log (blanksAndSuccesses);  
}

function checkLetters(letter) {
   //Check if the letter exists anywhere in the word
   var isLetterInWord = false 

    for (var i=0; i<numBlanks; i++) {
        if (selectedWord[i] == letter) {
            isLetterInWord = true;
        }
    }

    //Check where in the word the letter exists, then populate our blanks and successes array

   if (isLetterInWord) { 
       for (var i=0; i<numBlanks; i++) {
            if (selectedWord[i] == letter) {
                blanksAndSuccesses[i] = letter;
            }
        }  
    }
    //letter wasn't found
    else {
    wrongLetters.push(letter);
    guessesLeft--;
    }

    //testing / Debugging 
    console.log(blanksAndSuccesses)

    document.getElementById("wordToGuess").innerHTML = blanksAndSuccesses.join(" ");
    document.getElementById("wrongGuesses").innerHTML = wrongLetters.join(" ");
    document.getElementById("numGuesses").innerHTML = guessesLeft;
    
}


function roundComplete() {

    console.log ("Win Count: " + winCount + " | Loss Count: " + " | Guesses Left: " + guessesLeft);
    
    //Check if user won
 
    if (lettersInWord.toString() == blanksAndSuccesses.toString()) {
        console.log(lettersInWord.toString());
        console.log(blanksAndSuccesses.toString());
        if (lettersInWord.join("") === "marvin") {
            
            document.getElementById("banner").innerHTML = "What's Going On?"
        }


        winCount++;


        //Update win counter in HTML
        document.getElementById("winCounter").innerHTML = winCount;
        
        startGame();
        
    }
    
    //Check if user lost 

    else if (guessesLeft == 0) {
        lossCount++;


        
        //Update loss counter in HTML
        document.getElementById("lossCounter").innerHTML = lossCount;

        
        startGame();
    }
    
   
   
   
};


//MAIN PROCESS

//Initiates the code for the first time
startGame();

//Register key clicks
document.onkeyup = function (event) {
    var letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();
    checkLetters(letterGuessed);
    roundComplete();
}





