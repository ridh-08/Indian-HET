let era;
let socialHarmony = 50;
let wealthDistribution = 50;
let productivity = 50;
let message = "Choose an economic period to begin.";
let choicesMade = 0;
let maxChoices = 7; // Max decisions before ending the game
let startScreen = true;
let gameScreen = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(240);

  if (startScreen) {
    displayInstructions();
  } else if (gameScreen) {
    displayGame();
  }
}

function displayInstructions() {
  textSize(width / 30); // Dynamically adjust text size
  text("Welcome to 'Build Your Own Economy'", width / 2, height / 4);
  textSize(width / 50);
  text("Instructions:", width / 2, height / 2 - 100);
  text(
    "1. Choose an economic period to begin your journey.",
    width / 2,
    height / 2 - 60
  );
  text(
    "2. Make strategic decisions that affect Social Harmony, Wealth Distribution, and Productivity.",
    width / 2,
    height / 2 - 30
  );
  text(
    "3. Aim to balance these metrics by the end of the game to achieve a stable economy.",
    width / 2,
    height / 2
  );
  text(
    "4. Some choices may seem beneficial but are detrimental to the chosen era's philosophy.",
    width / 2,
    height / 2 + 30
  );
  text("Click anywhere to start.", width / 2, height / 2 + 100);
}

function mousePressed() {
  if (startScreen) {
    startScreen = false;
    gameScreen = true;
  } else if (gameScreen && !era) {
    checkEraSelection();
  } else if (gameScreen && era) {
    makeChoice();
  }
}

function displayGame() {
  displayStats();

  if (!era) {
    displayEraButtons();
  } else {
    displayChoiceButtons();
  }

  if (choicesMade >= maxChoices) {
    endGame();
  }
}

function displayStats() {
  textSize(width / 50);
  text(`Social Harmony: ${socialHarmony}`, width / 4, height / 10);
  text(`Wealth Distribution: ${wealthDistribution}`, width / 2, height / 10);
  text(`Productivity: ${productivity}`, (3 * width) / 4, height / 10);
  text(message, width / 2, height / 6);
}

function displayEraButtons() {
  let buttonWidth = width / 5;
  let buttonHeight = height / 12;
  let spacing = width / 20;

  ["Buddhism", "Kautilya", "Mughal", "British Colonial"].forEach(
    (eraName, index) => {
      let x = spacing + index * (buttonWidth + spacing);
      let y = height / 2;

      fill("lightgray");
      rect(x, y, buttonWidth, buttonHeight, 10); // Rounded rectangle
      fill(0);
      textSize(width / 50);
      text(eraName, x + buttonWidth / 2, y + buttonHeight / 2);
    }
  );
}

function checkEraSelection() {
  let buttonWidth = width / 5;
  let buttonHeight = height / 12;
  let spacing = width / 20;

  let eras = ["Buddhism", "Kautilya", "Mughal", "British Colonial"];
  for (let i = 0; i < eras.length; i++) {
    let x = spacing + i * (buttonWidth + spacing);
    let y = height / 2;
   
    if (
      mouseX > x &&
      mouseX < x + buttonWidth &&
      mouseY > y &&
      mouseY < y + buttonHeight
    ) {
      era = eras[i];
      message = `You chose ${era}.`;
      break;
    }
  }
}

function getChoicesForEra(era) {
  const choices = {
    Buddhism: [
      { label: "Invest in Agriculture and Charity", effect: () => applyEffects(5, 3, 0) },
      { label: "Encourage Ethical Wealth Management", effect: () => applyEffects(4, 2, 0) },
      { label: "Promote Community Savings Groups", effect: () => applyEffects(5, 4, -1) },
      { label: "Expand Luxury Goods Trade", effect: () => applyEffects(-5, -3, 2) },
      { label: "Increase Tax on Farmers", effect: () => applyEffects(-5, -4, 1) },
    ],
    Kautilya: [
      { label: "Implement Strict Tax Collection", effect: () => applyEffects(-2, 5, 4) },
      { label: "Control Trade and Set Price Standards", effect: () => applyEffects(3, 2, 3) },
      { label: "Enforce Land and Resource Management", effect: () => applyEffects(2, 3, 5) },
      { label: "Allow Unregulated Trade", effect: () => applyEffects(-4, -2, 2) },
      { label: "Cut Taxes for the Wealthy", effect: () => applyEffects(-3, -5, -1) },
    ],
    Mughal: [
      { label: "Expand Trade with Foreign Merchants", effect: () => applyEffects(0, 5, 5) },
      { label: "Encourage Artisan Production for Export", effect: () => applyEffects(0, 4, 3) },
      { label: "Construct Irrigation and Public Works", effect: () => applyEffects(3, 2, 5) },
      { label: "Reduce Artisan Support in Favor of Imports", effect: () => applyEffects(-5, -3, 1) },
      { label: "Raise Taxes on Peasants", effect: () => applyEffects(-4, -2, 3) },
    ],
    "British Colonial": [
      { label: "Enforce High Taxes on Local Goods", effect: () => applyEffects(-5, 3, 5) },
      { label: "Expand Plantation Economy", effect: () => applyEffects(-3, 0, 5) },
      { label: "Export Raw Materials to Britain", effect: () => applyEffects(-4, -2, 4) },
      { label: "Encourage Local Industry Development", effect: () => applyEffects(5, -4, -3) },
      { label: "Reduce Tax Burden on Local Populations", effect: () => applyEffects(5, 3, -5) },
    ],
  };
  return choices[era];
}

