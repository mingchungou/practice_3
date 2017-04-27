"use strict";

app.component("mingAlert", {
    templateUrl: "js/components/mingAlert/mingAlert.html",
    controller: "mingAlertController",
    bindings: {
        type: "<",
        parent: "="
    }
});

app.controller("mingAlertController", ["$scope", "$timeout",
    function($scope, $timeout) {
        var self = this;
        this.alertTimeout = null;

        this.showAlert = function() {
            self.hide = false;
            self.show = true;
        };

        this.hideAlert = function() {
            self.show = false;
            self.hide = true;
        };

        //Determine type of error, show error message based on type and show/close it after period of time
        this.$onChanges = function(change) {
            var typeValue = change.type.currentValue;

            if (typeValue) {
                switch (typeValue) {
                    case "User doesn't exist":
                        self.message = "Unfortunately we can't identify the user, do you have an account? If not, go to signup.";
                        break;
                    case "User already exists":
                        self.message = "An account is created using this email. Go to login!";
                        break;
                }

                self.showAlert();
                $timeout.cancel(self.alertTimeout);
                self.alertTimeout = $timeout(function() {
                    self.hideAlert();
                    self.parent.alertType = "";
                }, 7000);
            }
        };

        this.$onInit = function() {
            self.message = "";
            self.show = false;
            self.hide = false;
        };
    }]);
