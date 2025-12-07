document.addEventListener("DOMContentLoaded", () => {
  const questionList = document.getElementById("question-container");
  const questionText = document.getElementById("question-text");
  const choicesList = document.getElementById("choices-list");
  const nextBtn = document.getElementById("next-btn");
  const resultList = document.getElementById("result-container");
  const scoreDisplay = document.getElementById("score");
  const restartBtn = document.getElementById("restart-btn");
  const startBtn = document.getElementById("start-btn");
  const wrongAnswer = document.getElementById("wrong-answers");
  const theme_Btn = document.getElementById("themeBtn");
  const bodyContainer = document.getElementById("flex");

  let currentIndex = 0;
  let questionArray = [
    {
      question: "Which planet in our solar system has the most moons?",
      choices: ["Earth", "Jupiter", "Mars", "Saturn"],
      correctAns: "Saturn",
    },
    {
      question: "Which animal is known to have the longest lifespan?",
      choices: ["Elephant", "Bowhead whale", "Tortoise", "Dog"],
      correctAns: "Bowhead whale",
    },
    {
      question: "Which country invented ice cream?",
      choices: ["France", "China", "India", "Italy"],
      correctAns: "China",
    },
    {
      question: "What is the smallest bone in the human body?",
      choices: ["Rib", "Ear bone", "Wrist bone", "Toe bone"],
      correctAns: "Ear bone",
    },
    {
      question: "Which fruit was the first to be eaten on the moon?",
      choices: ["Apple", "Peach", "Pear", "Banana"],
      correctAns: "Peach",
    },
  ];
  let wrongAns = [];
  let score = 0;
  let optionPicked = "";
  let previousOption = "";

  theme_Btn.addEventListener("click", () => {
    console.log("in Theme");
    bodyContainer.classList.toggle("containerB");
    theme_Btn.classList.toggle("toggleB");
    theme_Btn.classList.toggle("toggleD");
  });

  startBtn.addEventListener("click", showQuestion);

  function showQuestion() {
    startBtn.classList.add("hidden");
    questionText.textContent = `${currentIndex + 1}. ${
      questionArray[currentIndex].question
    }`;
    showOptions();
  }

  function showOptions() {
    choicesList.innerHTML = "";
    questionArray[currentIndex].choices.forEach((l) => {
      let optionList = document.createElement("li");
      optionList.innerHTML = `<span>${l}</span>`;
      choicesList.appendChild(optionList);
      nextBtn.classList.add("hidden");
    });
  }
  choicesList.addEventListener("click", (e) => {
    if (e.target.tagName === "LI") {
      optionPicked = e.target.textContent;
      //   console.log(optionPicked);
      if (previousOption !== optionPicked) {
        // console.log(previousOption);
        // console.log(optionPicked);
        if (optionPicked === questionArray[currentIndex].correctAns) {
          console.log(`score++`);
          previousOption = optionPicked;
          score++;
        } else {
          wrongAns.push(questionArray[currentIndex].question);
        }
        nextBtn.classList.remove("hidden");
      }
    }
  });

  nextBtn.addEventListener("click", () => {
    if (currentIndex < 4) {
      ++currentIndex;
      showQuestion();
    } else {
      showResult();
    }
  });

  restartBtn.addEventListener("click", () => {
    currentIndex = 0;
    score = 0;
    resultList.classList.add("hidden");
    questionList.classList.remove("hidden");
    showQuestion();
  });
  function showResult() {
    nextBtn.classList.add("hidden");
    resultList.classList.remove("hidden");
    questionList.classList.add("hidden");
    scoreDisplay.textContent = `${score} out of 5`;
    console.log(wrongAns);

    wrongAnswer.innerHTML = "";
    wrongAns.forEach((l, index) => {
      let wrongQuestion = document.createElement("ul");
      wrongQuestion.textContent = `${index + 1}. ${l}`;
      wrongAnswer.appendChild(wrongQuestion);
      //   wrongAnswer.textContent = `${l}`;
    });
  }
});
