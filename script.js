const buttonColors = ["green", "red", "yellow", "blue"];
let gamePattern = [];
let userPattern = [];
let level = 0;
let started = false;

const startButton = document.getElementById("start-button");
const levelTitle = document.getElementById("level-title");
const pads = document.querySelectorAll(".pad");

// Play sound based on the button color
function playSound(color) {
    const audio = new Audio(`sounds/${color}.mp3`);
    audio.play();
}

// Flash animation for the button
function animatePress(color) {
    const button = document.getElementById(color);
    button.style.opacity = 1; // Brighten the button
    button.classList.add("active"); // Add glowing effect
    setTimeout(() => {
        button.style.opacity = 0.9; // Return to normal opacity
        button.classList.remove("active"); // Remove glowing effect
    }, 200); // Highlight duration
}

// Generate the next sequence
function nextSequence() {
    userPattern = [];
    level++;
    levelTitle.textContent = `Level: ${level}`;

    const randomColor = buttonColors[Math.floor(Math.random() * 4)];
    gamePattern.push(randomColor);

    // Flash the button and play sound
    setTimeout(() => {
        const button = document.getElementById(randomColor);
        button.style.opacity = 1; // Highlight
        button.classList.add("active"); // Add glowing effect
        playSound(randomColor);
        setTimeout(() => {
            button.style.opacity = 0.9; // Reset opacity
            button.classList.remove("active"); // Remove glowing effect
        }, 400); // Highlight duration
    }, 500);
}

// Check user input against the game pattern
function checkAnswer(currentLevel) {
    if (userPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userPattern.length === gamePattern.length) {
            setTimeout(nextSequence, 1000); // Proceed to next level
        }
    } else {
        gameOver();
    }
}

// Game over logic
function gameOver() {
    playSound("wrong");
    levelTitle.textContent = "Game Over! Press Start to Try Again.";
    document.body.classList.add("game-over");
    setTimeout(() => document.body.classList.remove("game-over"), 200);
    resetGame();
}

// Reset the game variables
function resetGame() {
    level = 0;
    gamePattern = [];
    started = false;
}

// Start game logic
startButton.addEventListener("click", () => {
    if (!started) {
        started = true;
        levelTitle.textContent = "Level: 0";
        nextSequence();
    }
});

// User button clicks
pads.forEach((pad) => {
    pad.addEventListener("click", (e) => {
        if (!started) return;

        const userChosenColor = e.target.id;
        userPattern.push(userChosenColor);
        playSound(userChosenColor);
        animatePress(userChosenColor);

        checkAnswer(userPattern.length - 1);
    });
});
