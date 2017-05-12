"use strict";

app.controller("loginController", ["$http", "$location",
    function($http, $location) {
        var self = this;
        this.IP_SERVER = "http://192.168.1.12:8080/";
        this.alertType = "";
        this.formData = {
            inputs: [{
                type: "text",
                id: "name",
                formLabel: "Name",
                icon: { style: "fa-envelope" },
                model: "",
                placeholder: "Enter your name"
            }, {
                type: "password",
                id: "password",
                formLabel: "Password",
                icon: {
                    style: "fa-lock",
                    extraClass: "fa-lg"
                },
                model: "",
                placeholder: "Enter your password"
            }],
            submitText: "Login",
            navigation: {
                html: "<p>Don't have an account? <a href='#signup'>Signup</a></p>"
            }
        };

        this.submit = function(parameters) {
            self.alertType = "";

            $http({
                method: "POST",
                url: self.IP_SERVER + "login",
                data: parameters
            }).then(function(res) {
                localStorage.setItem("token", res.data.token);
                $location.path("/start");
            }, function(err) {
                console.log(err);
                self.alertType = err.data.message;
            });
        };
    }
]);
