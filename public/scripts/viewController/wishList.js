angular.module('sweetBook').controller("wishListController", function ($rootScope,$http,$scope) {
    $rootScope.showIndex = false;
    $http({
        url: '/wishList',
        method:'get'
    }).then(function (res) {
        if (res.data && res.data.code === -1) {
            location.href='/login';
            return ;
        }
        $scope.wishList = res.data.wishList;
    },function (err) {
        console.log(err);
    });
});