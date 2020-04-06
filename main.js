var dataModule = (function() {
  function Question(
    question,
    firstChoice,
    secondChoice,
    thirdChoice,
    fourthChoice,
    correctAnswer,
    id
  ) {
    this.question = question;
    this.firstChoice = firstChoice;
    this.secondChoice = secondChoice;
    this.thirdChoice = thirdChoice;
    this.fourthChoice = fourthChoice;
    this.correctAnswer = correctAnswer;
    this.studentAnswer;
    this.id = id;
  }
  var questionNo0 = new Question(
    "Look at this series: 2, 4, 6, 8, 10, ... What number should come next?",
    "11",
    "12",
    "13",
    "14",
    "12",
    0
  );
  var questionNo1 = new Question(
    "Look at this series: 58, 52, 46, 40, 34, ... What number should come next?",
    "26",
    "28",
    "30",
    "32",
    "28",
    1
  );
  var questionNo2 = new Question(
    "Which word does NOT belong with the others?",
    "leopard",
    "cougar",
    "elephant",
    "lion",
    "elephant",
    2
  );
  var questionNo3 = new Question(
    "Which word does NOT belong with the others?",
    "fair",
    "just",
    "equitable",
    "favorable",
    "favorable",
    3
  );
  var questionNo4 = new Question(
    "book must has",
    "fiction",
    "pages",
    "pictures",
    "learning",
    "pages",
    4
  );
  var questionNo5 = new Question(
    "guitar must has",
    "band",
    "teacher",
    "songs",
    "strings",
    "strings",
    5
  );
  var questionNo6 = new Question(
    "Exercise is to gym as eating is to",
    "food",
    "dieting",
    "fitness",
    "restaurant",
    "restaurant",
    6
  );
  var questionNo7 = new Question(
    "Careful is to cautious as boastful is to",
    "arrogant",
    "humble",
    "joyful",
    "suspicious",
    "joyful",
    7
  );
  var questionNo8 = new Question(
    "Pen is to poet as needle is to",
    "thread",
    "button",
    "sewing",
    "tailor",
    "tailor",
    8
  );
  var questionNo9 = new Question(
    "Candid is to indirect as honest is to",
    "frank",
    "wicked",
    "truthful",
    "untruthful",
    "untruthful",
    9
  );

  var questionsArray = [];
  questionsArray.push(
    questionNo1,
    questionNo1,
    questionNo2,
    questionNo3,
    questionNo4,
    questionNo5,
    questionNo6,
    questionNo7,
    questionNo8,
    questionNo9
  );

  var pickedQuestionsArray = [];
  // Picking a question randomly
  while (pickedQuestionsArray.length < 5) {
    var randomNumber = Math.floor(Math.random() * questionsArray.length);
    if (pickedQuestionsArray.indexOf(questionsArray[randomNumber]) == -1) {
      pickedQuestionsArray.push(questionsArray[randomNumber]);
    }
  }

  return {
    q: pickedQuestionsArray
  };
})();

// UI Module
var uiModule = (function() {
  function displayQuestion(j) {
    document.querySelector(
      ".questions-part__question-number"
    ).innerHTML = `Q # ${j + 1}`;
    document.querySelector(".questions-part__question").textContent =
      dataModule.q[j].question;
    document.querySelector(".questions-part__first-choice").innerHTML =
      dataModule.q[j].firstChoice;
    document.querySelector(".questions-part__first-choice-radio").value =
      dataModule.q[j].firstChoice;
    document.querySelector(".questions-part__second-choice").innerHTML =
      dataModule.q[j].secondChoice;
    document.querySelector(".questions-part__second-choice-radio").value =
      dataModule.q[j].secondChoice;
    document.querySelector(".questions-part__third-choice").innerHTML =
      dataModule.q[j].thirdChoice;
    document.querySelector(".questions-part__third-choice-radio").value =
      dataModule.q[j].thirdChoice;
    document.querySelector(".questions-part__fourth-choice").innerHTML =
      dataModule.q[j].fourthChoice;
    document.querySelector(".questions-part__fourth-choice-radio").value =
      dataModule.q[j].fourthChoice;

    if (dataModule.q[j].studentAnswer) {
      for (
        let i = 0;
        i < document.getElementsByClassName("radio").length;
        i++
      ) {
        if (
          document.getElementsByClassName("radio")[i].value ==
          dataModule.q[j].studentAnswer
        ) {
          document.getElementsByClassName("radio")[i].checked = true;
        }
      }
    }
  }

  var i = 0;
  displayQuestion(0);

  function setAnswer(x) {
    for (let j = 0; j < document.querySelectorAll(".radio").length; j++) {
      if (document.querySelectorAll(".radio")[j].checked == true) {
        dataModule.q[x].studentAnswer = document.querySelectorAll(".radio")[
          j
        ].value;
      }
    }
  }

  return {
    displayQuestion,
    i, // index for every question/object
    setAnswer
  };
})();

