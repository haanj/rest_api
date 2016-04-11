'use strict';
const angular = require('angular');
const app = angular.module('SnackApp', []);

app.controller('SnackController', ['$http', function($http) {
  this.smokeTest = 'smoketest';
  
  this.snacks = [];
  $http.get('http://localhost:3000/snacks')
    .then((result) => {
      console.log(result.data);
      this.snacks = result.data;
    },
    function(err) {
      console.log(err); 
    });

  this.active = null;

  this.isActive = function(snack) {
    return snack == this.active;
  };

  this.makeActive = function(snack) {
    if (this.active == snack) return this.active = null;
    this.active = snack;
  };

  this.deleteSnack = function(snack) {
    $http.delete('http://localhost:3000/snacks/' + snack)
      .then(() => {
        this.snacks = this.snacks.filter((s)=>{
          return s._id != snack;
        });
      },
      function(err) {
        console.log(err); 
      });
  };

  this.addSnack = function(snackName, snackIngredients, tags) {
    console.log(snackName);
    console.log(snackIngredients);
    console.log(tags);
    let snack = {
      name: snackName,
      ingredients: snackIngredients.split(', '),
      tags: tags.split(', ')
    };
    $http.post('http://localhost:3000/snacks', snack) 
      .then((res) => {
        res.data
        this.snacks.push(res.data); 
      },
      function(err) {
        console.log(err);
      });
  };
}]);

