$(document).ready(function () {
  //Clear localStorage and retrieve 'quiz' data from the API in start of the page
  var quizData = JSON.parse(localStorage.getItem("quiz"));
  localStorage.setItem("order", "0");
  localStorage.setItem("answerSheet", "0");
  let currentQuestionOrder = localStorage.getItem("order");
  console.log(quizData);

  //Build all the questions from the 'quiz' data and hide some of them
  function buildQuestions() {
    console.log(quizData.questions);
    var firstLayer = "";
    $.each(quizData.questions, function (i, v) {
      let str = "";
      if (i == 0) {
        str = "style=display:flex";
      } else {
        str = "style=display:none";
      }
      var secondLayer = "";
      var correctCount = 0;
      $.each(v.choices, function (ic, vc) {
        if (vc.text) {
          secondLayer += `
          <div class="col-3 answer_btn">
            <a href="#" class="answerBtn">
              <div class="squareBtn shadow-lg" correct=${
                vc.correct
              } style="background:${getRandomColor()}">${vc.text}</div>
            </a>
          </div>`;
          if (vc.correct == true) {
            correctCount++;
          }
        }
      });

      firstLayer += `<div class="answerBtnGroupInner w-100 row" time=${v.time} question="${v.question} ?" order=${i} ${str} mutiple=${v.multipleanswer} mutipleCount="${correctCount}">${secondLayer}</div>`;
      console.log(v);
    });
    $(".answer_btn_group").html(firstLayer);
  }
  buildQuestions();

  //Show the corresponded questions base on 'order' in localstorage
  function showQuestions(currentQuestionOrder) {
    var currentShowQuestion = $(
      $(".answerBtnGroupInner")[currentQuestionOrder]
    );
    console.log("currentShowQuestion", currentShowQuestion);
    $(currentShowQuestion).show();
    $(currentShowQuestion).siblings().hide();
    $(".main_question").text(currentShowQuestion.attr("question"));
    if (currentShowQuestion.attr("mutiple") == "true") {
      $(".multipleAnswerWarn").show();
    } else {
      $(".multipleAnswerWarn").hide();
    }

    $(".questionNumShow").text(
      parseInt(currentQuestionOrder) +
        1 +
        "/" +
        $(".answerBtnGroupInner").length
    );
    $(".secondsText").text(currentShowQuestion.attr("time") + " Seconds");
    moveProgressBar(currentShowQuestion.attr("time"));
  }
  showQuestions(currentQuestionOrder);

  //  EventListener for answer button to be select or deselect
  $(".answerBtn").click(function (e) {
    if ($(e.target).attr("select") == "true") {
      $(e.target)
        .removeAttr("select")
        .css("border", "none")
        .css("margin-top", "0");
      return;
    }

    var isMutiple = $(e.target).parents(".answerBtnGroupInner").attr("mutiple");
    var mutiplecount = $(e.target)
      .parents(".answerBtnGroupInner")
      .attr("mutiplecount");
    var allSelected = $(e.target)
      .parents(".answerBtnGroupInner")
      .find(".squareBtn[select=true]");
    if (isMutiple == "true") {
      if (allSelected.length < parseInt(mutiplecount)) {
        $(e.target)
          .attr("select", "true")
          .css("margin-top", "-10px")
          .css("border", "5px solid #A4077A");
      } else {
        return;
      }
    } else {
      $(e.target)
        .parents(".answerBtnGroupInner")
        .find(".squareBtn[select=true]");
      if (allSelected.length < 1) {
        $(e.target)
          .attr("select", "true")
          .css("margin-top", "-10px")
          .css("border", "5px solid #A4077A");
      } else {
        return;
      }
    }
  });

  // EventListener for submit answer button to
  // 1.Calculate correct answers and show next question
  // 2.Show result when all questions finsihed
  $(".submitBtn").click(function (e) {
    let currentQuestionOrder = localStorage.getItem("order");
    var currentShowQuestion = $(
      $(".answerBtnGroupInner")[currentQuestionOrder]
    );
    console.log(currentShowQuestion);
    let finalAnswerCorrectCount = 0;
    $.each($(currentShowQuestion).find(".squareBtn"), function (i, v) {
      console.log(v);
      if ($(v).attr("select") == $(v).attr("correct")) {
        finalAnswerCorrectCount += 1;
      }
    });

    console.log(
      finalAnswerCorrectCount,
      parseInt($(currentShowQuestion).attr("mutiplecount"))
    );
    var LS_answerSheet = parseInt(localStorage.getItem("answerSheet"));
    if (
      parseInt(currentQuestionOrder) < parseInt($(currentShowQuestion).length)
    ) {
      // if still not finish question
      if (
        finalAnswerCorrectCount ==
        parseInt($(currentShowQuestion).attr("mutiplecount"))
      ) {
        // if ans is correct
        localStorage.setItem("answerSheet", LS_answerSheet + 1);
      }
      var LS_order = parseInt(localStorage.getItem("order"));
      localStorage.setItem("order", LS_order + 1);
      $(".progress").attr("order", LS_order + 1);
      showQuestions(LS_order + 1);
    } else {
      // question finsihed
      $(".mainSection").hide();
      $(".status").hide();
      $(".answer_btn_group").hide();
      $(".submitBtn").hide();
      $(".correctCount").text(
        `${LS_answerSheet} / ${$(".answerBtnGroupInner").length}`
      );
      $(".sideSection").show();
      $(".btn_group").show();
    }
  });

  // 1.Caculate the amount of progress bar animation moving
  // 2.When timer/progess bar time-out, trigger submit answer button
  function moveProgressBar(seconds) {
    let currentQuestionOrder = localStorage.getItem("order");
    var currentShowQuestion = $(
      $(".answerBtnGroupInner")[currentQuestionOrder]
    );
    var progressBar = $(".progress-bar");
    progressBar.css("width", "100%");
    progressBar.attr("aria-valuenow", 100);
    var progressNumber = 100;
    var progressMovePerSecond = 100 / seconds; //calculate the progress bar moving amount per second
    var rolling = setInterval(run, 1000);
    function run() {
      progressNumber -= progressMovePerSecond;
      console.log("progress left", progressNumber);
      progressBar.css("width", progressNumber + "%");
      progressBar.attr("aria-valuenow", progressNumber);
      $(".secondsText").text((seconds -= 1) + " Seconds");
      console.log(
        currentShowQuestion.attr("order"),
        $(".progress").attr("order")
      );
      if (currentShowQuestion.attr("order") != $(".progress").attr("order")) {
        clearInterval(rolling);
      }
      if (progressNumber <= 0) {
        clearInterval(rolling);
        console.log("timeout!");
        $(".submitBtn").click();
      }
    }
  }

  // Function for giving random color to answer buttons.
  function getRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    // console.log(color)
    return color;
  }
});
