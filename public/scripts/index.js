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

    app.controller("indexController", function ($scope, $http, $location) {
        let init = function () {
            let href = location.href;
            let matches = href.match(/\?username=(\w+)#?/);
            if (matches) {
                $scope.welcome = "欢迎您,"+matches[1];
            }else{
                $scope.welcome = "未登录";
            }

            $http({
                url: '/getBook',
                method:'get'
            }).then(function (res) {
                console.log(res.data);
            },function (err) {
                console.log(err);
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
        }


    });

})();