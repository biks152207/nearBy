'use strict';

angular.module('nearbyApp')
  .controller('MainCtrl',['$scope','$http', function ($scope, $http) {
    $scope.loading = false;
    $scope.searchResult = [];
    
    //function to retrieve nearby places
    $scope.searchNearby = function(searchTerm){
      $scope.loading = true;
      $http.get('/api/search?query=' + searchTerm).success(function(response){
        $scope.searchResult = response.results;
        console.log($scope.searchResult);
        $scope.loading = false;
      }).error(function(error){
        $scope.loading = false;
      });
    }
    // first it watches the changes in $scope.search.if newValue not equal to oldValue in invokes above function.
    // This watch function only trigger after debounce time
    $scope.$watch('search',function(newValue, oldValue){
      if (newValue !== oldValue){
        $scope.searchNearby(newValue)
      }
    });

  }]);
