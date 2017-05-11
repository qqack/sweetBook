(function () {
    let app = angular.module('sweetBook', []);

    // 路由
    app.config(['$httpProvider',function ($httpProvider) {
        //payload转formdata
        $httpProvider.defaults.transformRequest = function (obj) {
            let str = [];
            for (let p in obj) {
                if (obj.hasOwnProperty(p)) {
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                }
            }
            return str.join("&");
        };

        $httpProvider.defaults.headers.post = {
            'Content-Type': 'application/x-www-form-urlencoded'
        }

    }]);

    app.controller("indexController", function ($scope, $http, $q) {

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
            let href = location.href;
            let matches = href.match(/\?username=(\w+)#?/);
            $scope.showList = 1;
            if (matches) {
                $scope.welcome = "欢迎您,"+matches[1];
            }else{
                $scope.welcome = "未登录";
            }
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

})();