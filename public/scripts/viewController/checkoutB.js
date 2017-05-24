angular.module('sweetBook').controller("checkoutBCController", function ($scope, $state, $http, $q,$stateParams,$rootScope) {
    function init() {
        $rootScope.showIndex = false;
        $scope.num = $stateParams.num;
        $scope.money = $stateParams.money;

        $http.get('/transport').then(function (result) {
            $scope.transport = result.data.transport;
        });

        $http({
            url: '/userLike',
            method:'get'
        }).then(function (res) {
            if (res.data && res.data.code === -1) {
                location.href='/login';
                return ;
            }
            $scope.books = res.data;
        },function (err) {
            console.log(err);
        });
    }

    $scope.toPay = function () {
        $state.go("payResult");
    };

    $scope.addTransport = function () {
        if($scope.phone === undefined || $scope.name === undefined || $scope.address === undefined){
            alert("收货人信息都不能为空");
            return;
        }
        if($scope.phone.length !== 11 || isNaN($scope.phone)){
            alert("手机号格式错误");
            return;
        }
        let {name, phone, address} = $scope;
        $http.post('/transport', {name, phone, address}).then(function () {
            $('#newModal').modal('hide');
            init();
        });
    };

    $scope.delAddress = function(_id){
        $http.delete('/transport?_id=' + _id).then(function () {
            alert('删除成功');
            $state.reload();
        });
    };

    init();
});