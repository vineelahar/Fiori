sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ushell/ui/BookmarkDialog"
], (BaseController, MessageToast, BookmarkDialog) => {

    "use strict";

    return BaseController.extend("project3.controller.bookmark", {

        onOpenBookmarkDialog: function () {

            BookmarkDialog.show({
                title: "Simple Bookmark",
                subtitle: "Sample Subtitle",
                info: "Sample Info",
                icon: "sap-icon://add-favorite",
                numberUnit: "USD"
            });

        }

    });

});