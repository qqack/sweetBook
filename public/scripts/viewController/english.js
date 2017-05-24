angular.module('sweetBook').controller("englishController", function ($scope, $http, $q,$stateParams,$rootScope) {
    let getBooks = function (page) {
        let deferred = $q.defer();
        let promise = deferred.promise;
        $http({
            url: '/getBook',
            method:'post',
            data:{'page':page}
        }).then(function (res) {
            deferred.resolve(res.data);
        },function (err) {
            deferred.reject(err);
        });
        return promise;
    };

    let init = function () {
        $rootScope.showIndex = false;
        getBooks(14).then(function(data){
            $scope.bookList1 = data;
            console.log(data);
        }, function(error){
            console.log(error);
        });
        getBooks(15).then(function(data){
            $scope.bookList2 = data;
            console.log(data);
        }, function(error){
            console.log(error);
        });
    };

    init();
});
