const probabilities = [
  {
    odds: 10n ** 2n,
    description: "The odds of getting heads 7 times in a row when flipping a coin",
    scale: "This might happen during a fun game with friends. Rare, but conceivable."
  },
  {
    odds: 2n * 10n ** 3n,
    description: "The odds of finding a four-leaf clover",
    scale: "A classic symbol of good fortune, four-leaf clovers are a rare but delightful find."
  },
  {
    odds: 662n * 10n ** 3n,
    description: "The odds of winning an Olympic medal",
    scale: "A testament to exceptional skill, dedication, and a bit of luck."
  },
  {
    odds: 10n ** 4n,
    description: "The odds of being struck by lightning in your lifetime",
    scale: "Unfortunate, but really not that uncommon, when you think about it."
  },
  {
    odds: 10n ** 9n,
    description: "The odds of winning the Mega Millions jackpot",
    scale: "Millions play, one wins. The rest of us keep dreaming..."
  },
  {
    odds: 10n ** 11n,
    description: "The odds of becoming a saint in the Catholic Church",
    scale: "A recognition of the rarest form of human exceptionalism. And yet, compared to what comes next, even this seems common..."
  },
  {
    odds: 10n ** 12n,
    description: "The odds of shuffling a deck of cards into the exact same order as another shuffled deck",
    scale: "There are more possible card arrangements than seconds since Earth formed.<br>Every shuffle is likely the first time that exact order has ever existed in human history."
  },
  {
    odds: 10n ** 14n,
    description: "The odds of your parents meeting exactly when and where they did",
    scale: "A second later at that party, a different job choice, one missed train... any tiny change in either of their lives, and you would never have existed."
  },
  {
    odds: 10n ** 20n,
    description: "The odds of that exact sperm meeting that exact egg to create you",
    scale: "Millions of possibilities in each... encounter. Your existence began with odds so vast they dwarf everything we've seen so far. But we're not done..."
  },
  {
    odds: 10n ** 25n,
    description: "The odds of your exact genetic code occurring",
    scale: "Your DNA is like a book with millions of letters. Change any single one of them and you wouldn't be the same you."
  },
  {
    odds: 10n ** 40n,
    description: "The odds of your entire ancestral line surviving to create you",
    scale: "Through ice ages, plagues, wars, predators, famines, floods...Every single one of your ancestors had to survive long enough to reproduce, just to make you possible."
  },
  {
    odds: 10n ** 80n,
    description: "The number of atoms in the observable universe",
    scale: "Every atom in every galaxy, every star, every planet, every living thing. Everything that exists. And somehow, this number still isn't big enough to capture what comes next..."
  },
  {
    odds: 10n ** 120n,
    description: "The odds of you existing exactly as you are in this precise moment",
    scale: "From the Big Bang, through the birth of stars, through billions of years of evolution, through millions of generations, through countless chance encounters, through every decision and coincidence that led to this exact moment... here you are. Reading these words right now."
  }
];

// Setup intro screen elements
const introScreen = document.getElementById('intro-screen');
const mainContainer = document.querySelector('.container');
const beginButton = document.getElementById('begin-journey');

// Setup main interface elements
let currentIndex = -1;
const display = document.getElementById('probability-display');
const counter = document.getElementById('counter');
const description = document.getElementById('event-description');
const button = document.getElementById('next-probability');
const progressBar = document.querySelector('.progress-bar');

console.log("Script.js loaded");

function startJourney() {
  introScreen.classList.add('hidden');
  mainContainer.classList.add('visible');
  setTimeout(() => {
    showNext(); // Show first probability after intro fades
  }, 1000);
}

function updateProgress() {
  const progress = ((currentIndex + 1) / probabilities.length) * 100;
  progressBar.style.width = `${progress}%`;
}

function createParticle() {
  const particle = document.createElement('div');
  particle.className = 'particle';
  particle.style.left = Math.random() * 100 + 'vw';

  // Scale particle size and count based on current index
  const scaleFactor = Math.min((currentIndex + 1) / probabilities.length, 1);
  const size = Math.random() * 2 + 1 + (scaleFactor * 2);
  particle.style.width = size + 'px';
  particle.style.height = size + 'px';

  // Adjust color intensity based on progress
  const hue = Math.random() * 360;
  const saturation = 70 + (scaleFactor * 30); // More vivid as we progress
  const brightness = 50 + (scaleFactor * 50); // Brighter as we progress
  particle.style.backgroundColor = `hsl(${hue}, ${saturation}%, ${brightness}%)`;

  // Adjust animation speed based on progress
  const duration = (Math.random() * 2 + 2) - (scaleFactor * 1); // Faster as we progress
  particle.style.animationDuration = duration + 's';
  particle.style.animationDelay = Math.random() * -2 + 's';
  
  document.querySelector('.particles-container').appendChild(particle);
  
  particle.addEventListener('animationend', () => {
    particle.remove();
  });
}

