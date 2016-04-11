'use strict';
const angular = require('angular');

const app = angular.module('SnackApp', []);

app.controller('SnackController', ['$http', function($http) {
  this.smokeTest = 'smoketest';
  this.snacks = ['snack1, snack2'];
  $http.get('http://localhost:3000/snacks')
    .then((result) => {
      console.log(result.data);
      this.snacks = result.data;
    },
    function(err) {
      console.log(err); 
    });
}]);
