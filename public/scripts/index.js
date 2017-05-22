(function () {
    let app = angular.module('sweetBook', ['ui.router','oc.lazyLoad']);

    // 路由
    app.config(
        ['$stateProvider', '$urlRouterProvider', '$httpProvider',
            function ($stateProvider, $urlRouterProvider,$httpProvider) {
                $stateProvider
                    .state('index',{
                        url:'/index',
                        templateUrl: 'html/home.html',
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
                    }).state('shoppingCart',{
                    url: '/shoppingCart',
                    templateUrl: 'html/shoppingCart.html',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load('scripts/viewController/shoppingCart.js');
                            }]
                        }
                    }).state('checkoutB',{
                    url: '/checkoutB',
                    templateUrl: 'html/checkoutB.html',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load('scripts/viewController/checkoutB.js');
                            }]
                        }
                    }).state('payResult',{
                    url: '/payResult',
                    templateUrl: 'html/payResult.html',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load('scripts/viewController/payResult.js');
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

    app.run(function ($rootScope, $http) {
        $rootScope.searchName = "";
        $rootScope.showIndex = true;

        $rootScope.cartNum = 0;
        $http.get('/cartNum').then(function (res) {
            let data = res.data;
            if (data.code === 0) {
                $rootScope.cartNum = data.num;
            }
        });
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
            $scope.showList = 1;
            $scope.showList2 = 1;
            $http.get('/username').then(function (res) {
                let data = res.data;
                if (data.code === 0) {
                    $scope.welcome = "欢迎您," + data.username;
                } else {
                    $scope.welcome = "未登录";
                }
            });
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

        $scope.goCart = function () {
            $state.go('shoppingCart');
        };

        $scope.getBookList2 = function (page) {
            getBooks(page).then(function(data){
                $scope.showList2 = page;
                $scope.bookList2 = data;
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

        $scope.addCart = function (id) {
            let bookId = id;
            //TODO 判断书的id是否存在，存在就将数量加一
            let bookNum = 1;
            //发请求
            let addFun = function () {
                let deferred = $q.defer();
                let promise = deferred.promise;
                $http({
                    url: '/addCart',
                    method:'post',
                    data:{bookId:bookId,bookNum:bookNum}
                }).then(function (res) {
                    deferred.resolve(res.data);
                },function (err) {
                    deferred.reject(err);
                });
                return promise;
            };
            addFun().then(function(data){
                // 购物车数量+1
                console.log(data);
                if (data === '添加成功') {
                    $rootScope.cartNum++;
                    addProductNotice('添加成功', '', '', '');
                } else {
                    addProductNotice('已存在', '', '', '');
                }
            }, function(error){
                console.log(error);
            });
        };

        $scope.addWish = function (id) {
            let bookId = id;
            //发请求
            let addFun = function () {
                let deferred = $q.defer();
                let promise = deferred.promise;
                $http({
                    url: '/addWish',
                    method:'post',
                    data:{bookId:bookId}
                }).then(function (res) {
                    deferred.resolve(res.data);
                },function (err) {
                    deferred.reject(err);
                });
                return promise;
            };
            addFun().then(function(data){
                console.log(data);
            }, function(error){
                console.log(error);
            });
        };
        init();
    });

})();