
console.log('did you load?');

app.controller('NewPortfolioController', function($location) {
  console.log('newPortfolioController created');

  var vm = this;
  vm.goBack = function() {
    $location.path('/portfolio');
  };
});

// Ahhhhhh....was using the wrong index again...