// App Module
var appModule = (function() {
  var markedQuestions = [];
  var markedQuestionsIndex = [];

  function goingToMarkedAndSkippedQ() {
    for (let i = 0; i < document.querySelectorAll(".markedQ").length; i++) {
      document
        .querySelectorAll(".markedQ")
        [i].addEventListener("click", function() {
          uiModule.setAnswer.call(this, uiModule.i);
          uiModule.i = markedQuestionsIndex[i];
          uiModule.displayQuestion.call(this, uiModule.i);
          document
            .getElementById(uiModule.i)
            .classList.add("markedQ-visibility");

          markedQuestions.splice(markedQuestions.indexOf(uiModule.i), 1);
          markedQuestionsIndex.splice(markedQuestions.indexOf(uiModule.i), 1);

          // Visibility of finish button
          if (uiModule.i == dataModule.q.length - 1) {
            document
              .querySelector(".questions-part__finish-btn")
              .classList.add("visibility");
          }
        });
    }
  }

  function markWithMarkBtn() {
    ////////////////// to be replaced with while loop
    if (markedQuestionsIndex.indexOf(uiModule.i) == -1) {
      for (let j = 0; j < document.querySelectorAll(".radio").length; j++) {
        if (document.querySelectorAll(".radio")[j].checked == true) {
          markedQuestionsIndex.push(uiModule.i);
          markedQuestions.push(dataModule.q[uiModule.i]);
          document.querySelector(
            ".questions-right-part"
          ).innerHTML += `<div id="${
            uiModule.i
          }" class="markedQ">Marked: Q # ${uiModule.i + 1}</div>`;
        }
      }
    }
    ////////////////// to be replaced with while loop
    else {
      document
        .getElementById(uiModule.i)
        .classList.remove("markedQ-visibility");
    }

    goingToMarkedAndSkippedQ();
  }

  function skipWithNextBtn() {
    //////////////////////////////////////////////////////////////////
    if (!dataModule.q[uiModule.i - 1].studentAnswer) {
      if (markedQuestionsIndex.indexOf(uiModule.i - 1) == -1) {
        markedQuestionsIndex.push(uiModule.i - 1);
        markedQuestions.push(dataModule.q[uiModule.i - 1]);
        document.querySelector(
          ".questions-right-part"
        ).innerHTML += `<div id="${uiModule.i -
          1}" class="markedQ">Skipped: Q # ${uiModule.i}</div>`;
      }
      ////////////////// to be replaced with while loop
      else {
        document
          .getElementById(uiModule.i - 1)
          .classList.remove("markedQ-visibility");
      }

      for (let i = 0; i < document.querySelectorAll(".markedQ").length; i++) {
        document
          .querySelectorAll(".markedQ")
          [i].addEventListener("click", function() {
            uiModule.setAnswer.call(this, uiModule.i);
            uiModule.i = markedQuestionsIndex[i];
            uiModule.displayQuestion.call(this, uiModule.i);
            var x = document.getElementById(0);
            document
              .getElementById(uiModule.i)
              .classList.add("markedQ-visibility");

            // Visibility of finish button
            if (uiModule.i == dataModule.q.length - 1) {
              document
                .querySelector(".questions-part__finish-btn")
                .classList.add("visibility");
            }
          });
      }
    }
    /////////////////////////////////////////////////////////////////
  }

  document
    .querySelector(".questions-part__next-btn")
    .addEventListener("click", function() {
      uiModule.setAnswer.call(this, uiModule.i);

      if (uiModule.i < dataModule.q.length - 1) {
        uiModule.i += 1;
        uiModule.displayQuestion.call(this, uiModule.i);
        markAnswer(uiModule.i);
      }

      skipWithNextBtn();

      if (uiModule.i == dataModule.q.length - 1) {
        document
          .querySelector(".questions-part__finish-btn")
          .classList.add("visibility");
      }
    });

  document
    .querySelector(".questions-part__prev-btn")
    .addEventListener("click", function() {
      uiModule.setAnswer.call(this, uiModule.i);

      //////////////////////////////////////////////////////////////////////
      // to check if the question is skipped and then been answered to remove it from skipped Questions
      // if (markedQuestionsIndex.indexOf(uiModule.i) == 1) {
      //     for (let j = 0; j < document.querySelectorAll('.radio').length; j++) {
      //         if(document.querySelectorAll('.radio')[j].checked == true){
      //             markedQuestionsIndex.pop(uiModule.i);
      //             markedQuestions.pop(dataModule.q[uiModule.i]);
      //             document.getElementById(uiModule.i).classList.add('markedQ-visibility');
      //             // document.querySelector('.questions-right-part').innerHTML += `<div id="${uiModule.i}" class="markedQ">Marked: Q # ${uiModule.i +1}</div>`
      //         }
      //     }
      // }
      //
      ///////////////////////////////////////////////////////////////////////

      if (uiModule.i > 0) {
        uiModule.i -= 1;
        uiModule.displayQuestion.call(this, uiModule.i);
        markAnswer(uiModule.i);
      }

      // Visibility of finish button
      if (uiModule.i != dataModule.q.length) {
        document
          .querySelector(".questions-part__finish-btn")
          .classList.remove("visibility");
      }
    });

  document
    .querySelector(".questions-part__mark-btn")
    .addEventListener("click", function() {
      markWithMarkBtn();
    });

  function markAnswer(x) {
    if (dataModule.q[x].studentAnswer == undefined) {
      for (
        let i = 0;
        i < document.getElementsByClassName("radio").length;
        i++
      ) {
        document.getElementsByClassName("radio")[i].checked = false;
      }
    }
  }

  function calcStudentScore() {
    var studentScore = 0;
    for (let index = 0; index < dataModule.q.length; index++) {
      if (
        dataModule.q[index].studentAnswer == dataModule.q[index].correctAnswer
      ) {
        studentScore++;
      }
    }
    return studentScore;
  }

  function finishingExam() {
    document.querySelector(".questions-part__finish-btn").style.display =
      "none";
    document.querySelector(".questions-logo-container").style.display = "none";
    document.querySelector(".big-container__background-img").style.opacity =
      ".25";
    var studentFinalScore = (calcStudentScore() / dataModule.q.length) * 100;
    document.querySelector(
      "body"
    ).innerHTML += `<div class="student-score">Your Score # ${studentFinalScore}%</div>`;
  }

  document
    .querySelector(".questions-part__finish-btn")
    .addEventListener("click", function() {
      if (confirm("Submit Your Answers!")) {
        finishingExam();
      }
    });

  var timer, minutes, seconds;
  function startTimer(duration, display) {
    timer = duration;
    setInterval(function() {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      display.textContent = minutes + ":" + seconds;

      if (--timer < 0) {
        // timer = duration;
        timer = 60 * 60;
        finishingExam();
      }
    }, 1000);
  }

  window.onload = function() {
    var fiveMinutes = 60 * 5;
    display = document.querySelector(".logo-part-timer");
    startTimer(fiveMinutes, display);
  };
  //   return { finishingExam };
})();
