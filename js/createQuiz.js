$( document ).ready(function() {
  console.log( "jQuery ready!" );
  $('.question_add_btn').click(function(e){
    e.preventDefault();
    var questionNum=$('.main_quiz_creation_inner').length+1
    $('.main_quiz_creation').append(`
    <div class="main_quiz_creation_inner">
      <div class="questions_head">Question ${questionNum}</div>
      <div class="input_group createQuizQUS">
        <input class="form-control input_style quizQuestion" type="text" placeholder="Question">
      </div>
      <select class="custom-select timeSelect" id="inputGroupSelect01">
        <option selected value="60">Set time</option>
        <option value="15">15 seconds</option>
        <option value="30">30 seconds</option>
        <option value="60">60 seconds</option>
        <option value="90">90 seconds</option>
        <option value="120">120 seconds</option>
      </select>
      <div class="questions_head">Question ${questionNum} Answers</div>
      <div class="input_group createQuizANS">
        <div class="ans_group">
          <input class="form-control input_style quizAnswer" type="text" placeholder="Answer A">
          <input class="quizAnswer_check checkbox-success" type="checkbox" aria-label="Checkbox for following text input">
        </div>
        <div class="ans_group">
          <input class="form-control input_style quizAnswer" type="text" placeholder="Answer B">
          <input class="quizAnswer_check" type="checkbox" aria-label="Checkbox for following text input">
        </div>
        <div class="ans_group">
          <input class="form-control input_style quizAnswer" type="text" placeholder="Answer C">
          <input class="quizAnswer_check" type="checkbox" aria-label="Checkbox for following text input">
        </div>
        <div class="ans_group">
          <input class="form-control input_style quizAnswer" type="text" placeholder="Answer D">
          <input class="quizAnswer_check" type="checkbox" aria-label="Checkbox for following text input">
        </div>
      </div>
    </div>`)
  });
  $('.CreateQuiz').click(function(e){
    e.preventDefault();
    var markData=[];
    $.each($('.main_quiz_creation_inner'),function(i,v){
      obj1={}
      // var markorder=0;
      var marktime=$(v).find('.timeSelect').val()
      var multiAns=false;
      console.log($(v).find('.quizQuestion'))
      var markQuestion=$(v).find('.quizQuestion').val()
      var markChoices=[]
      var mutiAnsCount=0
      console.log($(v).find('.quizAnswer'))
      $.each($(v).find('.quizAnswer'),function(iq,vq){
        var obj2 = {}
        obj2.text= $(vq).val()
        obj2.correct=$(vq).next().prop('checked')
        if($(vq).next().prop('checked')){
          mutiAnsCount+=1
        }
        if(mutiAnsCount>1){
          multiAns=true
        }
        console.log(mutiAnsCount)
        markChoices.push(obj2)
      })
      obj1.question=markQuestion
      obj1.choices=markChoices
      obj1.time=marktime
      obj1.multipleanswer=multiAns
      markData.push(obj1)
    })
    console.log(markData)
  })

  // axios({
  //   method: 'post',
  //   url: 'http://localhost:8081/quiz/create',
  //   data: {
  //     question: [{
  //       "question": "string",
  //       "choices": [
  //         {
  //           "text": "string",
  //           "correct": true
  //         }
  //       ],
  //       "order": 0,
  //       "time": 60,
  //       "multipleanswer": false
  //     }]
  //   }
  // })
  // .then(function (response) {
  //   console.log(response);
  // })
  // .catch(function (error) {
  //   console.log(error);
  // })

  // axios.get('http://localhost:8081/quiz/')
  // .then(function (response) {
  //   console.log(response);
  // })
  // .catch(function (error) {
  //   console.log(error);
  // })
});