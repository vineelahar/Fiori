sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function (Controller) {

    "use strict";

    return Controller.extend("project2.controller.Project1", {

        onInit: function () {

            this.getOwnerComponent()
                .getRouter()
                .getRoute("RouteProject1")
                .attachPatternMatched(this._onRouteMatched, this);

        },


        _onRouteMatched: function (oEvent) {

            var sTile = oEvent
                .getParameter("arguments")
                .tile;

            if (sTile === "tile1") {

                this.byId("tile1Content").setVisible(true);
                this.byId("tile2Content").setVisible(false);

            }

            if (sTile === "tile2") {

                this.byId("tile1Content").setVisible(false);
                this.byId("tile2Content").setVisible(true);

            }

        },


        onBack: function () {

            this.getOwnerComponent()
                .getRouter()
                .navTo("RouteView1");

        }

    });

});