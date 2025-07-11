const emojis = ['🍎', '🍌', '🍇', '🍓', '🍉', '🍒', '🍍', '🥝'];
let cardsArray = [...emojis, ...emojis]; // create pairs
let flippedCards = [];
let matched = 0;
let tries = 0;

const board = document.querySelector('.game-board');
const winMessage = document.getElementById('win-message');
const matchCount = document.getElementById('match-count');
const tryCount = document.getElementById('try-count');
const messageBox = document.getElementById('message-box');
const finalTries = document.getElementById('final-tries');

// Shuffle cards
cardsArray.sort(() => 0.5 - Math.random());

// Create cards
cardsArray.forEach(emoji => {
  const card = document.createElement('div');
  card.classList.add('card');
  card.innerHTML = `
    <div class="front">${emoji}</div>
    <div class="back">?</div>
  `;
  card.addEventListener('click', () => flipCard(card));
  board.appendChild(card);
});

function flipCard(card) {
  if (card.classList.contains('flipped') || flippedCards.length === 2) return;

  card.classList.add('flipped');
  flippedCards.push(card);

  if (flippedCards.length === 2) {
    const [first, second] = flippedCards;
    const firstEmoji = first.querySelector('.front').textContent;
    const secondEmoji = second.querySelector('.front').textContent;

    tries++;
    tryCount.textContent = tries;

    if (firstEmoji === secondEmoji) {
      matched++;
      matchCount.textContent = matched;
      flippedCards = [];
      showMessage("✅ Match!", "#28a745");

      if (matched === emojis.length) {
        winMessage.classList.remove('hidden');
        finalTries.textContent = tries;
      }
    } else {
      showMessage("❌ Try Again!", "#dc3545");
      setTimeout(() => {
        first.classList.remove('flipped');
        second.classList.remove('flipped');
        flippedCards = [];
        showMessage(""); // Clear message
      }, 1000);
    }
  }
}

function showMessage(msg, color = "#333") {
  messageBox.textContent = msg;
  messageBox.style.backgroundColor = color;
}
