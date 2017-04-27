"use strict";

app.component("mingForm", {
    templateUrl: "js/components/mingForm/mingForm.html",
    controller: "mingFormController",
    bindings: {
        data: "=",
        submit: "&",
        inputError: "<"
    }
});

app.controller("mingFormController", ["$element",
    function($element) {
        var self = this;

        //Find the input that inputError points and show its error styles
        this.$onChanges = function(change) {
            var selected = change.inputError.currentValue;

            if (selected) {
                var formGroup = $($($element.find("#" + selected)).parents(".form-group")),
                    input = $.grep(self.data.inputs, function(el) {
                        return el.id === selected;
                    });

                if (input.length > 0) {
                    formGroup.addClass(input[0].formControl.type);
                    formGroup.find(".form-control-feedback").show(200);
                }
            }
        };

        //Package all input values into an object and send back to parent function
        this.onSubmit = function() {
            var parameters = {},
                input;

            for (var i = 0; i < self.data.inputs.length; i++) {
                input = self.data.inputs[i];
                parameters[input.id] = input.model;
            }

            self.submit({ parameters: parameters });
        };

        this.$onInit = function() {
            if (!self.inputError) {
                self.inputError = "";
            }
        };
    }]);
