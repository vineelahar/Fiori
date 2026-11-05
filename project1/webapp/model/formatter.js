sap.ui.define([], function () {
    "use strict";

    return {
        materialTypeState: function (sType) {
            if (sType === "FERT") {
                return "Success";
            } else if (sType === "HALB") {
                return "Warning";
            } else if (sType === "ROH") {
                return "Error";
            }
            return "None";
        }
    };
});