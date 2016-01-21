var app = angular.module('bookShop', []);

app.controller('catalogController', function ($scope, $http) {
    $http.get("http://university.netology.ru/api/book").success(function (data) {
        $scope.books = data;
    });
    $scope.getBook = function (id) {
        $http.get("http://university.netology.ru/api/book/" + id).success(function (data) {
            $scope.bookDetails = data;
        });
        $http.get("http://university.netology.ru/api/currency").success(function (data) {
            $scope.curr = data;
            var i1 = 9; //USD
            var i2 = 20; //Z
            var currFrom = $scope.curr[i1];
            var currTo = $scope.curr[i2];
            var priceFrom = $scope.bookDetails.price;
            var priceTo = priceFrom * (currFrom.Value / currFrom.Nominal) / (currTo.Value / currFrom.Nominal);
            $scope.bookDetails.price = priceTo;
        });
    };
})
