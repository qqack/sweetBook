angular.module('sweetBook').controller("bookController", function ($scope, $http, $q,$stateParams,$rootScope) {
    $rootScope.showIndex = false;
    let bookId = $stateParams.id;
    let getOneBook = function () {
        let deferred = $q.defer();
        let promise = deferred.promise;
        $http({
            url: '/searchBook',
            method:'post',
            data:{bookId:bookId}
        }).then(function (res) {
            deferred.resolve(res.data);
        },function (err) {
            deferred.reject(err);
        });
        return promise;
    };
    getOneBook().then(function(data){
       $scope.book = data;
    }, function(error){
        console.log(error);
    });
});