function displayChoiceButtons() {
  let options = getChoicesForEra(era);
  let buttonWidth = width / 5;
  let buttonHeight = height / 12;
  let spacing = height / 20;
  let startX = width / 2 - ((options.length * buttonWidth) + spacing * (options.length - 1)) / 2;
  let startY = height / 1.5;

  options.forEach((option, index) => {
    let x = startX + index * (buttonWidth + spacing);
    fill("lightgray");
    rect(x, startY, buttonWidth, buttonHeight, 10);
    fill(0);
    textSize(width / 90);
    text(option.label, x + buttonWidth / 2, startY + buttonHeight / 2);
  });
}

function makeChoice() {
  let options = getChoicesForEra(era);
  let buttonWidth = width / 5;
  let buttonHeight = height / 12;
  let spacing = height / 20;
  let startX = width / 2 - ((options.length * buttonWidth) + spacing * (options.length - 1)) / 2;
  let startY = height / 1.5;

  options.forEach((option, index) => {
    let x = startX + index * (buttonWidth + spacing);
    if (
      mouseX > x &&
      mouseX < x + buttonWidth &&
      mouseY > startY &&
      mouseY < startY + buttonHeight
    ) {
      option.effect();
      message = `You chose: ${option.label}`;
    }
  });
}

function applyEffects(social, wealth, productivityEffect) {
  socialHarmony += social;
  wealthDistribution += wealth;
  productivity += productivityEffect;
  choicesMade++;
}

function endGame() {
  background(50, 150, 200);
  fill(255);
  textSize(width / 30);
  text(
    `Game Over! Choices Made: ${choicesMade}\nSocial Harmony: ${socialHarmony}\nWealth Distribution: ${wealthDistribution}\nProductivity: ${productivity}`,

    width / 2,
    height / 2
  );
}

function endGame() {
  background(240);
  textSize(20);
  textAlign(CENTER, CENTER);
  text(`Game Over! \nChoices Made: ${choicesMade}\nSocial Harmony: ${socialHarmony}\nWealth Distribution: ${wealthDistribution}\nProductivity: ${productivity}`, width / 2, height / 3);

  let resultMessage = ""; // Message to display
  let subMessage = "";   // Additional details based on performance

  // Final evaluation based on the metrics
  if (socialHarmony > 70 && wealthDistribution > 70 && productivity > 70) {
    resultMessage = "Congratulations! You've built a strong and balanced economy.";
    subMessage = "Your efforts have led to harmony, fair wealth distribution, and robust productivity.";
  } else if (socialHarmony > 60 && wealthDistribution > 60) {
    resultMessage = "Good Job! You've created a fair and stable economy.";
    subMessage = "However, you could improve productivity to sustain long-term growth.";
  } else if (productivity > 70) {
    resultMessage = "Productivity is booming, but at a social cost.";
    subMessage = "High output may not last without harmony and equitable wealth distribution.";
  } else if (socialHarmony < 40) {
    resultMessage = "Your economy suffers from social unrest.";
    subMessage = "Consider policies to promote unity and address inequalities.";
  } else if (wealthDistribution < 40) {
    resultMessage = "The wealth gap is too high for stability.";
    subMessage = "Focus on fairer resource allocation to prevent future issues.";
  } else if (productivity < 40) {
    resultMessage = "Productivity levels are critically low.";
    subMessage = "Your economy needs innovation and investment in growth.";
  } else {
    resultMessage = "Your economy needs more balance to sustain long-term growth.";
    subMessage = "Try balancing all factors to achieve stability and prosperity.";
  }

  // Display the final messages
  textSize(18);
  text(resultMessage, width / 2, height / 2);
  textSize(14);
  text(subMessage, width / 2, height / 2 + 50);
  text("Refresh the page to play again!", width / 2, height / 2 + 100);
}

