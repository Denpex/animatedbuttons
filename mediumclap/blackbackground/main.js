// Constants
const minDeg = 1;
const maxDeg = 72;
const clickAmount = 0.05;
const particlesClasses = [
  "pop-top",
  "pop-top-left",
  "pop-top-right",
  "pop-bottom-right",
  "pop-bottom-left",
];

// Variables
let accCounter = 0;
let totalCount = 0;

// Initial setup
document.getElementById("totalCounter").innerText = totalCount;
document.getElementById("clicker").children[0].innerText = clickAmount;

document.getElementById("clap").onmouseover = function () {
  let sonarClap = document.getElementById("sonar-clap");
  sonarClap.classList.add("hover-active");
  setTimeout(() => {
    sonarClap.classList.remove("hover-active");
  }, 2000);
};

document.getElementById("clap").onclick = function () {
  const clap = document.getElementById("clap");
  const particles = document.getElementById("particles");
  const particles2 = document.getElementById("particles-2");
  const particles3 = document.getElementById("particles-3");
  clap.classList.add("clicked");
  upClickCounter();

  runAnimationCycle(clap, "scale");

  if (!particles.classList.contains("animating")) {
    animateParticles(particles, 700);
  } else if (!particles2.classList.contains("animating")) {
    animateParticles(particles2, 700);
  } else if (!particles3.classList.contains("animating")) {
    animateParticles(particles3, 700);
  }
};

function upClickCounter() {
  const clickCounter = document.getElementById("clicker");
  const totalClickCounter = document.getElementById("totalCounter");

  // accCounter ++;
  // clickCounter.children[0].innerText = '+' + accCounter;
  accCounter += clickAmount;
  //accCounter = Math.round(accCounter*100)/100;
  strCounter = "$" + accCounter.toFixed(2);
  // 0.05   0.10   0.15   0.20       0.05
  clickCounter.children[0].innerText = strCounter;
  totalClickCounter.innerText = totalCount + accCounter;

  if (clickCounter.classList.contains("first-active")) {
    runAnimationCycle(clickCounter, "active");
  } else {
    runAnimationCycle(clickCounter, "first-active");
  }
  runAnimationCycle(totalClickCounter, "fader");
}

function runAnimationCycle(el, className, duration) {
  if (el && !el.classList.contains(className)) {
    el.classList.add(className);
  } else {
    el.classList.remove(className);
    void el.offsetWidth; // Trigger a reflow in between removing and adding the class name
    el.classList.add(className);
  }
}

function runParticleAnimationCycle(el, className, duration) {
  if (el && !el.classList.contains(className)) {
    el.classList.add(className);
    setTimeout(() => {
      el.classList.remove(className);
    }, duration);
  }
}

function animateParticles(particles, dur) {
  addRandomParticlesRotation(particles.id, minDeg, maxDeg);
  for (let i = 0; i < particlesClasses.length; i++) {
    runParticleAnimationCycle(particles.children[i], particlesClasses[i], dur);
  }

  // Boolean functionality only to activate particles2, particles3 when needed
  particles.classList.add("animating");
  setTimeout(() => {
    particles.classList.remove("animating");
  }, dur);
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function addRandomParticlesRotation(particlesName, minDeg, maxDeg) {
  const particles = document.getElementById(particlesName);
  const randomRotationAngle = getRandomInt(minDeg, maxDeg) + "deg";
  particles.style.transform = `rotate(${randomRotationAngle})`;
}