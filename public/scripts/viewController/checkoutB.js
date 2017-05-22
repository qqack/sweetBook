angular.module('sweetBook').controller("checkoutBCController", function ($scope, $state, $http, $q,$stateParams,$rootScope) {
    function init() {
        $rootScope.showIndex = false;

        $http.get('/transport').then(function (result) {
            $scope.transport = result.data.transport;
        });
    }

    $scope.toPay = function () {
        $state.go("payResult");
    };

    $scope.addTransport = function () {
        let {name, phone, address} = $scope;
        $http.post('/transport', {name, phone, address}).then(function () {
            $('#newModal').modal('hide');
            init();
        });
    };

    init();
});