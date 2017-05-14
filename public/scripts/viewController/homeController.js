angular.module('sweetBook').controller("homeController", function ($scope, $http, $q) {

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
        getBooks(1).then(function(data){
            $scope.initBooks = data;
        }, function(error){
            console.log(error);
        });

    };

    $scope.getBookList = function (page) {
        getBooks(page).then(function(data){
            $scope.showList = page;
            $scope.bookList = data;
            console.log(data);
        }, function(error){
            console.log(error);
        });
    };

    $scope.searchBook = function () {
        let bookName = $scope.searchName;
        $http({
            url: '/searchBook',
            method:'post',
            data:{bookName:bookName}
        }).then(function (res) {
            console.log(res.data);
        },function (err) {
            console.log(err);
        });
    };

    init();

});