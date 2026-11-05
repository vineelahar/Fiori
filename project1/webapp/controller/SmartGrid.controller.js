sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/ObjectStatus",
    "sap/ui/table/Column",
    "sap/m/Label",
    "project1/model/formatter",
    "sap/ui/model/json/JSONModel"
], function (Controller, ObjectStatus, Column, Label, formatter) {
    "use strict";

    return Controller.extend("project1.controller.SmartGrid", {
        formatter: formatter,

        onInit: function () {
            var oSmartTable = this.byId("SmartTable");

            // Pagenation
            // this._pageSize = 10;
            // this._currentPage=1;
            // this.totalPages=1;
            // var oPaginationModel = new JSONModel({
            //     currentPage:1,
            //     totalPages:1,
            //     hasPrevious:false,
            //     hasNext:false
            // });
            // this.getView().setModel(oPaginationModel, "pagination")

            
            // formater color and smart table belong to hear  it is not related to pagenation
            oSmartTable.attachInitialise(function () {
                var oTable = oSmartTable.getTable();

                // Find the generated ProductType column
                var oColumn = oTable.getColumns().find(function (col) {
                    return col.getSortProperty() === "ProductType"
                        || col.getFilterProperty() === "ProductType";
                });

                if (oColumn) {
                    oColumn.setTemplate(new ObjectStatus({
                        text: "{ProductType}",
                        state: {
                            path: "ProductType",
                            formatter: formatter.materialTypeState
                        }
                    }));
                }
            });
           
        }
    });
});