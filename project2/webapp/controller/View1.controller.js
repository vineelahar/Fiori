sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function (Controller) {

    "use strict";

    return Controller.extend("project2.controller.View1", {

        onPress: function (oEvent) {

            var oTile = oEvent.getSource();
            var sHeader = oTile.getHeader();

            if (sHeader === "My Tile1") {

                this.getOwnerComponent()
                    .getRouter()
                    .navTo("RouteProject1", {
                        tile: "tile1"
                    });

            } else if (sHeader === "My Tile2") {

                this.getOwnerComponent()
                    .getRouter()
                    .navTo("RouteProject1", {
                        tile: "tile2"
                    });
            }
        }

    });
});