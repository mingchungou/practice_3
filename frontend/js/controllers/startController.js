"use strict";

app.controller("startController", ["$http", "$location",
    function($http, $location) {
        var self = this;
        this.IP_SERVER = "http://192.168.1.12:8080/";
        this.todoList = null;
        this.orderTodo = {
            expression: "priority",
            reverse: "true"
        };

        this.changeOrder = function() {
            self.orderTodo.expression = "activity";
            self.orderTodo.reverse = "";
        };

        this.logout = function() {
            localStorage.removeItem("token");
            $location.path("/login");
        };

        (function() {
            $http({
                method: "GET",
                url: self.IP_SERVER + "data/activities/db",
            }).then(function(res) {
                self.todoList = res.data;
            }, function(err) {
                console.log(err);
            });
        })();
    }]);
