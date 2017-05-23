angular.module('sweetBook').controller("wishListController", function ($rootScope,$http,$scope,$state) {
    $rootScope.showIndex = false;
    $http({
        url: '/wishList',
        method:'get'
    }).then(function (res) {
        if (res.data && res.data.code === -1) {
            location.href='/login';
            return ;
        }
        $scope.wishList = res.data;
    },function (err) {
        console.log(err);
    });

    $scope.delWish = function(_id){
        console.log(_id);
        $http.delete('/wishList?_id=' + _id).then(function (result) {
            alert('删除成功');
            $state.reload();
            $rootScope.cartNum--;
        });
    }
});