(function () {
    let app = angular.module('sweetBook', ['ui.router','oc.lazyLoad']);

    // 路由
    app.config(
        ['$stateProvider', '$urlRouterProvider', '$httpProvider',
            function ($stateProvider, $urlRouterProvider,$httpProvider) {
                $stateProvider
                    .state('index',{
                        url:'/index',
                        templateUrl: 'html/user.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load('scripts/viewController/homeController.js');
                                }]
                        }
                    })
                    .state('book', {
                        url: '/book/?:id',
                        templateUrl: 'html/book.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load('scripts/viewController/bookController.js');
                                }]
                        }
                    }).state('searchRes',{
                        url: '/searchRes',
                        templateUrl: 'html/searchRes.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load('scripts/viewController/searchRes.js');
                                }]
                    }
                    });
                $urlRouterProvider.otherwise('/index');
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
            }
        ]
    );

    app.run(function ($rootScope) {
        $rootScope.searchName = "";
        $rootScope.showIndex = true;
    });

    app.controller("indexController", function ($scope, $http, $q,$rootScope,$state) {
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
            $rootScope.showIndex = false;
            $state.go('searchRes');
        };

        $scope.clickBook = function () {
            $rootScope.showIndex = false;
        };

        $scope.addCart = function (bookId) {
            let bookId = bookId;
            let bookNum = 1;
            //发请求
        };
        init();


    });

})();