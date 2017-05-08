(function () {
    let app = angular.module('sweetBook', ['ngRoute']);

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
    app.controller("indexController", function ($scope, $http, $location) {
        let href = location.href;
        let matches = href.match(/\?username=(\w+)#?/);
        if (matches) {
            $scope.welcome = "欢迎您,"+matches[1];
        }else{
            $scope.welcome = "未登录";
        }

        $scope.searchBook = function () {
            let bookName = $scope.searchName;
            console.log(bookName);
            $http({
                url: '/searchBook',
                method:'post',
                data:{bookName:bookName}
            }).success(function (res) {
                console.log(res);
            }).error(function(error) {
                console.log(error);
            });
        }
    });

})();