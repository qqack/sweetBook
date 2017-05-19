angular.module('sweetBook').controller("shopCartCController", function ($scope, $state, $http, $q,$stateParams,$rootScope) {
    $rootScope.showIndex = false;
    $http({
        url: '/allCart',
        method:'get'
    }).then(function (res) {
        $scope.shopCarts = res.data;
    },function (err) {
        console.log(err);
    });
    $scope.toPay = function () {
        $state.go('checkoutB');
    }
});