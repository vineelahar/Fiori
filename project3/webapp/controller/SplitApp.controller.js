sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function (Controller) {

    "use strict";

    return Controller.extend("project3.controller.Split", {

        onInit: function () {
            // OData model is configured in manifest.json
        },

        // Select a customer from the Master list
        onCustomerSelect: function (oEvent) {
            var oSelectedItem = oEvent.getParameter("listItem");

            if (!oSelectedItem) {
                return;
            }

            var oContext = oSelectedItem.getBindingContext();

            // Save the selected customer context
            this.byId("detail3").setBindingContext(oContext);

            // Open Detail 1 first
            this.byId("splitApp").toDetail(
                this.byId("detail1")
            );
        },
        onGoToDetail1: function () {
            this.byId("splitApp").toDetail(
                this.byId("detail1")
            );
        },

        // Navigate from Detail 1 to Detail 2
        onGoToDetail2: function () {
            this.byId("splitApp").toDetail(
                this.byId("detail2")
            );
        },
        // navigate to detail3
        // onGoToDetail3: function(){
        //     this.byId("splitApp").toDetail(this.byId("detail3"))
        // },
            // mode betweem
        onPressModeBtn: function (oEvent) {
            var sMode = oEvent.getSource()
                .getSelectedButton()
                .data("splitAppMode");

            this.byId("splitApp").setMode(sMode);
            MessageToast.show("Split Container mode is changed to:" + sMode)
        },

        // Hide the Master area
        onHideMaster: function () {
           var oSplitApp = this.byId("splitApp");
           oSplitApp.hideMaster();
        },

        // Show the Master area
        onShowMaster: function () {
            this.byId("splitApp").showMaster();
        },

        // Navigate back to Detail 1
        onBackToDetails: function () {
            this.byId("splitApp").toDetail(
                this.byId("detail1")
            );
        },

        // Navigate from Detail 2 to Detail 3
        onGoToDetail3: function () {
            this.byId("splitApp").toDetail(
                this.byId("detail3")
            );
        }

    });
});
