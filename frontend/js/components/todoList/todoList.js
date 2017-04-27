"use strict";

app.component("todoList", {
    templateUrl: "js/components/todoList/todoList.html",
    controller: "todoListController",
    bindings: {
        data: "<",
        expression: "@",
        reverse: "@"
    }
});

app.controller("todoListController", ["$filter",
    function($filter) {
        var self = this;

        this.$onInit = function() {
            if (!self.expression) {
                self.expression = "";
            }
            if (!self.reverse) {
                self.reverse
            }
        };
    }]);
