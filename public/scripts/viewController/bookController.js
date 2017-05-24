angular.module('sweetBook').controller("bookController", function ($scope, $http, $q,$stateParams,$rootScope,$state) {
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
       $scope.books = data;
       console.log(data);
    }, function(error){
        console.log(error);
    });

    $scope.addComment = function(id,comment){
        console.log(id);
        if(comment === undefined || comment === null ||comment === "" ){
            alert("评论内容不能为空");
            return;
        }
        $http({
            url: '/addComment',
            method:'post',
            data:{bookId:id,comment:comment}
        }).then(function (res) {
            if(res.data.code == 0){
                alert("评论成功");
                $state.reload();
            }
        },function (err) {
            console.log(err);
        });
    }
});