angular.module('sweetBook').controller("bookController", function ($scope, $http, $q,$stateParams,$rootScope) {
    let bookName = $rootScope.searchName;
    $http({
        url: '/searchBook',
        method:'post',
        data:{bookName:bookName}
    }).then(function (res) {
        console.log(res.data);
    },function (err) {
        console.log(err);
    });
});