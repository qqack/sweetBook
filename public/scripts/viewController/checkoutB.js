angular.module('sweetBook').controller("checkoutBCController", function ($scope, $state, $http, $q,$stateParams,$rootScope) {
    $scope.toPay = function () {
        $state.go("payResult");
    }
});