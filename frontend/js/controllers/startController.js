"use strict";

app.controller("startController", ["$http", "$location",
    function($http, $location) {
        var self = this;
        this.IP_SERVER = "http://192.168.1.12:8080/";
        this.todoList = [];

        this.logout = function() {
            localStorage.removeItem("token");
            $location.path("/login");
        };

        (function() {
            $http({
                method: "GET",
                url: self.IP_SERVER + "data/activities",
            }).then(function(res) {
                self.todoList = res.data;
                console.log(res);
            }, function(err) {
                console.log(err);
            });
        })();
    }]);
