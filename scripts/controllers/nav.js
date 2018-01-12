
app.controller('NavController', function($location) {
  console.log('NavController created');
  vm = this;

  var hit;
  // vm.hit = true;
  // vm.blogClick = false;
  vm.goHome = function() {
    $location.path('/home');
  };

  //i really have no idea why this rigamorole worked, but i'm going to rigama-roll with it.
  //i.e. the boolean needed to start at true (??) and we need to scrap the "blog" page and go to it in order to run the tab....oh well

  vm.goBlog = function() {
    //the really strange thing here is that if we comment this out, the $location.path, it won't show the "ng-if" at all.....
    // vm.blogClick = true;
    // console.log('click');
    // bloggin();
    vm.hit=true;
    console.log('go blog');
    $location.path('/blog');

  };

  vm.showSub = function() {
    console.log('what');
    vm.hit = !vm.hit;
  };

  vm.goPort = function() {
    $location.path('/portfolio');
  };

  vm.goCode = function() {
    $location.path('/code');
    vm.hit = false;
  };

  vm.goMath = function() {
    $location.path('/math');
    vm.hit = false;
  };

  vm.goOther = function() {
    $location.path('/other');
    vm.hit = false;
  };


});
