let playerScore = 0;
let botScore = 0;

function play(playerChoice, element) {
  const options = ['pierre', 'feuille', 'ciseaux'];
  const botChoice = options[Math.floor(Math.random() * options.length)];

  document.querySelectorAll('.choice').forEach(choice => {
    choice.classList.remove('selected-player', 'selected-bot');
  });

  element.classList.add('selected-player');
  const botElement = Array.from(document.querySelectorAll('.choice'))
    .find(el => el.querySelector('img').alt.toLowerCase() === botChoice);
  botElement.classList.add('selected-bot');

  let resultText = '';
  let victoryMessage = '';
  if (playerChoice === botChoice) {
    resultText = `Égalité ! Vous avez tous les deux choisi ${playerChoice}.`;
  } else if (
    (playerChoice === 'pierre' && botChoice === 'ciseaux') ||
    (playerChoice === 'feuille' && botChoice === 'pierre') ||
    (playerChoice === 'ciseaux' && botChoice === 'feuille')
  ) {
    resultText = `Tu as gagné ! ${playerChoice} bat ${botChoice}.`;
    victoryMessage = 'BRAVO';
    playerScore++;
  } else {
    resultText = `Tu as perdu ! T'es bien nul MDR ${botChoice} bat ${playerChoice}.`;
    botScore++;
  }

  document.getElementById('result').innerText = resultText;
  document.getElementById('victory-message').innerText = victoryMessage;
  document.getElementById('player-score').innerText = playerScore;
  document.getElementById('bot-score').innerText = botScore;

  document.querySelectorAll('.choice').forEach(c => {
    c.onclick = null;
  });
}

function saveScores() {
  localStorage.setItem('playerScore', playerScore);
  localStorage.setItem('botScore', botScore);
}

function loadScores() {
  const savedPlayerScore = localStorage.getItem('playerScore');
  const savedBotScore = localStorage.getItem('botScore');

  if (savedPlayerScore !== null && savedBotScore !== null) {
    playerScore = parseInt(savedPlayerScore);
    botScore = parseInt(savedBotScore);
    document.getElementById('player-score').innerText = playerScore;
    document.getElementById('bot-score').innerText = botScore;
  }
}

function resetGame() {
  document.querySelectorAll('.choice').forEach(c => {
    c.classList.remove('selected-player', 'selected-bot');
    const imgAlt = c.querySelector('img').alt.toLowerCase();
    c.setAttribute('onclick', `play('${imgAlt}', this)`);
  });

  document.getElementById('result').innerText = '';
  document.getElementById('victory-message').innerText = '';

  loadScores();
}

document.querySelector('.Btn').addEventListener('click', function () {
  saveScores();
  location.reload();
});

loadScores();
