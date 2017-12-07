
app.controller('NavController', function($location) {
  console.log('NavController created');
  vm = this;
  vm.goHome = function() {
    $location.path('/home');
  };
  vm.goBlog = function() {
    $location.path('/blog');
  };
  vm.goPort = function() {
    $location.path('/portfolio');
  };

});
