sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/StandardListItem"
], function (Controller, StandardListItem) {
    "use strict";

    return Controller.extend("myapp.controller.View", {

        // onAddTask: function () {
        //     var oInput = this.byId("taskInput");
        //     var oList = this.byId("taskList");

        //     var sTask = oInput.getValue().trim();

        //     if (!sTask) {
        //         return;
        //     }

        //     var oItem = new StandardListItem({
        //         title: sTask
        //     });

        //     oList.addItem(oItem);

        //     oInput.setValue("");
        // }

    });
});

