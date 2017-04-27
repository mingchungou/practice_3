"use strict";

app.component("todoList", {
    templateUrl: "js/components/todoList/todoList.html",
    controller: "todoListController",
    bindings: {
        data: "="
    }
});

app.controller("todoListController", [function() {}]);
