"use strict";

app.controller("signupController", ["$http", "$location",
    function($http, $location) {
        var self = this;
        this.IP_SERVER = "http://192.168.1.12:8080/";
        this.alertType = "";
        this.inputError = "";
        this.formData = {
            inputs: [{
                type: "text",
                id: "name",
                formLabel: "Name",
                icon: { style: "fa-user" },
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
            }, {
                type: "password",
                id: "confirm",
                formLabel: "Confirm Password",
                icon: {
                    style: "fa-lock",
                    extraClass: "fa-lg"
                },
                model: "",
                placeholder: "Confirm your password",
                formControl: {
                    type: "has-danger",
                    inputClass: "form-control-danger",
                    feedback: "The confirm password is not the same as password."
                }
            }],
            submitText: "Signup",
            navigation: {
                html: "<p>Already have an account? <a href='#login'>Login</a></p>"
            }
        };

        this.verifyConfirmPassword = function(parameters) {
            if (parameters.password === parameters.confirm) {
                self.submit(parameters);
            } else {
                self.inputError = "confirm";
            }
        }

        this.submit = function(parameters) {
            self.alertType = "";

            $http({
                method: "POST",
                url: self.IP_SERVER + "signup",
                data: parameters
            }).then(function(res) {
                localStorage.setItem("token", res.data.token);
                $location.path("/start");
            }, function(err) {
                console.log(err);
                self.alertType = err.data.message;
            });
        };
    }]);