function visualizeScale() {
  console.log("visualizeScale called")
  const visualization = document.createElement('div');
  visualization.className = 'scale-visualization';
  document.body.appendChild(visualization);

  setTimeout(() => {
    visualization.style.opacity = '1';
    visualization.style.animation = 'expand 2s ease-out forwards';
  }, 100);

  setTimeout(() => {
    visualization.remove();
  }, 2000);
}

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

function formatWithCommas(num) {
  // Convert BigInt to string and add commas
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function animateNumber(target, duration = 2000) {
  console.log(`animateNumber called with target: ${target}`);
  const start = performance.now();
  const startNum = BigInt(counter.textContent.replace(/,/g, '') || "0");
  
  function update(currentTime) {
    const elapsed = currentTime - start;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = easeOutCubic(progress);
    
    const currentNum = startNum + (target - startNum) * BigInt(Math.floor(easedProgress * 100)) / 100n;
    counter.textContent = formatWithCommas(currentNum);
    
    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }
  
  requestAnimationFrame(update);
}

function showFinalMoment() {
  // Create a dramatic pause
  display.style.opacity = 0;
  button.style.opacity = 0;
  
  setTimeout(() => {
    const finalMessage = document.createElement('div');
    finalMessage.className = 'final-message';
    finalMessage.innerHTML = `
      <p>Your existence is the most improbable event in the known universe.</p>
      <p>You are not just rare.<br>You are impossible.<br>And yet, here you are.</p>
      <button onclick="location.reload()">Experience Again</button>
    `;
    
    document.body.appendChild(finalMessage);
    
    // Create an intense particle burst
    for (let i = 0; i < 100; i++) {
      setTimeout(createParticle, i * 20);
    }
  }, 2000);
}

function showNext() {
  if (currentIndex === probabilities.length - 1) {
    showFinalMoment();
    return;
  }

  currentIndex = (currentIndex + 1) % probabilities.length;
  display.classList.remove('visible');
  updateProgress();
  
  // Create a dramatic flash effect
  const flash = document.createElement('div');
  flash.className = 'flash-effect';
  document.body.appendChild(flash);
  
  setTimeout(() => {
    const probability = probabilities[currentIndex];
    animateNumber(probability.odds);
    
    // Split the description into parts
    const [description, scale] = [
      probability.description,
      probability.scale
    ];
    
    // Animate description and scale separately
    const descriptionEl = document.getElementById('event-description');
    const scaleEl = document.getElementById('scale-description');
    
    // Set transitions before changing opacity
    descriptionEl.style.transition = 'opacity 0.5s ease';
    scaleEl.style.transition = 'opacity 0.5s ease';
    
    // Ensure elements are hidden
    descriptionEl.style.opacity = 0;
    scaleEl.style.opacity = 0;
    
    // Update content after a brief delay to ensure opacity is 0
    setTimeout(() => {
      // Update main description
      descriptionEl.textContent = description;
      display.classList.add('visible');
      
      // Fade in description
      setTimeout(() => {
        descriptionEl.style.opacity = 1;
        
        // Wait for description to fade in before updating scale
        setTimeout(() => {
          // Update scale text while it's still invisible
          scaleEl.textContent = scale;
          
          // Start scale fade in
          setTimeout(() => {
            scaleEl.style.opacity = 1;
          }, 50);
        }, 500);
      }, 50);
    }, 50);

    // Enhanced particle effect that scales with progress
    const baseParticles = 30;
    const extraParticles = Math.floor((currentIndex / probabilities.length) * 40);
    const totalParticles = baseParticles + extraParticles;
    
    for (let i = 0; i < totalParticles; i++) {
      setTimeout(createParticle, i * 50);
    }
    
    // Remove flash effect
    setTimeout(() => {
      flash.remove();
    }, 1000);
  }, 500);

  // Update button text with fade
  const buttonText = document.querySelector('.button-text');
  buttonText.style.opacity = 0;
  setTimeout(() => {
    buttonText.textContent = currentIndex === probabilities.length - 1 ? "Show me the impossible" : "Show me more";
    buttonText.style.opacity = 1;
  }, 250);
}

// Event Listeners
beginButton.addEventListener('click', startJourney);
button.addEventListener('click', showNext);

// Background particles
setInterval(() => {
  if (Math.random() < 0.3) {
    createParticle();
  }
}, 200);

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  console.log("DOMContentLoaded event fired");
  // No longer automatically calling showNext() here
  // Now waiting for user to click "Begin Journey"
});
