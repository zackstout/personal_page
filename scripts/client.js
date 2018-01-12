
console.log('we in');

var app = angular.module('app', ['ngRoute', 'ngMaterial']);

app.config(function($routeProvider, $locationProvider) {
  $locationProvider.hashPrefix('');
  console.log('myApp -- config');
  $routeProvider.when('/home', {
    templateUrl: 'views/templates/about.html',
    controller: 'AboutController as ac',
  })
  .when('/blog', {
    templateUrl: 'views/templates/blog.html',
    controller: 'BlogController as bc'
  })
  .when('/portfolio', {
    templateUrl: 'views/templates/portfolio.html',
    controller: 'PortfolioController as pc'

  })
  .when('/code', {
    templateUrl: 'views/templates/code.html',
    controller: 'CodeController as cc'

  })
  .when('/math', {
    templateUrl: 'views/templates/math.html',
    controller: 'MathController as mc'

  })
  .when('/other', {
    templateUrl: 'views/templates/other.html',
    controller: 'OtherController as oc'

  })
  .otherwise({
    redirectTo: 'home'
  });
  // WorldService.getWorld();
});

//wow it is *seriously* strange that style changes in the Portfolio bullet lists don't update until the list item goes beyond one line (it seems???)
//if we can figure out how to add a hiding div in the dead center of each image, we can do a hover > show button: "See Demo" which takes you to heroku
//in the dream, the headers of SOLO and WEEKEND will stay on top of screen as you scroll down through that section
