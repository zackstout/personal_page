
console.log('we in');

var app = angular.module('app', ['ngRoute', 'ngMaterial']);

app.config(function($routeProvider, $locationProvider) {
  $locationProvider.hashPrefix('');
  console.log('myApp -- config');
  $routeProvider.when('/home', {
    templateUrl: '/views/templates/about.html',
    controller: 'AboutController as ac',
  })
  .when('/blog', {
    templateUrl: '/views/templates/blog.html',
    controller: 'BlogController as bc'
  })
  .when('/portfolio', {
    templateUrl: '/views/templates/portfolio.html',
    controller: 'PortfolioController as pc'

  })
  .otherwise({
    redirectTo: 'home'
  });
  // WorldService.getWorld();
});
