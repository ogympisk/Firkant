// Henter de ulike elementene fra html documentet
const player = document.getElementById("player");
const enemy = document.getElementById("enemy");
const scoreElem = document.getElementById("score");
// Sier hva score er og hvor ofte den skal opdateres
let score = 0;
let intervalId = setInterval(updateScore, 1000);
// Event listener som leter etter keydown, og bruker da movePlayer funksjonen
document.addEventListener("keydown", movePlayer);

function movePlayer(event) {
  //Henter stil og gjør om til at den kan brukes i koden.
  let left = parseInt(window.getComputedStyle(player).getPropertyValue("left"));
  let top = parseInt(window.getComputedStyle(player).getPropertyValue("top"));
// Gjør en bevegelse ut ifra hva hvilken knapp som blir trykket.
  switch (event.key) {
    case "ArrowLeft":
      if (left > 0) {
        player.style.left = `${left - 10}px`;
      }
      break;
    case "ArrowRight":
      if (left < window.innerWidth - player.offsetWidth) {
        player.style.left = `${left + 10}px`;
      }
      break;
    case "ArrowUp":
      if (top > 0) {
        player.style.top = `${top - 10}px`;
      }
      break;
    case "ArrowDown":
      if (top < window.innerHeight - player.offsetHeight) {
        player.style.top = `${top + 10}px`;
      }
      break;
  }
}
//skal oppdatere scoren til spilleren
function updateScore() {
  score++;
  scoreElem.textContent = `Score: ${score}`;

  let playerRect = player.getBoundingClientRect();
  let enemyRect = enemy.getBoundingClientRect();

  if (
    playerRect.bottom < enemyRect.top ||
    playerRect.top > enemyRect.bottom ||
    playerRect.right < enemyRect.left ||
    playerRect.left > enemyRect.right
  ) {
    // Player and enemy do not overlap
    score + 1;
  } else {
    // Player and enemy overlap
    score -= 10;
  }
}
//Endrer veien Fiende boksen går hvert 0,01 sekkund
let enemyIntervalId = setInterval(moveEnemy, 10);

let enemyX = window.innerWidth / 2;
let enemyY = window.innerHeight / 2;
let enemySpeedX = 100;
let enemySpeedY = 100;

function moveEnemy() {
  //Henter plasseringen av enemy, og gjør den om slik at den kan brukes.
  let top = parseInt(window.getComputedStyle(enemy).getPropertyValue("top"));
  let left = parseInt(window.getComputedStyle(enemy).getPropertyValue("left"));

  let xDirection = Math.random() < 0.5 ? -1 : 1; // Opp eller ned
  let yDirection = Math.random() < 0.5 ? -1 : 1; // Venstre eller høyre
  let xAmount = Math.floor(Math.random() * 60); //gjør at boksen beveger seg en lengre distangse mot en retning
  let yAmount = Math.floor(Math.random() * 60);

  let newTop = top + (yDirection * yAmount);
  let newLeft = left + (xDirection * xAmount);
// Sikrer at motstanderen holder seg innenfor spilleradiusen
  if (newTop < 0 || newTop > window.innerHeight - enemy.offsetHeight) { 
    newTop = top;
  }
  if (newLeft < 0 || newLeft > window.innerWidth - enemy.offsetWidth) {
    newLeft = left;
  }

  enemy.style.top = `${newTop}px`;
  enemy.style.left = `${newLeft}px`;

  checkCollisions();
}
// Sjekker om boksene kolliderer
function checkCollisions() {
  let playerRect = player.getBoundingClientRect();
  let enemyRect = enemy.getBoundingClientRect();
//Skjekker om de treffer hverandre på et sted
  if (
    playerRect.bottom < enemyRect.top ||
    playerRect.top > enemyRect.bottom ||
    playerRect.right < enemyRect.left ||
    playerRect.left > enemyRect.right
  ) {
  } else {
    // Gjør score mindre hvis de treffer hverandre
    score -= 10;
    scoreElem.textContent = `Score: ${score}`;
  }
}
