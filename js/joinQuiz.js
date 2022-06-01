$( document ).ready(function() {
  
  // 1.Post the quiz ID to the back-end to check
  // 2.Save the retrieved quiz data to LocalStorage and move to next page
  $('.joinQuiz').click(function(e){

    var quizId=$('.quizId').val()

    if(!quizId){
      alert('Please fill Quiz ID')
      return
    }

    axios.get(`http://localhost:8081/quiz/${quizId}`)
    .then(function (response) {
      // handle success
      console.log(response);
      if(response.status==200){
        localStorage.removeItem('quiz')
        localStorage.setItem('quiz', JSON.stringify(response.data));
        window.location.href='/playQuiz.html'
      }else{
        alert('wrong ID')
      }
    })
    .catch(function (error) {
      // handle error
      console.log(error);
      alert('server error')
    })
  })
});