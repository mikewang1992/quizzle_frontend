$( document ).ready(function() {
    console.log( "jQuery ready!" );

    // Make a request for a user with a given ID
    axios.get('https://jsonplaceholder.typicode.com/todos/1')
      .then(function (response) {
        console.log('axios ready, dummy api respose')
        // handle success
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
});