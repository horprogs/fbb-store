var app = angular.module('bookShop', []);

app.controller('catalogController', function ($scope, $http) {
    $http.get("http://university.netology.ru/api/book").success(function (data) {
        $scope.books = data;
    });
    $scope.getBook = function (id) {
        console.log(id)
        $http.get("http://university.netology.ru/api/book/"+id).success(function (data) {
            $scope.bookDetails = data;
        });
    };
})