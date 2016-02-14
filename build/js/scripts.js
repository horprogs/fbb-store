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
            templateUrl: 'about.html',
            controller: 'aboutController'
        })
    $locationProvider.html5Mode(true);
});

var book = {
    id: '',
    title: '',
    price: 0,
    cover: ''

}

app.controller('checkoutController', function ($scope, $http, $routeParams) {
    $scope.book = {}

    $http.get("http://university.netology.ru/api/order/delivery").success(function (data) {
        $scope.delivery = data;
        $scope.selectedDelivery = $scope.delivery[0];
    });

    $scope.setDelivery = function (data) {
        var deliveryWay = data;

        $http.get("http://university.netology.ru/api/order/payment").success(function (data) {
            var payment = data;
            $scope.payment = []
            for (var i = 0; i < payment.length; i++) {
                if (payment[i].availableFor.indexOf(deliveryWay) !== -1) {
                    var objPayment = {}
                    objPayment.id = payment[i].id;
                    objPayment.title = payment[i].title;
                    $scope.payment[$scope.payment.length] = objPayment;
                }
            }
            $scope.selectedPayment = $scope.payment[0];
        });
    }

    $http.get("http://university.netology.ru/api/currency").success(function (data) {
        var curr = data;
        var i1 = 9; //USD
        var i2 = 20; //Z
        var currFrom = curr[i1];
        var currTo = curr[i2];
        var priceFrom = $scope.delivery.price;
        var priceTo = priceFrom * (currFrom.Value / currFrom.Nominal) / (currTo.Value / currFrom.Nominal);
        $scope.delivery.price = priceTo;
    });

    $scope.book.cover = book.cover;
    $scope.book.title = book.title;
    $scope.book.price = book.price;
    $scope.user = {};

    $scope.submitCheckout = function () {
        if ($scope.checkoutForm.$valid) {
            var comment = ($scope.user.comment === '' || $scope.user.comment === undefined) ? 'Комментарий пуст' : $scope.user.comment;
            var order = {
                manager: 'horprogs@gmail.com',
                book: book.id,
                name: $scope.user.name,
                phone: $scope.user.phone,
                email: $scope.user.email,
                comment: comment,
                delivery: {
                    id: $scope.selectedDelivery.id,
                    address: $scope.user.addr
                },
                payment: {
                    id: $scope.selectedPayment.id,
                    currency: 'R01589'
                }
            }
            $scope.successSend = false;
            $scope.inProgress = false;
            $scope.inProgress = true;

            $http.post('http://university.netology.ru/api/order', order, '').then(function (data) {
                if (data.status === 200) {
                    $scope.successSend = true;
                }
            }, function () {
                alert('Не удалось отправить заказ. Пожалуйста, попробуйте позже')
            });
        }
    };
})

app.controller('bookController', function ($scope, $http, $routeParams, $sce) {
    var id = $routeParams.bookId;

    $http.get("http://university.netology.ru/api/book/" + id).success(function (data) {
        $scope.bookDetails = data;
        $scope.trustAsHtml = $sce.trustAsHtml;
        book.id = $scope.bookDetails.id;
        book.title = $scope.bookDetails.title;
        book.cover = $scope.bookDetails.cover.small;
    });

    $http.get("http://university.netology.ru/api/currency").success(function (data) {
        var curr = data;
        var i1 = 9; //USD
        var i2 = 20; //Z
        var currFrom = curr[i1];
        var currTo = curr[i2];
        var priceFrom = $scope.bookDetails.price;
        var priceTo = priceFrom * (currFrom.Value / currFrom.Nominal) / (currTo.Value / currFrom.Nominal);
        $scope.bookDetails.price = priceTo;
        book.price = $scope.bookDetails.price;
    });
})

app.controller('catalogController', function ($scope, $http, $sce) {
    $http.get("http://university.netology.ru/api/book").success(function (data) {
        $scope.books = data;
        $scope.trustAsHtml = $sce.trustAsHtml;
    });
})


window.addEventListener('load', function () {

    window.addEventListener('mousemove', function (e) {
        var pix = document.getElementsByClassName('pixel')[0];
        if (pix) {
            var heightEye = $('.book__eye').height();
            var widthEye = $('.book__eye').width();
            var stepY = document.documentElement.clientHeight / heightEye;
            var newPosY = (e.clientY / stepY) - (heightEye / 2);
            var stepX = document.documentElement.clientWidth / widthEye;
            var newPosX = (e.clientX / stepX) - (widthEye / 2);
            $('.book__eye .pixel').css({top: newPosY, left: newPosX});
        }
    })
})

