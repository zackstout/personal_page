

app.controller('OtherController', function($location, $scope, $anchorScroll, $compile) {
  console.log('otterController created');

  vm = this;

  vm.goToPost = function(n) {
    $anchorScroll('post' + n);
  };

});
