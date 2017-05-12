"use strict";

var app = angular.module("theming", ["ngRoute", "ngSanitize"]);

app.config(["$routeProvider", "$locationProvider", "$httpProvider",
    function($routeProvider, $locationProvider, $httpProvider) {
        $routeProvider
            .when("/login", {
                templateUrl: "templates/login.html",
                controller: "loginController as $ctrl"
            })
            .when("/signup", {
                templateUrl: "templates/signup.html",
                controller: "signupController as $ctrl"
            })
            .when("/start", {
                templateUrl: "templates/start.html",
                controller: "startController as $ctrl"
            })
            .otherwise({
                redirectTo: "/login"
            });

        $httpProvider.interceptors.push(["$location", "$q",
            function($location, $q) {
                return {
                    request: function (config) {
                        config.headers = config.headers || {};

                        if (localStorage.getItem("token")) {
                            config.headers.Authorization = localStorage.getItem("token");

                            if (config.url.indexOf("http://") === -1 && (config.url === "templates/signup.html" || config.url === "templates/login.html")) {
                                $location.path('/start');
                            }
                        } else {
                            if (config.url.indexOf("http://") === -1 && config.url === "templates/start.html") {
                                $location.path('/login');
                            }
                        }

                        return config;
                    },
                    requestError: function(err) {
                        return $q.reject(err);
                    },
                    response: function(res) {
                        return res;
                    },
                    responseError: function(err) {
                        if (err.data.message === "User unauthorized") {
                            localStorage.removeItem("token");
                            $location.path("/login");
                        }

                        return $q.reject(err);
                    }
                };
            }]);
    }
]);

angular.element(function() {
    angular.bootstrap(document, ["theming"]);
});

//decode token
var urlBase64Decode = function(str) {
    var output = str.replace('-', '+').replace('_', '/');

    switch (output.length % 4) {
        case 0:
            break;
        case 2:
            output += '==';
            break;
        case 3:
            output += '=';
            break;
        default:
            throw 'Illegal base64url string!';
    }

    return window.atob(output);
};

var getUserFromToken = function(token) {
    var user = {};

    if (typeof token !== 'undefined') {
        var encoded = token.split('.')[1];
        user = JSON.parse(urlBase64Decode(encoded));
    }

    return user;
};
