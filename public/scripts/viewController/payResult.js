angular.module('sweetBook').controller("payResController", function ($scope, $state, $http, $q,$stateParams,$rootScope) {
    console.log("ok");
    $scope.returnIndex = function () {
        $state.go("index");
    }
});