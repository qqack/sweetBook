angular.module('sweetBook').controller("shopCartCController", function ($scope, $state, $http, $q,$stateParams,$rootScope) {
    $rootScope.showIndex = false;
    $scope.totalCount = 0;
    $scope.checked = [];
    $http({
        url: '/allCart',
        method:'get'
    }).then(function (res) {
        if (res.data && res.data.code === -1) {
            location.href='/login';
            return ;
        }
        $scope.shopCarts = res.data;
    },function (err) {
        console.log(err);
    });
    $scope.toPay = function () {
        $state.go('checkoutB');
    };

    $scope.selectAll = function () {
        if ($scope.all) {
            let num = 0;
            for (let i in $scope.shopCarts) {
                $scope.checked[i] = true;
                num += $scope.shopCarts[i].new_price * $scope.shopCarts[i].num;
            }
            $scope.totalCount = num;
        } else {
            $scope.totalCount = 0;
            $scope.checked = [];
        }
    };

    $scope.select = function (i) {
        if ($scope.checked[i]) {
            $scope.totalCount += $scope.shopCarts[i].new_price * $scope.shopCarts[i].num;
        } else {
            $scope.totalCount -= $scope.shopCarts[i].new_price * $scope.shopCarts[i].num;
        }
    };

    $scope.add = function (i ,num) {
        $scope.shopCarts[i].num += num;
        if ($scope.shopCarts[i].num < 1) {
            $scope.shopCarts[i].num = 1;
        }
        let sum = 0;
        for (let i in $scope.shopCarts) {
            if ($scope.checked[i]) {
                sum += $scope.shopCarts[i].new_price * $scope.shopCarts[i].num;
            }
        }
        $scope.totalCount = sum;
    };
});