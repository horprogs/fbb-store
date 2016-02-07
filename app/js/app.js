var app = angular.module('bookShop', ['ngRoute']);

app.config(function ($routeProvider, $locationProvider) {
    $routeProvider

        .when('/', {
            templateUrl: 'catalog.html',
            controller: 'catalogController'
        })

        .when('/book/:bookId', {
            templateUrl: 'book.html',
            controller: 'bookController'
        })

        .when('/checkout/:bookId', {
            templateUrl: 'checkout.html',
            controller: 'checkoutController'
        })

        .when('/about', {
            templateUrl: 'about.html'
        })
    $locationProvider.html5Mode(true);
});

app.controller('checkoutController', function ($scope, $http, $routeParams) {
    var id = $routeParams.bookId;
    console.log(id)
    $http.get("http://university.netology.ru/api/book/" + id).success(function (data) {
        $scope.bookDetails = data;
    });
    $http.get("http://university.netology.ru/api/order/delivery").success(function (data) {
        $scope.delivery = data;
    });
    $http.get("http://university.netology.ru/api/order/payment").success(function (data) {
        $scope.payment = data;
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

})

app.controller('bookController', function ($scope, $http, $routeParams) {
    var id = $routeParams.bookId;
    console.log(id)
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

})
app.controller('catalogController', function ($scope, $http) {
    $http.get("http://university.netology.ru/api/book").success(function (data) {
        $scope.books = data;
    });


    $scope.dragControlListeners = {
        accept: function (sourceItemHandleScope, destSortableScope) {

            return boolean
        },//override to determine drag is allowed or not. default is true.
        itemMoved: function (event) {
            console.log(event)
        },
        orderChanged: function (event) {
        },
        containment: '#board',//optional param.
        clone: true, //optional param for clone feature.
        allowDuplicates: false //optional param allows duplicates to be dropped.
    };


})
