$( document ).ready(function() {
  $('.joinQuiz').click(function(e){
    var quizId=$('.quizId').val()
    if(!quizId){
      alert('Please fill Quiz ID')
      return
    }
    // axios.get(`http://localhost:8081/quiz/6275de35a3c5289e6d24656d`)
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