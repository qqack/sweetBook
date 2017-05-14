angular.module('sweetBook').run(
    ['$rootScope', '$state', '$stateParams']
)
    .config(
    ['$stateProvider', '$urlRouterProvider', '$httpProvider',
        function ($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('home', {
                    url: '/home',
                    templateUrl: 'html/home.html',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load('scripts/viewController/homeController.js');
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
