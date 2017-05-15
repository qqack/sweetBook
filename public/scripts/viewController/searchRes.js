angular.module('sweetBook').controller("searchController", function ($scope, $http, $q,$stateParams,$rootScope) {
    $rootScope.showIndex = false;
    let bookName = $rootScope.searchName;
    $http({
        url: '/searchBook',
        method:'post',
        data:{bookName:bookName}
    }).then(function (res) {
        $scope.book = res.data;
    },function (err) {
        console.log(err);
    });
});