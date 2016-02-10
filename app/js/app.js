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
var book = {
    id:'',
    title: '',
    price: 0,
    cover: ''

}
app.controller('checkoutController', function ($scope, $http, $routeParams) {
    //var id = $routeParams.bookId;
    $scope.book = {}

    $http.get("http://university.netology.ru/api/order/delivery").success(function (data) {
        $scope.delivery = data;
        $scope.selectedDelivery = $scope.delivery[0];


    });
    console.log($scope.selectedDelivery)
    $scope.setDelivery = function (data) {
        var deliveryWay = data;
        //console.log(deliveryWay)
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
    $scope.user = {}
    $scope.submitCheckout = function() {


        if ($scope.checkoutForm.$valid) {
            var order = {
               manager: 'horprogs@gmail.com',
                book: book.id,
                name: $scope.user.name,
                phone: $scope.user.phone,
                email: $scope.user.email,
                comment: $scope.user.comment,
                delivery : {
                    id: $scope.selectedDelivery.id,
                    address: $scope.user.addr
                },
                payment: {
                    id: $scope.selectedPayment.id,
                    currency: 'R01589'
                }
            }
            $http.post('http://university.netology.ru/api/order', order, '').then(function(data){
                if (data.status === 200) {
                    $scope.successSend = true;
                }

            }, function() {
                alert('Не удалось отправить заказ. Пожалуйста, попробуйте позже')
            });
        }

    };

})

app.controller('bookController', function ($scope, $http, $routeParams) {
    var id = $routeParams.bookId;
    console.log(id)
    $http.get("http://university.netology.ru/api/book/" + id).success(function (data) {
        $scope.bookDetails = data;
        book.id =  $scope.bookDetails.id;
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
    console.log(book)
    console.log($scope.bookDetails)
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
